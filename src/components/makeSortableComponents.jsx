import React, { useState } from "react";

const makeSortableComponents = (componentList) => {
  const SortableList = () => {
    const [components, setComponents] = useState(componentList);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [targetIndex, setTargetIndex] = useState(null);
    const [isDragging,setIsDragging]=useState(false);
    const [isOverUpperHalf,setIsOverUpperHalf]=useState(false);
    const [isOverLowerHalf,setIsOverLowerHalf]=useState(false);

    const handleMouseDown = ()=>{
      setIsDragging(true)
    }

    const handleDragStart = (index) => {
      setDraggedIndex(index);
    };

    const handleDragOver = (e, index) => {
      e.preventDefault();
      setTargetIndex(index);
    
      if (draggedIndex === index) {
        setIsOverUpperHalf(false);
        setIsOverLowerHalf(false);
      } else {
        const mouseY = e.clientY;
        const targetElement = e.currentTarget;
    
        if (targetElement) {
          const targetTop = targetElement.offsetTop;
          const targetHeight = targetElement.clientHeight;
          const targetMid = targetTop + targetHeight / 2;
    
          const upperHalf = mouseY < targetMid;
          const lowerHalf = mouseY > targetMid;
    
          setIsOverUpperHalf(upperHalf);
          setIsOverLowerHalf(lowerHalf);
        }
      }
    };
    
    const handleDragLeave = () => {
      setTargetIndex(null);
    };

    const handleDrop = () => {
    console.log('isOverLowerHalf', isOverLowerHalf)
      console.log('targetIndex', targetIndex)

      let dropIndex = targetIndex;
      if(isOverLowerHalf){
        dropIndex+=1;
      }
      else{
        dropIndex= dropIndex;
      }


      if (draggedIndex !== null && dropIndex !== null && draggedIndex !== dropIndex) {
        const updatedComponents = [...components];
        const [draggedComponent] = updatedComponents.splice(draggedIndex, 1);
        updatedComponents.splice(dropIndex, 0, draggedComponent);
        setComponents(updatedComponents);
        setDraggedIndex(null);
        setTargetIndex(null);
        setIsDragging(false);
        setIsOverUpperHalf(false);
        setIsOverLowerHalf(false);
      }
    };

    const handleDragEnd = () => {
      setDraggedIndex(null);
      setTargetIndex(null);
      setIsOverUpperHalf(false);
      setIsOverLowerHalf(false);
    };

    const renderComponentWithDragHandlers = (component, index) => {

      const isTarget = targetIndex === index;

      return (
        <div
          className="sortable-item"
          key={index}
          style={{
            backgroundColor: `${component.bgColor}`,
            borderTop:isTarget && isOverUpperHalf ? "3px dashed red" : "none",
            borderBottom:isTarget && isOverLowerHalf ? "3px dashed blue" : "none",
          }}
          draggable={isDragging}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
        >
          <div className={`sortable-item `} onMouseDown={handleMouseDown} >
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
