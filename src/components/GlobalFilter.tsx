import React from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ globalFilter, setGlobalFilter }: { globalFilter: string; setGlobalFilter: (filterValue: string) => void }) => {

  const [value, setValue] = React.useState(globalFilter);
 
  const onChange = useAsyncDebounce((value:any) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`records...`}
      />
    </span>
  );
};
