// src/components/FibonacciTable.jsx
import React, { useState } from "react";

const generateFibonacci = (n) => {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
};

export default function FibonacciTable() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [table, setTable] = useState([]);

  const generateTable = () => {
    const totalCells = rows * columns;
    const fibonacciSequence = generateFibonacci(totalCells);

    const newTable = [];
    let index = 0;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(fibonacciSequence[index++]);
      }
      newTable.push(row);
    }
    setTable(newTable);
  };

  return (
    <div className='container'>
      <h2 className='mt-4'>Fibonacci Table Generator</h2>
      <div className='mb-3 col-3'>
        <label htmlFor='rows' className='form-label'>
          Rows:
        </label>
        <input
          type='number'
          id='rows'
          className='form-control'
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
      </div>
      <div className='mb-3 col-3'>
        <label htmlFor='columns' className='form-label'>
          Columns:
        </label>
        <input
          type='number'
          id='columns'
          className='form-control'
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
        />
      </div>
      <button className='btn btn-primary' onClick={generateTable}>
        Generate Table
      </button>
      <div className='table-responsive'>
        {table.length > 0 && (
          <table className='table table-bordered mt-3'>
            <tbody>
              {table.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
