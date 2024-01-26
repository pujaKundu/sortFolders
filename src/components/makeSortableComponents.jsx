import React, { useState } from "react";

const makeSortableComponents = (componentList) => {
  const SortableList = () => {
    const [components, setComponents] = useState(componentList);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => (e) => {
      e.dataTransfer.setData("text/plain", index.toString());
      setDraggedIndex(index);
    };

    const handleDragOver = (index) => (e) => {
      e.preventDefault();
      const dragIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);

      if (dragIndex !== index) {
        const updatedComponents = [...components];
        const [draggedComponent] = updatedComponents.splice(dragIndex, 1);
        updatedComponents.splice(index, 0, draggedComponent);
        setComponents(updatedComponents);
        setDraggedIndex(index);
      }
    };

    const handleDragEnd = () => {
      setDraggedIndex(null);
    };

    const renderComponentWithDragHandlers = (component, index) => {
      return (
        <div className="sortable-item ">
          <div
            key={index}
            className={`${
              draggedIndex === index ? "dragged" : ""
            }`}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDragEnd={handleDragEnd}
          >
            <div className="drag-icon">&#x2630;</div>
            
          </div>
          <div className="content">{component}</div>
        </div>
      );
    };

    return (
      <div>
        {components.map((component, index) =>
          renderComponentWithDragHandlers(component, index)
        )}
      </div>
    );
  };

  return SortableList;
};

export default makeSortableComponents;
