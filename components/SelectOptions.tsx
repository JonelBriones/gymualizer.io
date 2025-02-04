import React from "react";

const SelectOptions = () => {
  return (
    <select>
      {Array(10)
        .fill("")
        .map((_, idx) => (
          <option value={idx} key={idx}>
            {idx}
          </option>
        ))}
    </select>
  );
};

export default SelectOptions;
