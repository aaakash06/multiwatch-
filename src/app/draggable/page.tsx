"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable grid item component
const SortableGridItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`grid-item ${isDragging ? "dragging" : ""}`}
    >
      {children}
    </div>
  );
};

// Main Draggable Grid Component
const DraggableGrid = () => {
  // Initial grid items with unique IDs
  const [gridItems, setGridItems] = useState([
    { id: "item1", content: "1", color: "bg-red-500" },
    { id: "item2", content: "2", color: "bg-blue-500" },
    { id: "item3", content: "3", color: "bg-green-500" },
    { id: "item4", content: "4", color: "bg-yellow-500" },
    { id: "item5", content: "5", color: "bg-purple-500" },
  ]);

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setGridItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={gridItems.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4 bg-white rounded-lg shadow-md">
            {gridItems.map((item) => (
              <SortableGridItem key={item.id} id={item.id}>
                <div
                  className={`w-24 h-24 flex items-center justify-center text-white text-2xl font-bold rounded ${item.color}`}
                >
                  {item.content}
                </div>
              </SortableGridItem>
            ))}
            {/* Fill remaining grid cells */}
            {[...Array(4)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="w-24 h-24 bg-gray-200 border-2 border-dashed border-gray-300 rounded"
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DraggableGrid;
