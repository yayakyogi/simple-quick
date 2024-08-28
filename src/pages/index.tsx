import InboxCard from "@components/inbox/inbox.component";
import TaskCard from "@components/task/task.component";
import classNames from "classnames";
import React, { useState } from "react";
import { IconButton } from "rsuite";

const Home: React.FC = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<string>("");

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {activeContent === "task" ? (
        <TaskCard />
      ) : activeContent === "inbox" ? (
        <InboxCard />
      ) : (
        <></>
      )}

      {/* Button quick */}
      <div
        className={classNames(
          "flex gap-3 absolute bottom-[36px] right-[34px] animate__animated",
          { ["animate__backOutRight"]: activeContent !== "" }
        )}
      >
        <div
          className={classNames(
            "flex gap-3 animate__animated animate__faster",
            { ["animate__bounceInRight"]: expand },
            { ["animate__backOutRight"]: !expand }
          )}
        >
          <IconButton
            size="lg"
            className="shadow-lg w-16 h-16 rounded-full btn-icon-custom"
            onClick={() => setActiveContent("task")}
            icon={
              <div className="i-mdi:book-open-outline text-amber text-3xl" />
            }
          />
          <IconButton
            size="lg"
            className="shadow-lg w-16 h-16 rounded-full btn-icon-custom"
            onClick={() => setActiveContent("inbox")}
            icon={
              <div className="i-mdi:message-reply-text-outline text-purple text-3xl" />
            }
          />
        </div>
        <IconButton
          size="lg"
          className="shadow-lg w-16 h-16 rounded-full bg-blue hover:bg-blue focus:bg-blue"
          onClick={() => setExpand(!expand)}
          icon={<div className="i-mdi:flash-outline text-3xl text-white" />}
        />
      </div>

      {/* Active Button */}
      {activeContent && (
        <div
          className={classNames(
            "flex items-center absolute bottom-[27px] right-[34px] gap-2"
          )}
        >
          <IconButton
            className="shadow-lg w-16 h-16 rounded-full btn-icon-custom animate__animated animate__bounceInRight animate__faster"
            icon={
              activeContent === "task" ? (
                <div className="i-mdi:message-reply-text-outline text-purple text-3xl " />
              ) : (
                <div className="i-mdi:book-open-outline text-amber text-3xl" />
              )
            }
            onClick={() =>
              setActiveContent(activeContent === "task" ? "inbox" : "task")
            }
          />

          <IconButton
            className="-mr-14 shadow-lg w-16 h-16 rounded-full bg-black hover:bg-black focus:bg-black animate__animated animate__bounceInRight animate__fast"
            onClick={() => {
              setActiveContent("");
              setExpand(false);
            }}
          />

          <IconButton
            className={classNames(
              "shadow-lg w-16 h-16 rounded-full animate__animated animate__bounceInRight animate__faster",
              {
                ["bg-amber hover:bg-amber focus:bg-amber"]:
                  activeContent === "task",
                ["bg-purple hover:bg-purple focus:bg-purple"]:
                  activeContent === "inbox",
              }
            )}
            icon={
              activeContent === "task" ? (
                <div className="i-mdi:book-open-outline text-white text-3xl " />
              ) : (
                <div className="i-mdi:message-reply-text-outline text-white text-3xl" />
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default Home;
