import Image from "next/image";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { personas } from "@/config/personas";
import { useApp } from "@/contexts/AppContext";

interface PersonaOption {
  id: string;
  name: string;
  description: string;
}

interface PersonaSelectorProps {
  onPersonaChange?: (personaId: string) => void;
  disabled?: boolean;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  onPersonaChange,
  disabled = false,
}) => {
  const { selectedPersona: selectedPersonaId, setSelectedPersona } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const selectedPersona =
    personas.find((persona) => persona.id === selectedPersonaId) || personas[0];
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePersonaChange = (persona: PersonaOption) => {
    if (disabled) return;
    setSelectedPersona(persona.id);
    setIsOpen(false);
    if (onPersonaChange) {
      onPersonaChange(persona.id);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative group">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={disabled}
        >
          <span className="text-sm font-medium mr-2 truncate max-w-[120px]">
            {selectedPersona.name}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform flex-shrink-0 text-neutral-600 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {disabled && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            Create a new chat to change mode
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"></div>
          </div>
        )}
      </div>

      {isOpen && !disabled && (
        <div className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 max-h-64 overflow-y-auto">
            {personas.map((persona) => (
              <button
                key={persona.id}
                className={`block w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 ${
                  selectedPersona.id === persona.id
                    ? "text-neutral-900 bg-neutral-50"
                    : "text-neutral-700"
                }`}
                onClick={() => handlePersonaChange(persona)}
              >
                <div className="flex justify-between items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{persona.name}</div>
                    <div className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      {persona.description}
                    </div>
                  </div>
                  {selectedPersona.id === persona.id && (
                    <Image
                      src="/img/tick_icon.svg"
                      alt="Selected"
                      width={16}
                      height={16}
                      className="flex-shrink-0"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;
