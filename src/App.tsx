import React, { useEffect, useState } from "react";
import MultiLanguageInput from "./components";
import axios from "axios";
import { LanguagesView } from "./components/LanguagesView";
import { Form, Formik } from "formik";
import { SelectOption } from "./components/SelectOption";
import * as Yup from "yup";
import "./App.css";

function App() {
  const [languages, setLanguages] = useState<any[]>([]);
  const [defaultbaseLanguage, setDefaultBaseLanguage] = useState<any>(null);
  const [basicLanguageOptions, setBasicLanguageOptions] = useState([]);
  const [labguagesVals, setLabguagesVals] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>(null);
  const [translateResult, setTranslateResult] = useState<any>([]);
  const getLanguageSource = async (val: string) => {
    const response = await axios.post(`https://libretranslate.de/detect`, {
      q: val,
    });

    return response.data[0].language;
  };

  const initialValidation = (keys: any) => {
    const validationKeys = languages
      .filter((f) => defaultbaseLanguage.value !== f.code)
      .filter((f) => f && f.isSelected && f.required)
      .map((m) => m.code);
    const basicLangValidation = Yup.object().shape({
      basicLang: Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
        text: Yup.string().required("لطفا این فیلد را پر کنید."),
        isSelected: Yup.boolean(),
        required: Yup.boolean(),
      }),
    });
    let yup = Yup.object().shape({});
    yup = yup.concat(basicLangValidation);
    validationKeys.forEach((key) => {
      const keyValidation = Yup.object().shape({
        [key]: Yup.object().shape({
          value: Yup.string(),
          label: Yup.string(),
          text: Yup.string().required("لطفا این فیلد را پر کنید."),
          isSelected: Yup.boolean(),
          required: Yup.boolean(),
        }),
      });
      yup = yup.concat(keyValidation);
    });
    return yup;
  };

  const handle = async () => {
    const locale = new Intl.Locale(navigator.language);
    const curLang = locale.language;
    await axios.get(`https://libretranslate.de/languages`).then((response) => {
      const localOptionLang: any = [];
      let langKeys: any = {};
      setLanguages([
        ...response.data.map((data: any) => {
          const isBase = data.code.toLowerCase() === curLang.toLowerCase();
          localOptionLang.push({
            value: data.code,
            label: data.name,
            text: "",
            isSelected: isBase,
            required: isBase,
          });
          if (!isBase)
            langKeys[data.code] = {
              value: data.code,
              label: data.name,
              text: "",
              isSelected: false,
              required: false,
            };
          if (isBase)
            setDefaultBaseLanguage({
              value: data.code,
              label: data.name,
              text: "",
              isSelected: true,
              required: true,
            });
          return {
            ...data,
            isSelected: false,
            required: isBase,
            disabled: isBase,
          };
        }),
      ]);
      setLabguagesVals(langKeys);
      setBasicLanguageOptions(localOptionLang);
    });
  };

  useEffect(() => {
    handle();
  }, []);

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      basicLang: defaultbaseLanguage ? defaultbaseLanguage : null,
      ...labguagesVals,
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultbaseLanguage, labguagesVals]);

  const onBasicLanguageChange = (opt: any) => {
    setLanguages((old) =>
      old.map((o) =>
        o.code === opt.value
          ? { ...o, required: true, disabled: true, isSelected: false }
          : o.disabled && o.required
          ? { ...o, required: false, disabled: false }
          : o
      )
    );
    setDefaultBaseLanguage({ ...opt, isSelected: true, required: true });
  };

  const translateText = async (val: string, keys: string[], values: any) => {
    const result = await getLanguageSource(val);

    let localInitialValues = { ...values };
    keys.forEach(async (key) => {
      let data = {
        q: val,
        source: result,
        target: key,
      };
      const response = await axios.post(
        `https://libretranslate.de/translate`,
        data
      );
      localInitialValues[key].text = response.data.translatedText;
    });
    setInitialValues(localInitialValues);
  };

  const onSubmit = (values: any) => {
    let result:any =[] 
    Object.keys(values)
      .filter((f) => values[f].isSelected)
      .forEach((key) => 
          {
            const dir:any =values[key]&& new Intl.Locale(values[key].value)

            result.push({
              text: values[key]&&values[key].text,
              label: values[key]&&values[key].label,
              dir: dir && dir.textInfo && dir.textInfo.direction
            })
          } 
        
      );
    setTranslateResult(result);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={initialValidation({
          basicLang: defaultbaseLanguage ? defaultbaseLanguage : null,
          ...labguagesVals,
        })}
      >
        <Form className="grid grid-cols-2 gap-6 px-2 mt-8">
          <LanguagesView languages={languages} setLanguages={setLanguages} />
          <div>
            <p className="font-semibold mb-2">
              Choose your basic language for translation to other languages
            </p>
            <div className="mb-12 w-6/12">
              <SelectOption
                name="basicLang"
                options={basicLanguageOptions}
                placeholder="Please select ..."
                isClearable
                onChange={onBasicLanguageChange}
              />
            </div>
            <div className="w-8/12">
              <h2 className="mb-4 font-semibold">Enter your product title</h2>
              <MultiLanguageInput
                translateText={translateText}
              />
              <div className="mt-8">
                {translateResult &&
                  translateResult.length > 0 &&
                  translateResult.map((key: any) => (
                    <div className="grid grid-cols-2 w-8/12 my-2" key={key.label}>
                      {key.label}:
                      <span dir={key.dir}>{key.text}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
