import React, { useState } from "react";
import { Button, Divider, SelectPicker } from "rsuite";
import ItemCard, { TaskProps } from "./card/card.component";
import style from "./task.module.less";

const TaskCard: React.FC = () => {
  const taskMenu = [
    {
      label: "My Task",
      value: "my-task",
    },
    {
      label: "Personal Errands",
      value: "personal-errands",
    },
    {
      label: "Urget To-Do",
      value: "urgent-to-do",
    },
  ];

  const [activeKey, setActiveKey] = useState<number[]>([]);
  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: 1,
      title: "Ini title 3",
      isCompleted: false,
      deadline: new Date().toString(),
      description:
        "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    },
    {
      id: 2,
      title: "Ini title 2",
      isCompleted: true,
      deadline: new Date().toString(),
      description:
        "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    },
  ]);

  const updateTask = (taskId: number, key: any, value: any) => {
    const updateTask = tasks.map((task: any) => {
      if (task.id === taskId) {
        task[key] = value;
      }

      return task;
    });

    setTasks(updateTask);
  };

  return (
    <div className={style.card}>
      <div className="flex justify-between items-center mb-[22px]">
        <SelectPicker
          data={taskMenu}
          defaultValue="my-task"
          searchable={false}
        />
        <Button
          appearance="primary"
          onClick={() => {
            setTasks((old: TaskProps[]) => [
              ...old,
              {
                id: Math.floor(Math.random() * 5),
                title: "",
                isCompleted: false,
                deadline: "",
                description: "",
              },
            ]);
          }}
        >
          New Task
        </Button>
      </div>
      {tasks.reverse().map((task: TaskProps, index: number) => {
        return (
          <div key={task.id}>
            <ItemCard
              task={task}
              activeKey={activeKey}
              onUpdateData={(key, value) => {
                updateTask(task.id, key, value);
              }}
              onDelete={(taskId) => {
                const newTask = tasks.filter((val) => val.id !== taskId);

                setTasks(newTask);
              }}
              onExpand={() => {
                setActiveKey((value) => {
                  if (activeKey.includes(task.id)) {
                    return value.filter((id) => id !== task.id);
                  }

                  return [...value, task.id];
                });
              }}
            />
            {tasks.length - 1 !== index && <Divider className="my-[22px]" />}
          </div>
        );
      })}
    </div>
  );
};

export default TaskCard;
