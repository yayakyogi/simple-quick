import React, { useRef } from "react";

import TaskItemDate from "./date.component";
import TaskItemDescription from "./description.component";
import TaskItemHeader from "./header.component";
import TaskItemTypes from "./types.componen";

export interface ITask {
  id: number;
  title: string;
  isCompleted: boolean;
  deadline: string;
  description: string;
  type: string[];
}

interface Props {
  task: ITask;
  activeKey: number[];
  onExpand: () => void;
  onUpdateData: (key: string, value: any) => void;
  onDelete: (taskId: number) => void;
}

const ItemCard: React.FC<Props> = ({
  task,
  activeKey,
  onExpand,
  onUpdateData,
  onDelete,
}) => {
  const popoverRef = useRef<any>(null);

  return (
    <div ref={popoverRef} style={{ position: "relative" }}>
      <TaskItemHeader
        task={task}
        activeKey={activeKey}
        onDelete={onDelete}
        onExpand={onExpand}
        onUpdate={onUpdateData}
      />

      {/* Show body */}
      {activeKey.includes(task.id) && (
        <div className="ps-7 mt-2">
          <TaskItemDate task={task} onUpdate={onUpdateData} />
          <TaskItemDescription task={task} onUpdate={onUpdateData} />
          <TaskItemTypes
            popoverRef={popoverRef}
            task={task}
            onUpdate={onUpdateData}
          />
        </div>
      )}
    </div>
  );
};

export default ItemCard;
