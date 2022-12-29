import { useFormikContext } from "formik";
import React, { FC, useRef, useState } from "react";
import { TextInput } from "./TextInput";

interface IMultiLanguageInput {
  containerClassName?: string;
  containterStyle?: React.CSSProperties | undefined;
  translateText: any;
};
const MultiLanguageInput: FC<IMultiLanguageInput> = ({
  containterStyle,
  containerClassName,
  translateText,
}) => {
  const [focus, setFocus] = useState<boolean>(false);

  const focusRef = useRef<any>();

  const { values, setFieldValue }: any = useFormikContext();

  const basicLang = values && values.basicLang;

  const onBlur = () => {
    clearTimeout(focusRef.current);
    const timeOut = setTimeout(() => {
      setFocus(false);
    }, 100);

    focusRef.current = timeOut;
  };

  const onFocus = () => {
    clearTimeout(focusRef.current);
    setFocus(true);
  };

  const onBasicChange = (val: string) => {
    const updatedBasic = { ...basicLang, text: val };
    setFieldValue("basicLang", updatedBasic);
  };

  const onOtherChange = (val: string, key: string) => {
    const updatedObj = { ...values[key], text: val };
    setFieldValue(key, updatedObj);
  };

  return (
    <div className={containerClassName} style={containterStyle}>
      <div>
        {basicLang && basicLang.label} <code className="text-[red]">*</code>
        <TextInput
          name="basicLang"
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          onChange={onBasicChange}
        />
        <div className="flex items-center mb-2">
          <div
            className="p-2 border border-[#ccc] rounded-md bg-[#3a6f04d2] text-[white]"
            onClick={() => {
              translateText(
                basicLang.text,
                Object.keys(values)
                  .filter((f) => f !== "basicLang")
                  .filter((f) => values[f].isSelected),
                values
              );
              // clearTimeout(focusRef.current);
            }}
          >
            Translate
          </div>
          <button
            className="p-2 mx-2 border border-[#ccc] rounded-md bg-[#04466fd2] text-[white]"
            type="submit"
          >
            Show The result{" "}
          </button>
        </div>
      </div>
      {focus &&
        Object.keys(values)
          .filter((f) => f !== "basicLang")
          .filter((f) => values[f].isSelected)
          .map((key) => {
            const dir: any = values[key] && new Intl.Locale(values[key].value);
            return (
              <div key={key}>
                {values[key] && values[key].label}{" "}
                {values[key] && values[key].required ? (
                  <code className="text-[red]">*</code>
                ) : (
                  ""
                )}
                <TextInput
                  dir={dir&&dir.textInfo&&dir.textInfo.direction}
                  name={key}
                  onFocus={() => onFocus()}
                  onBlur={() => onBlur()}
                  onChange={(val) => onOtherChange(val, key)}
                />
              </div>
            );
          })}
      <div></div>
    </div>
  );
};

export default MultiLanguageInput;
