import { ChangeEventHandler } from 'react';

interface Props {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  required?: boolean;
}

const TextField = ({
  name,
  label,
  type,
  placeholder,
  value,
  required,
  onChange,
}: Props) => {
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
        onChange={onChange}
        required={required ?? false}
      />
    </div>
  );
};

export default TextField;
