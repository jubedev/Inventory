import React from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onCreateNew: () => void;
  placeholder: string;
  buttonText: string;
  buttonIcon: string;
  showCreateButton: boolean;
}

/**
 * Componente reutilizable para barra de búsqueda con botón de acción
 */
const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onCreateNew,
  placeholder = "Buscar...",
  buttonText = "Nuevo",
  buttonIcon = "➕",
  showCreateButton = true,
}) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="flex-1 w-full md:w-auto flex gap-2">
        <Input
          label=""
          name="search"
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
          onKeyDown={onKeyDown}
        />

        <Button onClick={onSearch}>Buscar</Button>
      </div>
      {showCreateButton && (
        <Button
          onClick={onCreateNew}
          variant="primary"
          className="flex items-center gap-2"
        >
          <span className="text-xl">{buttonIcon}</span>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
