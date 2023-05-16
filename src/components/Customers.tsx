import { motion } from "framer-motion";
import React, { useState } from "react";
import { Column, useGlobalFilter, useSortBy, useTable } from "react-table";
import useFetchData from "../hooks/useFetchData";
import "./CustomerDetails.css";
import { GlobalFilter } from "./GlobalFilter";
import { SingleCustomerDetails } from "./SingleCustomerDetails";

export const Customers = () => {
  const [data, setData] = useState<CustomerTableData[]>([]);
  const [customerIdOfCurrentlySelectedRow, setCustomerIdOfCurrentlySelectedRow] = useState<number | null>(null);

  // fetch the data
  const { fetchedData, loading, error } = useFetchData<CustomerTableData[]>("/customertable");
  if (fetchedData && data?.length === 0) {
    setData(fetchedData);
  }

  // Once the data is fetched, set the default row to the first in the table
  if (customerIdOfCurrentlySelectedRow === null && data.length > 0) {
    setCustomerIdOfCurrentlySelectedRow(data[0].customer_id);
  }

  // define column configuration object.
  const columns: Column<CustomerTableData>[] = React.useMemo(
    () => [
      {
        Header: "Business name",
        accessor: "name",
      },
      {
        Header: "Business rep",
        accessor: "rep",
      },
      {
        Header: "Contact phone",
        accessor: "contact_phone",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Eircode",
        accessor: "eircode",
      },
      {
        Header: "Cust ID",
        accessor: "customer_id",
      },
    ],
    []
  );

  // eslint-disable-next-line
  const handleClickOnRow = (event: any) => {
    const id = event.nativeEvent.target.parentNode.childNodes[5].innerText;
    setCustomerIdOfCurrentlySelectedRow(Number(id));
  };

  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  let detailsSelectedCustomer = {} as CustomerTableData;

  if (customerIdOfCurrentlySelectedRow) {
    const testData = data?.find((row) => row.customer_id === customerIdOfCurrentlySelectedRow);

    if (testData) {
      detailsSelectedCustomer = testData;
    }
  }

  return (
    <>
      <div className="heading">
        {" "}
        <span>Customers</span>
      </div>
      {loading && <div>Loading.....</div>}
      {error && <div>Error. {error?.message}</div>}

      {!loading && !error && (
        <>
          <div className="table-wrapper">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span className="sort-arrows">{column.isSorted ? (column.isSortedDesc ? "↓" : "↑") : "⇅"}</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <motion.tr {...row.getRowProps()} onClick={handleClickOnRow} initial={{ y: 50 }} animate={{ y: 0 }}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                      })}
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

          {detailsSelectedCustomer && <SingleCustomerDetails customerDetails={detailsSelectedCustomer} />}
        </>
      )}
    </>
  );
};
