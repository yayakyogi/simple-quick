import classNames from "classnames";
import React, { useRef, useState } from "react";
import {
  Checkbox,
  DatePicker,
  Dropdown,
  IconButton,
  Input,
  Popover,
  Whisper,
} from "rsuite";

export interface TaskProps {
  id: number;
  title: string;
  isCompleted: boolean;
  deadline: string;
  description: string;
}

interface Props {
  task: TaskProps;
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
  const ref = useRef<any>(null);
  const [addTitle, setAddTitle] = useState<string>("");
  const [description, setDescription] = useState<string>(task.description);
  const [editDescription, setEditDescription] = useState<boolean>(false);

  const counterDeadline = (date1: any, date2: any) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(date1 - date2);
    const diffTotal = Math.round(differenceMs / ONE_DAY);

    if (diffTotal <= 10 && diffTotal > 0) {
      return `${diffTotal} ${diffTotal > 1 ? "days" : "day"} left`;
    }

    return "";
  };

  const formatDate = (date: string) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <Checkbox
          checked={task.isCompleted}
          value={task.id}
          onChange={() => onUpdateData("isCompleted", !task.isCompleted)}
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
                  onUpdateData("title", addTitle);
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
            {task.deadline ? formatDate(task.deadline) : "Please set date"}
          </span>
        }
        <IconButton
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
          ref={ref}
          speaker={
            <Popover ref={ref} className="p-0 mt-0">
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => onDelete(task.id)}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Popover>
          }
        >
          <IconButton
            icon={<div className="i-mdi:dots-horizontal text-lg" />}
          />
        </Whisper>
      </div>
      {activeKey.includes(task.id) && (
        <div className="ps-7 mt-2">
          <div className="flex items-center">
            <div
              className={classNames(
                "i-mdi:clock-time-four-outline text-lg text-blue m-[10px]",
                { ["text-slate"]: task.isCompleted }
              )}
            />
            <DatePicker
              placement="top"
              size="sm"
              value={task.deadline ? new Date(task.deadline) : null}
              format="dd/MM/yyyy"
              cleanable={false}
              placeholder="Set Date"
              disabled={task.isCompleted}
              onChange={(value) => onUpdateData("deadline", value)}
            />
          </div>
          <div className="flex items-start">
            <IconButton
              disabled={task.isCompleted}
              icon={
                <div
                  className={classNames("i-mdi:pencil text-lg text-blue", {
                    ["text-slate"]: task.isCompleted,
                  })}
                />
              }
              onClick={() => setEditDescription(!editDescription)}
            />
            {editDescription ? (
              <Input
                as="textarea"
                rows={3}
                placeholder="Type message"
                value={description}
                hx-on:keydown="(event.keyCode===13&&!event.shiftKey)?event.preventDefault():null"
                onChange={(value) => {
                  setDescription(value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onUpdateData("description", description);
                    setEditDescription(false);
                  }
                }}
              />
            ) : (
              <p className="max-w-[80%] mt-3 text-sm">
                {task.description || "No Description"}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;
