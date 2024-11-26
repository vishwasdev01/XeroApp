import React, { useEffect, useState } from "react";
import { getBalanceSheet } from "../services/api";
import "./BalanceSheetTable.css"; 

const BalanceSheetTable: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getBalanceSheet()
      .then(({ Reports }) => {
        const [rowsc] = Reports;
        setData(rowsc);
      })
      .catch((err) => {
        console.error("Error fetching balance sheet:", err);
      });
  }, [  ]);

  
  const headerText =
    data &&
    data.length > 0 &&
    data[0].Cells &&
    data[0].Cells.length > 0
      ? data[0].Cells[0].Value
      : "Amount";
  const headerText2 =
    data &&
    data.length > 0 &&
    data[0].Cells &&
    data[0].Cells.length > 0
      ? data[0].Cells[2].Value
      : "Amount";

  const renderTableDetails = () => {
    return data.Rows.map((section: any, sectionIndex: number) => {
      if (section.RowType === "Section" && section.Title) {
        return (
          <React.Fragment key={sectionIndex}>
            <tr>
              <td colSpan={3}>
                <strong>{section.Title}</strong>
              </td>
            </tr>
            {section.Rows.map((row: any, rowIndex: number) => {
              if (row.RowType === "Row") {
                return (
                  <tr key={rowIndex}>
                    {row.Cells.map((cell: any, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        style={{ borderRight: "2px solid black" }}
                      >
                        {cell.Value}
                      </td>
                    ))}
                  </tr>
                );
              } else if (row.RowType === "SummaryRow") {
                return (
                  <>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          borderBottom: "2px solid black",
                          padding: "0",
                        }}
                      />
                    </tr>
                    <tr
                      key={rowIndex}
                    >
                      {row.Cells.map((cell: any, cellIndex: number) => (
                        <td
                          key={cellIndex}
                          style={{ borderRight: "2px solid black" }}
                        >
                          <strong style={{ color: "red" }}>{cell.Value}</strong>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          borderBottom: "2px solid black",
                          padding: "0",
                        }}
                      />
                    </tr>
                  </>
                );
              }
              return null;
            })}
          </React.Fragment>
        );
      }
      return null;
    });
  };

  return (
    <div className="table-container">
    <h1 style={{margin:'1%'}}>{data && data.ReportName}</h1>
    <h2 style={{margin:'-5px'}}>{data ? data.ReportTitles[2] : 'Title not available'}</h2>
    <table className="table">
      <thead className="table-header">
        <tr>
          <th>Account</th>
         
         <th>{headerText}</th>
          <th>{headerText2}</th> 
        </tr>
      </thead>
      <tbody>{data && renderTableDetails()}</tbody>
    </table>
  </div>
  );
};

export default BalanceSheetTable;