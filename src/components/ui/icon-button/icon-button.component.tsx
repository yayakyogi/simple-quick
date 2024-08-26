import classNames from "classnames";
import React from "react";

interface Props {
  icon: string;
  onClick: () => void;
  className?: string;
}

const ButtonIcon: React.FC<Props> = ({ icon, className, onClick }) => {
  return (
    <img
      src={`assets/icons/${icon}.png`}
      className={classNames("cursor-pointer", className)}
      width={68}
      height={68}
      alt="Button Icon"
      onClick={onClick}
    />
  );
};

export default ButtonIcon;
