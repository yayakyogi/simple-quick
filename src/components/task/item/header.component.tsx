import React, { useState } from "react";
import { ITask } from "./item.component";
import {
  Checkbox,
  Dropdown,
  IconButton,
  Input,
  Popover,
  Whisper,
} from "rsuite";
import classNames from "classnames";
import { time } from "@libraries/time";

interface Props {
  task: ITask;
  activeKey: number[];
  onUpdate: (key: string, value: any) => void;
  onExpand: () => void;
  onDelete: (taskId: number) => void;
}

const TaskItemHeader: React.FC<Props> = ({
  task,
  onUpdate,
  onDelete,
  onExpand,
  activeKey,
}) => {
  const [addTitle, setAddTitle] = useState<string>("");

  const counterDeadline = (date1: any, date2: any) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date1 - date2);
    const diffTotal = Math.round(differenceMs / ONE_DAY);

    if (diffTotal <= 10 && diffTotal > 0) {
      return `${diffTotal} ${diffTotal > 1 ? "days" : "day"} left`;
    }

    return "";
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <Checkbox
        checked={task.isCompleted}
        disabled={!task.title}
        value={task.id}
        onChange={() => onUpdate("isCompleted", !task.isCompleted)}
        className="cursor-pointer"
      />
      <div className="flex-1">
        {task.title ? (
          <span
            className={classNames("font-600", {
              ["line-through"]: task.isCompleted,
            })}
          >
            {task.title}
          </span>
        ) : (
          <Input
            size="sm"
            placeholder="Insert title"
            onChange={(value) => setAddTitle(value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onUpdate("title", addTitle);
              }
            }}
          />
        )}
      </div>

      {!task.isCompleted && task.deadline && (
        <span className="text-red">
          {counterDeadline(new Date(task.deadline), new Date())}
        </span>
      )}
      {
        <span>
          {task.deadline
            ? time(task.deadline).format("DD/MM/YYYY")
            : "Please set date"}
        </span>
      }
      <IconButton
        className="btn-icon-custom"
        icon={
          <div
            className={classNames("text-lg", {
              ["i-mdi:chevron-down"]: !activeKey.includes(task.id),
              ["i-mdi:chevron-up"]: activeKey.includes(task.id),
            })}
          />
        }
        onClick={onExpand}
      />
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={
          <Popover className="p-0 mt-0">
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => onDelete(task.id)}
                className="w-20 text-center"
              >
                <span className="text-danger">Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Popover>
        }
      >
        <IconButton
          className="btn-icon-custom"
          icon={<div className="i-mdi:dots-horizontal text-lg" />}
        />
      </Whisper>
    </div>
  );
};

export default TaskItemHeader;
