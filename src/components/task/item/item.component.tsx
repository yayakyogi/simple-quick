import { time } from "@libraries/time";
import classNames from "classnames";
import { camelCase } from "lodash-es";
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

import style from "./item.module.less";

export interface TaskProps {
  id: number;
  title: string;
  isCompleted: boolean;
  deadline: string;
  description: string;
  type: string[];
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
  const containerRef = useRef<any>(null);

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

  const taskType = [
    "Important ASAP",
    "Offline Meeting",
    "Virtual Meeting",
    "ASAP",
    "Client Related",
    "Self Task",
    "Appoinments",
    "Court Related",
  ];

  return (
    <>
      <div
        className="flex justify-between items-center gap-2"
        ref={containerRef}
        style={{ position: "relative" }}
      >
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
      {activeKey.includes(task.id) && (
        <div className="ps-7 mt-2 relative">
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
          <div className="flex items-start mt-1">
            <IconButton
              disabled={task.isCompleted}
              className="btn-icon-custom"
              icon={
                <div
                  className={classNames(
                    "i-mdi:pencil-outline text-lg text-blue",
                    {
                      ["text-slate"]: task.isCompleted,
                    }
                  )}
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
              <p className="max-w-[80%] text-sm">
                {task.description || "No Description"}
              </p>
            )}
          </div>
          <div className="flex items-center py-2 mt-1 bg-gray rounded-md">
            <Whisper
              placement="bottomStart"
              trigger="click"
              container={() => containerRef.current}
              speaker={
                <Popover className="p-0" arrow={false} style={{ marginTop: 0 }}>
                  <Dropdown.Menu className="border-solid border-slate-5">
                    {taskType.map((val) => {
                      return (
                        <Dropdown.Item
                          key={val}
                          disabled={task.type.includes(val)}
                          className="min-w-48 px-2 py-1 hover:bg-white"
                          onClick={() => {
                            const sameValue = task.type.includes(val);

                            if (!sameValue) {
                              onUpdateData("type", [...task.type, val]);
                            }
                          }}
                        >
                          <div
                            className={classNames(
                              "p-2 rounded border-solid border-transparent hover:border-blue text-black",
                              style[camelCase(val)],
                              {
                                ["bg-gray"]: task.type.includes(val),
                              }
                            )}
                          >
                            {val}
                          </div>
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Popover>
              }
            >
              <IconButton
                className="bg-transparent hover:bg-transparent focus:bg-transparent"
                icon={
                  <div className="i-mdi:bookmark-multiple-outline text-lg text-blue" />
                }
              />
            </Whisper>
            <div className="flex flex-1 flex-wrap">
              {task.type.map((type) => {
                return (
                  <div
                    key={type}
                    className={classNames(
                      "rounded-md px-2 flex items-center gap-2 mr-1 mb-1",
                      style[camelCase(type)]
                    )}
                  >
                    <span className="text-sm">{type}</span>
                    <div
                      className="i-mdi:close cursor-pointer"
                      onClick={() => {
                        const updateType = task.type.filter(
                          (val) => val !== type
                        );

                        onUpdateData("type", updateType);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;
