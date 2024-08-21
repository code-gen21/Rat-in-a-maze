import React, { useState } from "react";
import Maze from "./components/Maze";

export default function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  return (
    <div>
      <Maze rows={rows} cols={cols} setRows={setRows} setCols={setCols} />
    </div>
  );
}
