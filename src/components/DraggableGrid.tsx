"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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
const SortableGridItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
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
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setGridItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
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

// {clocks.map((clock: Clock, index: number) => (
//   <motion.div
//     key={index}
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{
//       delay: 0.3 + index * 0.1,
//       duration: 0.3,
//       ease: "easeInOut",
//     }}
//     drag
//     dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
//     dragElastic={0.1}
//     dragTransition={{
//       bounceStiffness: 600,
//       bounceDamping: 20,
//     }}
//     whileDrag={{ scale: 1.05, zIndex: 1 }}
//     className="flex flex-col rounded-2xl w-[22rem] border border-primary/10 cursor-move"
//   >
//     <div className="w-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 ">
//       <div className="flex justify-between px-8 pt-6">
//         <h3 className="font-bold text-2xl md:text-3xl tracking-tighter ">
//           Clock {index + 1}
//         </h3>
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button
//               variant="ghost"
//               className="flex gap-2 items-center"
//             >
//               <Trash className="size-4 text-destructive" />
//             </Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle>
//                 Are you sure you want to delete this clock?
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action cannot be undone. This will
//                 permanently delete this clock from local
//                 storage.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => handleDeleteClock(index)}
//                 className="text-destructive"
//               >
//                 Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//       <div className=" pb-4 rounded-2xl ">
//         <TimerCard id={index} />
//       </div>
//     </div>
//   </motion.div>
// ))}
