import React from "react";

type SelectOption = string | { name: string };

type SelectProps = {
  array: SelectOption[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

function MySelect({ array, ...props }: SelectProps) {
  return (
    <select {...props} className="w-full mb-3 border border-slate-300">
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
export default MySelect