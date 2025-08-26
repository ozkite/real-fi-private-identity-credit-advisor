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
    <div className="bg-[#F7F6F2] sticky top-0 z-10 flex justify-between">
      <div className="relative ml-0" ref={dropdownRef}>
        <div className="relative group">
          <button
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`flex items-center justify-between w-full px-2 sm:px-3 py-1.5 rounded-md bg-[] transition-colors ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={disabled}
          >
            <span className="text-xs sm:text-sm font-medium mr-2 sm:mr-4 truncate">
              {selectedPersona.name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform flex-shrink-0 ${
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs sm:text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
              Create a new chat to change mode
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
            </div>
          )}
        </div>

        {isOpen && !disabled && (
          <div className="absolute left-0 z-10 mt-3 w-72 sm:w-80 origin-top-left rounded-md bg-[#F7F6F2] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-w-[calc(100vw-1rem)] sm:max-w-none">
            <div className="py-1 max-h-64 overflow-y-auto">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  className={`block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm ${
                    selectedPersona.id === persona.id
                      ? "text-neutral-900"
                      : "text-neutral-700"
                  }`}
                  onClick={() => handlePersonaChange(persona)}
                >
                  <div className="flex justify-between items-center gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{persona.name}</div>
                      <div className="text-xs text-neutral-500 line-clamp-2 sm:line-clamp-1">
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
    </div>
  );
};

export default PersonaSelector;
