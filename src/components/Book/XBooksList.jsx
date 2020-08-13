import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";


const { SearchBar } = Search;

let nameFilter;
let priceFilter;
let stockFilter;
let originFilter;

const ClearButton = props => {
    const handleClick = () => {
        props.onSearch("");
        props.clearAllFilter();
    };
    return (
        <button className="btn btn-primary"
            variant="secondary"
            onClick={handleClick}
            style={{
                fontSize: "16px",
                padding: "5px",
                margin: "10px",
                height: "40px"
            }}
        >
            Clear
        </button>
    );
};

export default class XBookList extends React.Component {
    columns = [
        {
            dataField: "name",
            text: "Product Name",
            filter: textFilter({
                getFilter: filter => {
                    nameFilter = filter;
                }
            })
        },
        {
            dataField: "price",
            text: "Price",
            filter: textFilter({
                getFilter: filter => {
                    priceFilter = filter;
                }
            }),
            sort: true
        },
        {
            dataField: "stock",
            text: "Stock",
            filter: textFilter({
                getFilter: filter => {
                    stockFilter = filter;
                }
            })
        },
        {
            dataField: "origin",
            text: "Origin",
            filter: textFilter({
                getFilter: filter => {
                    originFilter = filter;
                }
            })
        }
    ];

    clearAllFilter() {
        nameFilter("");
        priceFilter("");
        originFilter("");
        stockFilter("");
    }

    products = [
        {
            name: "apple",
            price: 100,
            stock: 10,
            origin: "japan"
        },
        {
            name: "orange",
            price: 150,
            stock: 35,
            origin: "spain"
        },
        {
            name: "pineapple",
            price: 300,
            stock: 4,
            origin: "america"
        }
    ];

    render() {
        return (
            <div>
                <h1>Clear search bar and filter</h1>
                <ToolkitProvider
                    bootstrap4
                    keyField="name"
                    data={this.products}
                    columns={this.columns}
                    search
                >
                    {props => (
                        <div>
                            <SearchBar
                                {...props.searchProps}
                                style={{ width: "400px", height: "40px" }}
                            />
                            <ClearButton
                                {...props.searchProps}
                                clearAllFilter={this.clearAllFilter}
                            />
                            <BootstrapTable
                                {...props.baseProps}
                                filter={filterFactory()}
                                noDataIndication="There is no solution"
                                striped
                                hover
                                condensed
                            />
                        </div>
                    )}
                </ToolkitProvider>
            </div>
        );
    }
}

