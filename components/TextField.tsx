import { ChangeEventHandler, useState } from 'react';

interface Props {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  required?: boolean;
  pattern?: RegExp;
  validationMessage?: string;
}

/**
 * Remove first and last '/' for input tag.
 */
const parsePattern = (pattern: RegExp) => {
  const patternStr = pattern.toString();
  return patternStr.substr(1, patternStr.length - 2);
};

const TextField = ({
  name,
  label,
  type,
  placeholder,
  value,
  required,
  onChange,
  pattern,
  validationMessage,
}: Props) => {
  const [valid, setValid] = useState<boolean>(true);
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="" className="text-gray-500">
        {label}
      </label>
      <input
        name={name}
        type={type ?? 'text'}
        placeholder={placeholder}
        className="h-12 border-2 border-gray-200 rounded-md transition focus:border-gray-600 focus:ring-gray-600"
        value={value}
        onChange={(e) => {
          onChange(e);
          if (pattern && pattern.test(e.target.value)) {
            setValid(true);
          }
        }}
        onBlur={(e) => {
          if (pattern && !pattern.test(e.target.value)) {
            setValid(false);
          } else {
            setValid(true);
          }
        }}
        required={required ?? false}
        title={validationMessage}
        pattern={pattern ? parsePattern(pattern) : undefined}
        autoComplete={type && type === 'password' ? 'on' : 'off'}
      />
      {!valid && <p className="text-sm text-red-500">{validationMessage}</p>}
    </div>
  );
};

export default TextField;
