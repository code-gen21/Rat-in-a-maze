import React, { useState } from "react";

export default function RowColNum({ setRows, setCols }) {
  const [inputRows, setInputRows] = useState(0);
  const [inputCols, setInputcols] = useState(0);

  const [error, showError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRows <= 0 || inputCols <= 0 || inputRows > 5 || inputCols > 5) {
      showError(true);
      return;
    }
    setRows(inputRows);
    setCols(inputCols);
    document
      .querySelector(".row-col-form")
      .classList.add("remove-row-col-form");
    return;
  };

  return (
    <div className="row-col-form">
      <h3>Enter number of rows and columns.</h3>
      <h4>(Values must be less than 6 and greater than 0)</h4>
      <label htmlFor="rows">Rows</label>
      <input
        type="number"
        id="rows"
        placeholder="rows"
        onChange={(e) => {
          showError(false);
          setInputRows(e.target.value);
        }}
      />
      <label htmlFor="cols">Columns</label>
      <input
        type="number"
        id="cols"
        placeholder="columns"
        onChange={(e) => {
          showError(false);
          setInputcols(e.target.value);
        }}
      />
      {error && (
        <h4 className="error">
          Please enter value greater than 0 and less than 6
        </h4>
      )}
      <button onClick={handleSubmit}>Done</button>
    </div>
  );
}
