import React, { useState, useEffect, useRef } from "react";
import { Item } from "./data";
import { ChevronDownIconFa, ChevronUpIconFa, CheckIconFa } from "./Icons";

interface DropdownProps {
  title: string;
  items: Item[];
  multiselect: boolean;
}

function Dropdown({ title, items, multiselect = false }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<Item[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCloseDropdown = (event: Event) => {
      if (containerRef.current !== null) {
        if (!containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleCloseDropdown);

    return () => document.removeEventListener("mousedown", handleCloseDropdown);
  }, []);

  const handleOnClick = (item: Item) => {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiselect) {
        setSelection([item]);
      } else if (multiselect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionCopy = [...selection];
      selectionCopy = selectionCopy.filter((current) => current.id !== item.id);
      setSelection([...selectionCopy]);
    }
  };

  const isItemInSelection = (item: Item) => {
    if (selection.find((current) => current.id === item.id)) {
      return true;
    }
    return false;
  };

  return (
    <div className="dropdown-container" ref={containerRef}>
      <div className="dropdown-header" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <div className="dropdown-header-title">{title}</div>

        <div className="dropdown-header-action">
          {isOpen ? <ChevronUpIconFa /> : <ChevronDownIconFa />}
        </div>
      </div>

      {isOpen && (
        <ul className="dropdown-list">
          {items.map((item) => (
            <li className="dropdown-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.name}</span>
                <span>{isItemInSelection(item) && <CheckIconFa />}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
