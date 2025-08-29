import React from "react";

type SelectOption = string | { name: string };

type SelectProps = {
  array: SelectOption[];
  otherAtributes?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

function MySelect({ array, otherAtributes,  ...props }: SelectProps) {
  return (
    <select {...props} className={`my-select w-full mb-2 border border-slate-300 ${otherAtributes}`}>
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