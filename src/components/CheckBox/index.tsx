import React, { FC } from "react";
import { BsCheck } from "react-icons/bs";
import { Field } from "formik";
import { useGetColor } from "../../config/Config";

export interface IRadioOption {
  id: string;
  label: string;
  name: string;
}



export interface IRadioGroup {
  language: any;
  wrapperClassName?: string;
  name: string;
  onClick: (e: any) => void;
}

const CheckBox: FC<IRadioGroup> = ({
  language,
  wrapperClassName,
  name,
  onClick,
}) => {
  const color = useGetColor({});

  return (
    <div className={"  " + wrapperClassName}>
      <Field name={name}>
        {({ meta, form: { setFieldValue } }: { meta: any; form: any }) => {
          return (
            <>
              <div className="  cursor-pointer">
                <label
                  className={`flex cursor-pointer text-[12px] items-center `}
                  htmlFor={language.code}
                  style={{ color: color?.NeutralGray2 }}
                >
                  <span
                    style={{
                      borderColor:
                        " linear-gradient(93.66deg, #151AAE 7.47%, #3282F5 100%)",
                      borderWidth: "1px",
                      backgroundColor:
                        language.required || language.disabled
                          ? color?.Primary
                          : color?.Transparent,
                    }}
                    className=" border-[1px] rounded w-5 h-5 mr-2 flex items-center"
                  >
                    {(language.required || language.disabled) && (
                      <BsCheck color={color?.white} size={18} />
                    )}
                  </span>
                </label>
                <input
                  className="hidden"
                  onChange={() => onClick(language)}
                  type="checkbox"
                  disabled={!language.isSelected}
                  value={language.code}
                  name={language.code}
                  id={language.code}
                />
              </div>
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default CheckBox;
