import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as MatIcons from "react-icons/md";
import AuthorDataService from '../../services/AuthorDataService';
import { toast } from 'react-toastify'
import { RingLoader } from 'react-spinners'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const { SearchBar } = Search;

function List({ history, match }) {

    const { slug } = useParams()
    const { path } = match;

    console.log("history");
    console.log(history);
    console.log("match");
    console.log(match);
    console.log("slud");
    console.log(slug);
    console.log("path");
    console.log(path);


    const columns = [
        {
            text: "Id",
            dataField: "id",
            sort: true,
            editable: false,
            headerAlign: 'left',
            headerStyle: () => {
                return { width: "5%", verticalAlign: 'middle' };
            },
            type: 'number'

        },
        {
            text: "First Name",
            dataField: "firstName",
            sort: true,
            headerAlign: 'left',
            headerStyle: () => {
                return { width: "40%", verticalAlign: 'middle' };
            },
            type: 'string',
            filter: textFilter({
                placeholder: 'First Name Filter',
                className: 'mx-3'
            })
        },
        {
            text: "Last Name",
            dataField: "lastName",
            sort: true,
            headerAlign: 'left',
            headerStyle: () => {
                return { width: "40%", verticalAlign: 'middle' };
            },
            type: 'string',
            filter: textFilter({
                placeholder: 'Last Name Filter',
                className: 'mx-3'
            })
        },
        {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            headerStyle: () => {
                return { width: "15%", verticalAlign: 'middle' };
            },
            sort: false,
            csvExport: false,
            headerAlign: 'center',
            formatter: actionsFormatter
        },
    ];

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#e3e9ef',
        onSelect: onRowSelect
    };

    const initialValues = [{}];

    //state = { authors: this.authors, columns: this.columns }
    const [authors, setAuthors] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);


    const options = {
        page: 1,
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: 'All', value: authors.length
        }],
        sizePerPage: 2,
        pageStartIndex: 1,
        paginationSize: 3,
        paginationPosition: 'bottom'
    };

    useEffect(() => {

        console.log("useEffect getting all authors data");
        // get user and set form fields
        toast.info('Fetching Authors List data...')
        setIsLoading(true);
        AuthorDataService.getAll().then(response => {

            toast.success('Authors List Recieved...')

            console.log(`got response of Authors List `);
            console.log(response.data);
            setAuthors(response.data);

        }).catch(error => {

            toast.error(`Error while fetching Authors List ${error}`)
            console.log(`Error while fetching Authors List ${error}`);
        });

        setIsLoading(false);

    }, []);


    function onEditClicked(row) {
        console.log("Edit Clicked => " + row);
        console.log(row);

        history.push(`${path}/edit/${row.id}`);
    }

    function onRowSelect(row) {
        console.log("Row Selected => " + row);
        console.log(row);
        history.push(`${path}/edit/${row.id}`);
    }

    function onDeleteCLicked(row) {

        console.log(" Delete Clicked => " + row);
        console.log(row);

        alert("Delete funtionality was not requested !");
    }

    function actionsFormatter(cell, row, rowIndex, formatExtraData) {
        return (

            <div className="col text-center">
                {console.log("in action formatter")}

                <Link to={`${path}/edit/${row.id}`} >

                    <MatIcons.MdEdit className="mx-2 columnAction editAction" onClick={() => {
                        onEditClicked(row);
                    }}></MatIcons.MdEdit>
                </Link>

                <MatIcons.MdDeleteForever className="mx-2 columnAction deleteAction" onClick={() => {
                    onDeleteCLicked(row);
                }}></MatIcons.MdDeleteForever>


            </div>

        );
    }

    return (

        <div className="container">
            <div className="mt-5 row hdr">
                <div className="col-sm-12 btn btn-secondary">
                    Authors List
                    <Link to={`${path}/add`} className="btn btn-sm btn-primary mr-1 float-right">Add Author</Link>

                </div>
            </div>
            <div className="mt-3" >

                <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={authors}
                    columns={columns}
                    search
                >
                    {props => (
                        <div>
                            <SearchBar {...props.searchProps} />

                            <BootstrapTable
                                {...props.baseProps}
                                filter={filterFactory()}
                                noDataIndication="There are no Authors"
                                pagination={paginationFactory(options)}
                                selectRow={selectRow}
                                striped
                                hover
                                condensed
                            />
                        </div>
                    )}
                </ToolkitProvider>

                <RingLoader size={60} color='green' loading={isLoading} />
            </div>

        </div>


    );
}

export default List