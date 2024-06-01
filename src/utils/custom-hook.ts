import { useState } from "react";

interface Option {
  label: string;
  value: string | number;
}

const useCustomMultiSelect = (initialOptions: Option[]) => {
  const [value, setValue] = useState<Option[]>([]);
  const [options] = useState<Option[]>(initialOptions);

  const onChange = (selectedOptions: Option | Option[]) => {
    if (Array.isArray(selectedOptions)) {
      setValue(selectedOptions);
    } else {
      setValue([selectedOptions]);
    }
  };

  return { value, options, onChange };
};

export default useCustomMultiSelect;