import React from "react";

interface InputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "select"; // Puedes agregar más tipos según tus necesidades
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; // Añadimos onBlur
  required?: boolean;
  error?: string | null;
  className?: string;
  options?: { value: string; label: string }[]; // Para cuando sea un 'select'
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Para manejar eventos de teclado, especialmente en textarea y select
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  error,
  className,
  options,
  onKeyDown,
}) => {

  return (
    <div className={`flex flex-col space-y-1 w-full ${className}`}>
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`px-4 py-2 border rounded-lg transition-all outline-none focus:ring-2 
            ${
              error
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300"
            }`}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`px-4 py-2 border rounded-lg transition-all outline-none focus:ring-2 
            ${
              error
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300"
            }`}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`px-4 py-2 border rounded-lg transition-all outline-none focus:ring-2 
          ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300"
          }`}
          onKeyDown={onKeyDown}
        />
      )}  
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
