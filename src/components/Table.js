import React from "react";
import { useSelector } from "react-redux";
import { selectTable } from "../features/tableSlice";
import "./Table.css";
import numeral from "numeral";


function Table() {
  const tableData = useSelector(selectTable);
  
  return (
    <div className="table">
      {tableData && (
        <div className="table__body">
          {tableData.map(({ country, cases }) => (
            <tr>
              {/* Emmet */}
              <td>{country}</td>
              <strong>
                <td>{numeral(cases).format("0,0")}</td>
              </strong>
            </tr>
          ))}
        </div>
      )}
    </div>
  );
}

export default Table;
