import React from 'react'

const Cell = ({ cell, user, onClick, onRightClick }: any) => {
  return (
    <div
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
      className="w-5 h-5 rounded-sm cursor-pointer transition-all duration-150 hover:scale-150 hover:z-10"
      style={{
        backgroundColor: cell?.color || "#e5e7eb",
        boxShadow: cell?.user === user ? "0 0 0 2px yellow" : "none"
      }}
      title={cell?.user || "Unclaimed"}
    >

    </div>
  )
}

export default Cell