import ButtonIcon from "@components/ui/icon-button/icon-button.component";
import React, { useState } from "react";
import style from "./style.module.less";
import classNames from "classnames";
import TaskCard from "@components/task/task.component";

const Home: React.FC = () => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className="relative w-full h-screen">
      <TaskCard />
      <div className={classNames(style.actionIcon, { [style.expand]: expand })}>
        <div className="flex flex-col items-center gap-2">
          <span>Task</span>
          <ButtonIcon icon="icon-task-inactive" onClick={() => {}} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>Inbox</span>
          <ButtonIcon icon="icon-message-inactive" onClick={() => {}} />
        </div>
      </div>
      <ButtonIcon
        icon="icon-quick"
        onClick={() => setExpand(!expand)}
        className="absolute bottom-[27px] right-[34px] flex items-end gap-3 overflow-hidden"
      />
    </div>
  );
};

export default Home;
