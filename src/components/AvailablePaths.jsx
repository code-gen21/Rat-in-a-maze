import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import image from "../../public/images.png";
import rat from "../../public/rat.jpg";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function AvailablePaths() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const rows = state.rows;
  const cols = state.cols;

  const [maze, setMaze] = useState(JSON.parse(JSON.stringify(state.tempMaze)));
  const [pathMaze, setPathMaze] = useState(
    JSON.parse(JSON.stringify(state.tempMaze))
  );

  const [load, setLoad] = useState(true);

  useEffect(() => {
    let isCorrect = true;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!(state.tempMaze[i][j] == 1 || state.tempMaze[i][j] == 0)) {
          isCorrect = false;
        }
      }
    }
    if (!isCorrect) {
      navigate("/");
    }
    findPaths();
    setLoad(false);
  }, []);

  /* ***********************************************************/
  const [paths, setPaths] = useState([]);
  function findPaths() {
    const vis = Array.from({ length: rows }, () => Array(cols).fill(0));
    const path = [];

    function ratPath(maze, i, j, currPath, vis) {
      if (i < 0 || j < 0 || i >= maze.length || j >= maze[0].length) {
        return;
      }
      if (maze[i][j] == 0 || vis[i][j]) {
        return;
      }
      if (i == maze.length - 1 && j == maze[0].length - 1) {
        path.push(currPath);
        return;
      }

      vis[i][j] = 1;
      currPath += "U";
      ratPath(maze, i - 1, j, currPath, vis);
      currPath = currPath.slice(0, -1);
      currPath += "D";
      ratPath(maze, i + 1, j, currPath, vis);
      currPath = currPath.slice(0, -1);
      currPath += "L";
      ratPath(maze, i, j - 1, currPath, vis);
      currPath = currPath.slice(0, -1);
      currPath += "R";
      ratPath(maze, i, j + 1, currPath, vis);
      currPath = currPath.slice(0, -1);
      vis[i][j] = 0;
      return;
    }
    ratPath(maze, 0, 0, "", vis);
    setPaths(path);
  }
  /**************************************************** */

  const ShowPath = (currPath) => {
    console.log(currPath);
    let row = 0;
    let col = 0;
    const tempMaze = JSON.parse(JSON.stringify(maze));

    for (const char of currPath) {
      if (char == "U") {
        tempMaze[row][col] = 3;
        row--;
      } else if (char == "D") {
        tempMaze[row][col] = 2;
        row++;
      } else if (char == "R") {
        tempMaze[row][col] = 4;
        col++;
      } else {
        tempMaze[row][col] = 5;
        col--;
      }
    }
    setPathMaze(tempMaze);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  };

  if (load) {
    return (
      <div className="loading-container">
        <i class="fa-solid fa-spinner"></i>
        <h3>Wait. Finding all the paths</h3>
      </div>
    );
  }

  return (
    <div className="maze-body">
      {paths.length > 0 && (
        <h3 className="path-heading">
          Follow the arrows to reach the target food
        </h3>
      )}
      {paths.length == 0 && (
        <h3 className="path-heading-no-path">
          No path available for given input
        </h3>
      )}
      {pathMaze.map((arr, i) => {
        return (
          <div className="maze-row" key={uuidv4()}>
            {arr.map((cell, j) => {
              return (
                <div
                  key={uuidv4()}
                  className={
                    pathMaze[i][j] == 1
                      ? "maze-block-green"
                      : pathMaze[i][j] == 0
                      ? "maze-block-red"
                      : "maze-block-blue"
                  }
                >
                  {!((i == rows - 1 && j == cols - 1) || (i == 0 && j == 0)) &&
                    (pathMaze[i][j] == 2 ? (
                      <i className="fa-solid fa-arrow-down sign"></i>
                    ) : pathMaze[i][j] == 3 ? (
                      <i className="fa-solid fa-arrow-up sign"></i>
                    ) : pathMaze[i][j] == 4 ? (
                      <i className="fa-solid fa-arrow-right sign"></i>
                    ) : pathMaze[i][j] == 5 ? (
                      <i className="fa-solid fa-arrow-left sign"></i>
                    ) : (
                      ""
                    ))}
                  {i == rows - 1 && j == cols - 1 && (
                    <img className="target-image" src={image} />
                  )}
                  {i == 0 && j == 0 && (
                    <img className="target-image" src={rat} />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="paths-container">
        {paths.length > 0 && (
          <h3 className="total-paths">Total paths: {paths.length}</h3>
        )}
        {paths &&
          paths.map((currPath, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  ShowPath(currPath);
                }}
              >
                Path {i + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
}
