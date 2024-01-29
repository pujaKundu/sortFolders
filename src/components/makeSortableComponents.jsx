import React, { useState } from "react";

const makeSortableComponents = (componentList) => {
  const SortableList = () => {
    const [components, setComponents] = useState(componentList);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [targetIndex, setTargetIndex] = useState(null);
    const [isDragging,setIsDragging]=useState(false)

    const handleDragStart = (index) => {
      setDraggedIndex(index);
    };

    const handleDragOver = (e, index) => {
      e.preventDefault();
      setTargetIndex(index);
    };

    const handleDragLeave = () => {
      setTargetIndex(null);
    };

    const handleDrop = () => {
      if (draggedIndex !== null && targetIndex !== null && draggedIndex !== targetIndex) {
        const updatedComponents = [...components];
        const [draggedComponent] = updatedComponents.splice(draggedIndex, 1);
        updatedComponents.splice(targetIndex, 0, draggedComponent);
        setComponents(updatedComponents);
        setDraggedIndex(null);
        setTargetIndex(null);
      }
    };

    const handleDragEnd = () => {
      setDraggedIndex(null);
      setTargetIndex(null);
    };

    const renderComponentWithDragHandlers = (component, index) => {
      return (
        <div
          className="sortable-item"
          key={index}
          style={{
            backgroundColor: `${component.bgColor}`,
            border: targetIndex === index ? "2px dashed #000" : "none",
          }}
           
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        >
          <div className={`sortable-item `} draggable>
            <div className="drag-icon">&#x2630;</div>
          </div>
          <div className="content">{component.content}</div>
        </div>
      );
    };

    return (
      <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        {components.map((component, index) => renderComponentWithDragHandlers(component, index))}
      </div>
    );
  };

  return SortableList;
};

export default makeSortableComponents;
