import React from 'react'
import Cell from './Cell'

const Grid = ({ grid, onCellClick, onCellRightClick, user }: any) => {
  return (
    <div
      className="grid gap-0.75 p-4 bg-linear-to-br from-yellow-400 via-blue-500 to-orange-600 rounded-xl shadow-xl w-fit"
      style={{
        gridTemplateColumns: "repeat(50, minmax(0, 1fr))",
      }}
    >
      {
        grid.map((row: any[], y: number) => (
            row.map((cell, x) => (
              <Cell
                key={`${x}-${y}`}
                cell={cell}
                user={user}
                onClick={() => onCellClick(x, y)}
                onRightClick={() => onCellRightClick(x, y, cell)}
              />
            ))
          ))
      }
    </div>
  );
}

export default Grid