import InboxCard from "@components/inbox/inbox.component";
import ShortCut from "@components/shortcut/shortcut.component";
import TaskCard from "@components/task/task.component";
import React, { useState } from "react";
import { Input, InputGroup } from "rsuite";

const Home: React.FC = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<string>("");

  return (
    <div className="relative ml-a w-[80%] border border-solid border-slate-3 h-screen overflow-hidden">
      <div className="p-3">
        <InputGroup>
          <InputGroup.Addon>
            <div className="i-mdi:search" />
          </InputGroup.Addon>
          <Input />
        </InputGroup>
      </div>
      {activeContent === "task" ? (
        <TaskCard />
      ) : activeContent === "inbox" ? (
        <InboxCard />
      ) : (
        <></>
      )}

      <ShortCut
        expand={expand}
        activeContent={activeContent}
        onExpand={() => setExpand(!expand)}
        onChangeContent={setActiveContent}
        onChangeActiveContent={() => {
          setActiveContent(activeContent === "task" ? "inbox" : "task");
        }}
        onClose={() => {
          setActiveContent("");
          setExpand(false);
        }}
      />
    </div>
  );
};

export default Home;
