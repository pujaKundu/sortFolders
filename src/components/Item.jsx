import React from "react";

const Item = ({ component, setIsDragging }) => {

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div
      className="sortable-item"
      key={component?.id}
      style={{
        backgroundColor: `${component.bgColor}`,
      }}
    >
      <div className="sortable-item" onMouseDown={handleMouseDown}>
        <div className="drag-icon">&#x2630;</div>
      </div>
      <div className="content">{component?.content}</div>
    </div>
  );
};

export default Item;
