import React from "react";

type SelectOption = string | { name: string };

type SelectProps = {
  array: SelectOption[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

function Select({ array, ...props }: SelectProps) {
  return (
    <select {...props}>
      <option value=""></option>
      {array.map((e) => {
        const value = typeof e === "string" ? e : e.name;
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      })}
    </select>
  );
}
export default Select