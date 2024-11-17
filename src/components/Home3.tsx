"use client";
import React, { useState } from "react";
import { Plus, GridIcon } from "lucide-react";

const TimerCard = ({
  id,
  onAdd,
  onRemove,
  hasTimer,
}: {
  id: number;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  hasTimer: boolean;
}) => {
  const [time, setTime] = useState("00:00:00");

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm font-medium">Timer {id}</h3>
      <div className="text-sm text-gray-600">{time}</div>
      {hasTimer ? (
        <button
          onClick={() => onRemove(id)}
          className="px-4 py-1.5 text-sm text-indigo-600 bg-white border border-indigo-200 rounded-md hover:bg-indigo-50"
        >
          Remove Timer
        </button>
      ) : (
        <button
          onClick={() => onAdd(id)}
          className="px-4 py-1.5 text-sm text-indigo-600 bg-white border border-indigo-200 rounded-md hover:bg-indigo-50"
        >
          Add Timer
        </button>
      )}
    </div>
  );
};

const HomeScreen = () => {
  const [activeTimers, setActiveTimers] = useState([1, 4, 6]);

  const handleAddTimer = (id) => {
    setActiveTimers([...activeTimers, id]);
  };

  const handleRemoveTimer = (id) => {
    setActiveTimers(activeTimers.filter((timerId) => timerId !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <div className="text-indigo-600 text-xl font-semibold">▽</div>
          <h1 className="text-xl font-semibold">TimeMaster</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-1.5 text-sm text-indigo-600 bg-white border border-indigo-200 rounded-md hover:bg-indigo-50">
            Remove Timer
          </button>
          <button className="px-4 py-1.5 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Add Timer
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Timely Content</h2>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Plus size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <GridIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <TimerCard
            key={id}
            id={id}
            hasTimer={activeTimers.includes(id)}
            onAdd={handleAddTimer}
            onRemove={handleRemoveTimer}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
