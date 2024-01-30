import React, { useEffect, useState } from "react";

const MakeSortable = ({ componentList, onSort,isDragging,setIsDragging, children }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  
  const [isOverUpperHalf, setIsOverUpperHalf] = useState(false);
  const [isOverLowerHalf, setIsOverLowerHalf] = useState(false);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    setIsDragging(true);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setTargetIndex(index);

    const isTarget = targetIndex === index;

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

      targetElement.style.borderTop =
        isTarget && isOverUpperHalf ? "3px dashed red" : "none";
      targetElement.style.borderBottom =
        isTarget && isOverLowerHalf ? "3px dashed blue" : "none";
    }
  };

  const handleDragDrop = (e, index) => {
    e.preventDefault();
    let dropIndex = targetIndex;

    isOverLowerHalf ? (dropIndex += 1) : dropIndex;

    if (
      draggedIndex !== null &&
      dropIndex !== null &&
      draggedIndex !== dropIndex
    ) {
      const updatedComponents = [...componentList];
      const [draggedComponent] = updatedComponents.splice(draggedIndex, 1);
      updatedComponents.splice(dropIndex, 0, draggedComponent);
      onSort(updatedComponents);
      setDraggedIndex(null);
      setTargetIndex(null);
      setIsDragging(false);
      setIsOverUpperHalf(false);
      setIsOverLowerHalf(false);
    }

    const targetElement = document.querySelector(`.sortable-item:nth-child(${dropIndex + 1})`);
    if (targetElement) {
      targetElement.style.borderTop = "";
      targetElement.style.borderBottom = "";
    }
  };

  const handleDragLeave = () => {
    setTargetIndex(null);
    const targetElement = document.querySelector(`.sortable-item:nth-child(${targetIndex + 1})`);
    if (targetElement) {
      targetElement.style.borderTop = "";
      targetElement.style.borderBottom = "";
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setTargetIndex(null);
    setIsOverUpperHalf(false);
    setIsOverLowerHalf(false);
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("dragover", (e) => e.preventDefault());

    return () => {
      document.removeEventListener("dragover", (e) => e.preventDefault());
    };
  }, []);

  return (
    <div id="box">
      {children.map((item, index) => (
        <div
          key={index}
          className={`sortable-item ${
            isDragging && index === draggedIndex ? "dragging" : ""
          }`}
          draggable={isDragging}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDragDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default MakeSortable;
