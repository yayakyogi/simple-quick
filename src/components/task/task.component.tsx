import React, { useEffect, useState } from "react";
import { Button, Divider, SelectPicker } from "rsuite";
import ItemCard, { TaskProps } from "./item/item.component";
import Loading from "@components/loading/loading.component";

const TaskCard: React.FC = () => {
  const [activeKey, setActiveKey] = useState<number[]>([]);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const updateTask = (taskId: number, key: any, value: any) => {
    const updateTask = tasks.map((task: any) => {
      if (task.id === taskId) {
        task[key] = value;
      }

      return task;
    });

    setTasks(updateTask);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        const arrs: TaskProps[] = json.map((val: any) => ({
          id: val.id,
          title: val.title,
          description: val.body,
          deadline: new Date().toString(),
          isCompleted: false,
          type: [],
        }));

        setTasks(arrs);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="card-quick animate__animated animate__bounceInRight">
      <div className="flex justify-between items-center sticky top-0 bg-white z-1 pt-6 pb-[22px]">
        <SelectPicker
          data={taskMenu}
          defaultValue="my-task"
          searchable={false}
        />
        <Button
          appearance="primary"
          onClick={() => {
            setTasks((old: TaskProps[]) => [
              {
                id: new Date().getMilliseconds(),
                title: "",
                isCompleted: false,
                deadline: "",
                description: "",
                type: [],
              },
              ...old,
            ]);
          }}
        >
          New Task
        </Button>
      </div>
      {isLoading ? (
        <Loading text="Loading Task ..." />
      ) : (
        tasks.map((task: TaskProps, index: number) => {
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
        })
      )}
    </div>
  );
};

export default TaskCard;
