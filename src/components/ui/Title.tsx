import React, { CSSProperties } from "react";

const style: CSSProperties = {
  margin: 0,
  color: "#c5c7e2",
};

type Props = {
  title: string;
};

const Title: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <h1 style={style}>{title}</h1>
    </div>
  );
};

export default Title;
