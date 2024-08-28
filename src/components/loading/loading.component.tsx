import React from "react";
import { Loader } from "rsuite";

const Loading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex justify-center items-center h-[500px]">
      <Loader
        size="md"
        vertical
        content={<span className="font-600">{text}</span>}
      />
    </div>
  );
};

export default Loading;
