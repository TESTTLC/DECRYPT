import React, { ChangeEvent } from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';

interface Props {
  name: string;
  placeholder?: string;
  className?: string;
  isPassword?: boolean;
  readOnly?: boolean;
  isNumber?: boolean;
  maxLength?: number;
  minLength?: number;
  isTextArea?: boolean;
  rows?: number;
}

const FormField: React.FC<Props> = (props) => {
  const {
    name,
    placeholder,
    className,
    isPassword,
    readOnly,
    isNumber,
    maxLength,
    minLength,
    isTextArea,
    rows,
  } = props;
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched, // fields the user interacted with
    values,
  } = useFormikContext<Record<string, string>>();

  const returnType = () => {
    if (isPassword) {
      return 'password';
    } else if (isNumber) {
      return 'number';
    } else {
      return undefined;
    }
  };

  return (
    <>
      {isTextArea ? (
        <textarea
          rows={rows}
          maxLength={maxLength}
          className={className}
          placeholder={placeholder}
          readOnly={readOnly ? true : false}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setFieldValue(name, e.target.value);
          }}
          onBlur={() => setFieldTouched(name)}
          value={values[name] || ''}
          autoCapitalize={
            name === 'firstName' || name === 'lastName' ? 'words' : 'none'
          }
          autoComplete={'off'}
        />
      ) : (
        <input
          maxLength={maxLength}
          type={returnType()}
          className={className}
          placeholder={placeholder}
          readOnly={readOnly ? true : false}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFieldValue(name, e.target.value);
          }}
          onBlur={() => setFieldTouched(name)}
          value={values[name] || ''}
          autoCapitalize={
            name === 'firstName' || name === 'lastName' ? 'words' : 'none'
          }
          autoComplete={'off'}
        />
      )}
      <ErrorMessage
        error={errors[name]}
        isVisible={touched[name]}
        customStyles="mt-2"
      />
    </>
  );
};

export default FormField;
