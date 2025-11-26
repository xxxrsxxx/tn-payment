'use client';
import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

import style from './Radio.module.css';

interface RadioGroupContextProps {
  selectedValue: string;
  onChange: (value: string) => void;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextProps | undefined>(
  undefined,
);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('useRadioGroup must be used within a RadioGroup');
  }
  return context;
};

interface RadioGroupProps {
  children: ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name: string;
}

export const RadioGroup = ({
  children,
  defaultValue,
  onChange,
  name,
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <RadioGroupContext.Provider
      value={{ selectedValue, onChange: handleChange, name }}
    >
      <div className={style.wrapper}>{children}</div>
    </RadioGroupContext.Provider>
  );
};

interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  value: string;
  children?: ReactNode;
}

export const Radio = ({ value, children, ...props }: RadioProps) => {
  const { selectedValue, onChange, name } = useRadioGroup();
  const isChecked = selectedValue === value;

  return (
    <label className={style.item}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => onChange(value)}
        className={style.input}
        {...props}
      />
      <span className={style.icon}></span>
      {children}
    </label>
  );
};
