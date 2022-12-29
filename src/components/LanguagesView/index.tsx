import { useFormikContext } from "formik";
import React, { FC } from "react";
import CheckBox from "../CheckBox";

interface ILanguagesView {
  languages: any[];
  setLanguages: any;
}

const LanguagesView: FC<ILanguagesView> = ({ languages, setLanguages }) => {
  const { values, setFieldValue }: any = useFormikContext();

  const toggleSelected = (code: string) => {
    setLanguages((old: any) =>
      old.map((o: any) =>
        o.code === code
          ? {
              ...o,
              isSelected: !o.isSelected,
              required: o.isSelected ? false : o.required,
            }
          : o
      )
    );

    setFieldValue(code, {
      ...values[code],
      isSelected: !values[code].isSelected,
      required: values[code].isSelected ? false : values[code].required,
    });
  };

  const onChangeRequired = (value: any, code: string) => {
    const isRequired = !value.required;
    setLanguages((old: any) =>
      old.map((o: any) =>
        o.code === value.code ? { ...o, required: isRequired } : o
      )
    );
    setFieldValue(code, {
      ...values[code],
      required: !values[code].required,
    });
  };

  return (
    <div >
      <p className='font-semibold mb-2'>please select the languages </p>
    <div className="grid grid-cols-3 gap-6 w-11/12">
      {languages &&
        languages.length > 0 &&
        languages.map((language) => (
          <div
            key={language?.code}
            className={`flex justify-between items-center border rounded-md border-[#151AAE] ${
              language.disabled ? "bg-[#c7c7c7]" : ""
            } ${language.isSelected ? "bg-[#cfcdff]" : ""}`}
          >
            <span
              className="flex-1 p-4 "
              onClick={
                !language.disabled
                  ? () => toggleSelected(language?.code)
                  : () => {}
              }
            >
              {language?.name}
            </span>
            <CheckBox
              name={language?.code}
              language={language}
              onClick={
                !language.disabled
                  ? (e) => onChangeRequired(e, language.code)
                  : () => {}
              }
            />
          </div>
        ))}
    </div>
    </div>
  );
};

export { LanguagesView };
