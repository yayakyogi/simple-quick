import React, { useState } from "react";
import { ITask } from "./item.component";
import { IconButton, Input } from "rsuite";
import classNames from "classnames";

interface Props {
  task: ITask;
  onUpdate: (key: string, value: string) => void;
}

const TaskItemDescription: React.FC<Props> = ({ task, onUpdate }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(task.description);

  return (
    <div className="flex items-center my-1">
      <IconButton
        disabled={task.isCompleted}
        className="btn-icon-custom"
        icon={
          <div
            className={classNames(
              "i-mdi:pencil-outline text-lg hover:text-blue",
              {
                ["text-blue"]: task.description || task.deadline,
              }
            )}
          />
        }
        onClick={() => setIsEdit(!isEdit)}
      />
      {isEdit ? (
        <Input
          as="textarea"
          rows={3}
          placeholder="Type description"
          value={description}
          hx-on:keydown="(event.keyCode===13&&!event.shiftKey)?event.preventDefault():null"
          onChange={(value) => {
            setDescription(value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onUpdate("description", description);
              setIsEdit(false);
            }
          }}
        />
      ) : (
        <p className="max-w-[80%] text-sm">
          {task.description || "No Description"}
        </p>
      )}
    </div>
  );
};

export default TaskItemDescription;
