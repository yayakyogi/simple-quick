import React from "react";
import { Dropdown, IconButton, Popover, Whisper } from "rsuite";
import classNames from "classnames";
import { ITask } from "./item.component";
import style from "./item.module.less";
import { camelCase } from "lodash-es";

interface Props {
  task: ITask;
  onUpdate: (key: string, value: string[]) => void;
  popoverRef: any;
}

const TaskItemTypes: React.FC<Props> = ({ task, onUpdate, popoverRef }) => {
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
    <div className="flex items-center py-2 mt-1 bg-gray rounded-md">
      <Whisper
        placement="bottomStart"
        trigger="click"
        container={() => popoverRef.current}
        speaker={
          <Popover className="p-0" arrow={false} style={{ marginTop: 0 }}>
            <Dropdown.Menu>
              {taskType.map((val) => {
                return (
                  <Dropdown.Item
                    key={val}
                    disabled={task.type.includes(val)}
                    className="min-w-48 px-2 py-1 hover:bg-white"
                    onClick={() => {
                      const sameValue = task.type.includes(val);

                      if (!sameValue) {
                        onUpdate("type", [...task.type, val]);
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
          disabled={task.isCompleted}
          className="bg-transparent hover:bg-transparent focus:bg-transparent"
          icon={
            <div
              className={classNames(
                "i-mdi:bookmark-multiple-outline text-lg hover:text-blue",
                {
                  "text-blue": task.type.length,
                }
              )}
            />
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
              <span className="text-sm font-600">{type}</span>
              {!task.isCompleted && (
                <div
                  className="i-mdi:close cursor-pointer"
                  onClick={() => {
                    // Delete type
                    const updateType = task.type.filter((val) => val !== type);

                    onUpdate("type", updateType);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskItemTypes;
