import { ErrorMessage, Field } from "formik";
import React, { FC, useState } from "react";

interface ITextInput {
  label?: string;
  labelClass?: string;
  icon?: any;
  iconPosition?: "first" | "last";
  name: string;
  inputWrapperClass?: string;
  placeholder?: string;
  type?: string;
  children?: any;
  style?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (val: string) => void;
  dir?: string;
}

const TextInput: FC<ITextInput> = ({
  label,
  labelClass,
  icon,
  iconPosition = "first",
  name,
  inputWrapperClass,
  placeholder,
  type,
  children,
  onFocus,
  style,
  onBlur,
  onChange,
  dir,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className={inputWrapperClass + " mb-7"}>
      <Field name={name}>
        {({ meta, form }: { meta: any; form: any }) => {
          return (
            <>
              {label && (
                <label
                  className={
                    "block mb-2 text-[#565656] font-[400] text-[14px] " +
                    labelClass
                  }
                >
                  {label}
                </label>
              )}
              <div className="relative ">
                <div
                  className={`w-full text-gray-500 border rounded-md outline-none bg-gray-50 flex justify-between items-center min-h-[48px]`}
                  style={{
                    backgroundColor: (focus || meta.value) && "white",
                    border: `1px solid ${
                      meta.touched
                        ? meta.error
                          ? "[#F42829]"
                          : "[#151AAE]"
                        : "[#E6E6E6]"
                    }`,
                    ...style,
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

                  <input
                    dir={dir}
                    onFocus={() => {
                      setFocus(true);
                      onFocus && onFocus();
                    }}
                    onBlur={() => {
                      setFocus(false);
                      onBlur && onBlur();
                    }}
                    type={type ? type : "text"}
                    placeholder={placeholder ? placeholder : "Search"}
                    className={`w-full  px-3 outline-none bg-transparent text-[12px]`}
                    onChange={
                      onChange
                        ? (text) => onChange(text.target.value)
                        : (text) => form.setFieldValue(name, text.target.value)
                    }
                    value={
                      meta.value && meta.value.text
                        ? meta.value.text
                        : undefined
                    }
                  />
                  {children}
                </div>
                <ErrorMessage name={name}>
                  {(msg: any) =>
                    typeof msg === "string" ? (
                      <p className="absolute text-[#F42829]">{msg}</p>
                    ) : msg.text ? (
                      <p className="absolute text-[#F42829]">{msg.text}</p>
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

export { TextInput };
