import classNames from "classnames";
import React from "react";
import { DatePicker } from "rsuite";
import { ITask } from "./item.component";

interface Props {
  task: ITask;
  onUpdate: (key: string, value: Date) => void;
}

const TaskItemDate: React.FC<Props> = ({ task, onUpdate }) => {
  return (
    <div className="flex items-center">
      <div
        className={classNames(
          "i-mdi:clock-time-four-outline text-lg m-[10px]",
          { "text-blue": task.deadline }
        )}
      />
      <DatePicker
        placement="bottomStart"
        size="sm"
        value={task.deadline ? new Date(task.deadline) : null}
        format="dd/MM/yyyy"
        cleanable={false}
        placeholder="Set Date"
        disabled={task.isCompleted}
        onChange={(value) => {
          if (value) {
            onUpdate("deadline", value);
          }
        }}
      />
    </div>
  );
};

export default TaskItemDate;
