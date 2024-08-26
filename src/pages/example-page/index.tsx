import React from "react";
import { useState } from "react";
import { Button } from "rsuite";
import style from "./styles.module.less"; // for custom css

const ExamplePage: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className={style.title}>Counting {count}</h1>
      <div className="flex gap-2">
        <Button appearance="ghost" onClick={() => setCount(0)}>
          Resets
        </Button>
        <Button appearance="primary" onClick={() => setCount(count + 1)}>
          Count
        </Button>
      </div>
    </div>
  );
};

export default ExamplePage;
