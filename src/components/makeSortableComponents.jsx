import React, { useState } from "react";

const makeSortableComponents = (componentList) => {
  const SortableList = () => {
    const [components, setComponents] = useState(componentList);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [targetIndex,setTargetIndex]=useState(null);
    const [isDragging,setIsDragging]=useState(false);

    console.log('target',targetIndex);
    console.log('init',draggedIndex)

    const handleDragStart = (index) => (e) => {
      e.dataTransfer.setData("text/plain", index.toString());
      setDraggedIndex(index);
      setIsDragging(true);
    };

    const handleDragOver =  (e) => {
      e.preventDefault();
      
    };

    const handleDrop=(e,index)=>{
      const dragIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);

      if (dragIndex !== index && targetIndex!==index) {
        setTargetIndex(index)
        const updatedComponents = [...components];
        const [draggedComponent] = updatedComponents.splice(dragIndex, 1);
        updatedComponents.splice(index, 0, draggedComponent);
        setComponents(updatedComponents);
        setDraggedIndex(index);
      }
    }

    const handleDragEnd = () => {
      setDraggedIndex(null);
      setTargetIndex(null);
      setIsDragging(false);
    };

    const renderComponentWithDragHandlers = (component, index) => {
      return (
        <div
          className="sortable-item"
          key={index}
          style={{
            // backgroundColor: index === draggedIndex?
            //    `${component.bgColor}`:"blue",
            border: draggedIndex === index ? "2px solid #000" : "none",
            // transform:  draggedIndex === index ? "scale(1.1)":""
          }}
          draggable
        >
          <div
            className={`sortable-item ${
              draggedIndex === index ? "dragged" : ""
            }`}
            onDragStart={handleDragStart(index)}
            onDragOver={(e)=>handleDragOver(e)}
            onDragEnd={handleDragEnd}
            onDrop={(e)=>handleDrop(e,index)}
          >
            <div className="drag-icon">&#x2630;</div>
            
          </div>
          <div className="content">{component.content}</div>
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
