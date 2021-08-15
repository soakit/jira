import React from "react";
type props = {
  name: string;
  keyword?: string;
};
export const Mark = ({ name, keyword }: props) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#FF0000" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
