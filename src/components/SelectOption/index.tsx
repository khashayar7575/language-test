import { ErrorMessage, Field } from "formik";
import React, { FC, useState } from "react";
import Select from "react-select";

interface ISelectOption {
  options: any;
  customStyles?: any;
  label?: string;
  labelClass?: string;
  icon?: any;
  iconPosition?: "first" | "last";
  name: string;
  inputWrapperClass?: string;
  placeholder?: string;
  type?: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isHashtag?: boolean;
  onChange?: any;
  selectedOption?: any;
  customOptions?: (val: any) => any | boolean;
  customComponents?: boolean | any;
  isClearable?: boolean;
  styles?: any;
}

const SelectOption: FC<ISelectOption> = ({
  options,
  label,
  labelClass,
  icon,
  iconPosition = "first",
  name,
  inputWrapperClass,
  placeholder,
  type,
  isMulti,
  isDisabled,
  isLoading,
  isHashtag,
  onChange,
  customComponents,
  customStyles,
  isClearable,
  styles,
  selectedOption,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const inputStyle = customStyles
    ? isHashtag
      ? { ...customStyles, ...hashtag }
      : { ...customStyles }
    : isHashtag
    ? { ...defaultStyles, ...hashtag }
    : { ...defaultStyles };

  return (
    <div className={inputWrapperClass}>
      <Field name={name}>
        {({ meta, form }: { meta: any; form: any }) => {
          return (
            <>
              {label && (
                <label
                  className={
                    "block  mb-2 text-[#565656] font-normal text-[14px] " +
                    labelClass
                  }
                >
                  {label}
                </label>
              )}
              <div className="relative">
                <div
                  className={`w-full   text-gray-500 border rounded-md outline-none bg-gray-50 flex justify-between items-center `}
                  style={{
                    backgroundColor: (focus || meta.value) && "white",
                    border: `1px solid ${
                      meta.touched
                        ? meta.error
                          ? "[#F42829]"
                          : "[#151AAE]"
                        : "[#E6E6E6]"
                    }`,
                    minHeight: "48px",
                    ...styles,
                  }}
                >
                  {icon && (
                    <div
                      className={
                        "h-[100%] flex items-center pl-[11px] " +
                        "order-" +
                        iconPosition
                      }
                    >
                      {icon}
                    </div>
                  )}
                  <Select
                    onChange={(opt) => {
                      form.setFieldValue(name, opt);
                      onChange(opt);
                    }}
                    value={meta.value}
                    options={options}
                    className={`w-full  outline-none bg-transparent `}
                    styles={inputStyle}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    placeholder={placeholder ? placeholder : "Search"}
                    isClearable={isClearable}
                    isMulti={isMulti}
                  />
                </div>

                <ErrorMessage name={name}>
                  {(msg: any) =>
                    typeof msg === "string" ? (
                      <p className="absolute text-[#F42829]">{msg}</p>
                    ) : (
                      <></>
                    )
                  }
                </ErrorMessage>
              </div>
            </>
          );
        }}
      </Field>
    </div>
  );
};

export { SelectOption };
const defaultStyles: any = {
  control: (base: any) => ({
    ...base,
    border: "none",
    borderRadius: 0,
    boxShadow: "none",
    fontSize: 14,
    padding: "0 15px",
    backgroundColor: "transparent",
  }),
  input: (base: any) => ({
    ...base,
    fontSize: 14,
    fontWeight: 300,
    paddingBottom: "5px",
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: 0,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#1D1929",
    fontSize: 14,
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#9ca3b0",
    fontSize: 14,
  }),
  menu: (provided: any) => ({
    ...provided,
    fontSize: 14,
    borderRadius: 0,
    marginTop: 0,
  }),
  option: (base: any, state: any) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
    color: state.isSelected ? "white" : "#1D1929",
    fontSize: 14,
  }),
  menuList: (base: any) => ({ ...base, padding: 0 }),
};
const hashtag: any = {
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "white",
    border: "1px solid #151AAE",
    color: "#151AAE",
  }),

  multiValueLabel: (base: any) => ({
    ...base,
    padding: 0,
    color: "#151AAE",
    fontSize: 14,
  }),
};
