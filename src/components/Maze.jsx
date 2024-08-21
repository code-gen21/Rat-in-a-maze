import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import RowColNum from "./RowColNum";

export default function Maze({ rows, cols, setRows, setCols }) {
  const [maze, setMaze] = useState([]);

  useEffect(() => {
    if (maze.length == 0) {
      const matrix = [];
      console.log("UseEffect");
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          row.push(-1);
        }
        matrix.push(row);
      }
      setMaze(matrix);
    }
  }, [rows, cols]);

  const tempMaze = JSON.parse(JSON.stringify(maze));

  const [error, showError] = useState(false);

  return (
    <div className="maze-body">
      <RowColNum setRows={setRows} setCols={setCols} />
      <h2 className="path-heading">
        Enter value in each cell. 0 for blocking the cell otherwise 1.
      </h2>
      <div className="maze">
        {maze.map((arr, i) => {
          return (
            <div className="maze-row">
              {arr.map((cell, j) => {
                return (
                  <input
                    className="maze-block"
                    type="text"
                    onChange={(e) => {
                      // console.log(maze[i][j]);
                      //   console.log(e.target.value);
                      tempMaze[i][j] = e.target.value;
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <Link to="/availablePaths" state={{ tempMaze, rows, cols }}>
        Submit
      </Link>
    </div>
  );
}
