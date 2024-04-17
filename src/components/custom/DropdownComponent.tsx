import { Dispatch, SetStateAction } from "react";
import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
} from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface DropdownProps {
  dropdownOptions: OptionType[];
  placeholder: string;
  isMultiSelect?: boolean;
  isEditable?: boolean;
  handleChange: Dispatch<
    SetStateAction<OptionType[]>
  >;
  value?: OptionType | OptionType[];
}

function DropdownComponent({
  dropdownOptions,
  placeholder = "",
  isMultiSelect = true,
  isEditable = true,
  handleChange,
  value,
}: DropdownProps) {
  const onInputChange = (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (isMultiSelect) {
      const multiValue = newValue as MultiValue<OptionType>;
      handleChange(multiValue ? multiValue.map(option => ({ value: option.value, label: option.label })) : []);
    } else {
      const singleValue = newValue as SingleValue<OptionType> | null;
      const selectedOption = singleValue ? { value: singleValue.value, label: singleValue.label } : null;
      handleChange(selectedOption ? [selectedOption] : []);
    }
    console.log(actionMeta.option);
  };
  return (
    <>
      <Select
        options={dropdownOptions}
        defaultValue={value}
        onChange={onInputChange}
        placeholder={placeholder}
        isMulti={isMultiSelect ? true : false}
        isDisabled={isEditable ? false : true}
        isSearchable
        noOptionsMessage={() => "No options available"}
        isClearable
        // isLoading
        styles={{
          placeholder: (baseStyles) => ({
            ...baseStyles,
            fontSize: "1rem",
          }),
          container: (baseStyles) => ({
            ...baseStyles,
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: ".3rem",
            borderColor: state.isFocused ? "#F1F1F1" : "",
          }),
          multiValue: (baseStyles) => ({
            ...baseStyles,
            borderRadius: ".2rem",
          }),
          multiValueLabel: (baseStyles) => ({
            ...baseStyles,
            fontSize: ".8rem",
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            fontSize: ".8rem",
            padding: ".3rem",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            fontSize: ".8rem",
            color: "#163CEB",
          }),
        }}
      />
    </>
  );
}

export default DropdownComponent;
