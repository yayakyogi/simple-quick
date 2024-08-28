import React from "react";
import { Loader } from "rsuite";

const ConnectingAlert: React.FC = () => {
  return (
    <div className="p-3 -mx-4 rounded-md flex items-center gap-3 bg-#E9F3FF">
      <Loader />
      <span className="font-600">
        Please wait while we connect you with one of our team
      </span>
    </div>
  );
};

export default ConnectingAlert;
