import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as MatIcons from "react-icons/md";
import BookDataService from '../../services/BookDataService';
import { toast } from 'react-toastify'
import { RingLoader } from 'react-spinners'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';


const { SearchBar } = Search;

function BookList({ history, match }) {

    const { path } = match;

    const columns = [
        {
            text: "Id",
            dataField: "_id",
            sort: true,
            editable: false,
            headerAlign: 'left',
            headerStyle: () => {
                return { width: "14%", verticalAlign: 'middle' };
            },
            type: 'number'

        },
        {
            text: "Book Name",
            dataField: "name",
            sort: true,
            headerAlign: 'left',
            headerStyle: () => {
                return { width: "38%", verticalAlign: 'middle' };
            },
            type: 'string',
            filter: textFilter({
                placeholder: 'Book Name Filter',
                className: 'mx-3'
            })
        },
        {
            text: "ISBN",
            dataField: "isbn",
            sort: true,
            headerAlign: 'left',
            headerStyle: () => {
                return { width: "38%", verticalAlign: 'middle' };
            },
            type: 'string',
            filter: textFilter({
                placeholder: 'ISBN Filter',
                className: 'mx-3'
            })
        },
        {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            headerStyle: () => {
                return { width: "10%", verticalAlign: 'middle' };
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


    const [books, setBooks] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);

    //paging options
    const options = {
        page: 1,
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: 'All', value: books.length
        }],
        sizePerPage: window.appConfig.pageSize,
        pageStartIndex: 1,
        paginationSize: 3,
        paginationPosition: 'bottom'
    };

    useEffect(() => {

        console.log("useEffect getting all books data");
        // get user and set form fields

        setIsLoading(true);
        BookDataService.getAll().then(response => {

            toast.success('Books List Recieved...')

            console.log(`got response of Books List `, response.data);
            setBooks(response.data);

        }).catch(error => {

            toast.error(`Error while fetching Books List`, error)
            console.log(`Error while fetching Books List`, error);
        });

        setIsLoading(false);

    }, []);


    function onEditClicked(row) {
        console.log("Edit Clicked => ", row);

        history.push(`${path}/edit/${row._id}`);
    }

    function onRowSelect(row) {
        console.log("Row Selected => ", row);

        history.push(`${path}/edit/${row._id}`);
    }



    function actionsFormatter(cell, row, rowIndex, formatExtraData) {
        return (

            <div className="col text-center">

                <div className="d-inline">
                    <Link to={`${path}/edit/${row._id}`} >

                        <MatIcons.MdEdit className="mx-2 columnAction editAction" onClick={() => {
                            onEditClicked(row);
                        }}></MatIcons.MdEdit>
                    </Link>
                </div>
                <div className="d-inline">
                    <MatIcons.MdDeleteForever className="mx-2 columnAction deleteAction" onClick={e => {
                        e.stopPropagation();
                        alert("Delete funtionality was not requested !");
                    }}></MatIcons.MdDeleteForever>
                </div>

            </div>

        );
    }

    return (

        <div className="container">
            <div className="mt-5 row hdr">
                <div className="col-sm-12 btn btn-secondary">
                    Books List
                    <Link to={`${path}/add`} className="btn btn-sm btn-primary mr-1 float-right">Add Book</Link>

                </div>
            </div>
            <div className="mt-3" >

                <ToolkitProvider
                    bootstrap4
                    keyField="_id"
                    data={books}
                    columns={columns}
                    search
                >
                    {props => (
                        <div>
                            <SearchBar {...props.searchProps} />

                            <BootstrapTable
                                {...props.baseProps}
                                filter={filterFactory()}
                                noDataIndication="There are no Books"
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

export default BookList
