import classNames from "classnames";
import React from "react";
import { IconButton } from "rsuite";

interface Props {
  expand: boolean;
  activeContent: string;
  onExpand: () => void;
  onChangeContent: (task: string) => void;
  onChangeActiveContent: () => void;
  onClose: () => void;
}

const ShortCut: React.FC<Props> = ({
  expand,
  activeContent,
  onExpand,
  onChangeContent,
  onChangeActiveContent,
  onClose,
}) => {
  return (
    <>
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
            onClick={() => onChangeContent("task")}
            icon={
              <div className="i-mdi:book-open-outline text-amber text-3xl" />
            }
          />
          <IconButton
            size="lg"
            className="shadow-lg w-16 h-16 rounded-full btn-icon-custom"
            onClick={() => onChangeContent("inbox")}
            icon={
              <div className="i-mdi:message-reply-text-outline text-purple text-3xl" />
            }
          />
        </div>
        <IconButton
          size="lg"
          className="shadow-lg w-16 h-16 rounded-full bg-blue hover:bg-blue focus:bg-blue"
          onClick={onExpand}
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
            onClick={onChangeActiveContent}
          />

          <IconButton
            className="-mr-14 shadow-lg w-16 h-16 rounded-full bg-black hover:bg-black focus:bg-black animate__animated animate__bounceInRight animate__fast"
            onClick={onClose}
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
    </>
  );
};

export default ShortCut;
