import { useState } from "react";

// Define the structure of each option
interface Option {
  label: string; // Label to display
  value: string | number; // Value of the option
}

// Custom hook for managing multi-select state
const useCustomMultiSelect = (initialOptions: Option[]) => {
  // State variables for selected value and options
  const [value, setValue] = useState<Option[]>([]);
  const [options] = useState<Option[]>(initialOptions);

  // Function to handle selection change
  const onChange = (selectedOptions: Option | Option[]) => {
    if (Array.isArray(selectedOptions)) {
      // If multiple options are selected, set the selected options
      setValue(selectedOptions);
    } else {
      // If a single option is selected, convert it into an array and set
      setValue([selectedOptions]);
    }
  };

  // Return selected value, options, and onChange function
  return { value, options, onChange };
};

export default useCustomMultiSelect; // Export the custom hook