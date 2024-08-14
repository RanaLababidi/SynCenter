import { useState, useEffect } from "react";
import { clientsIndex } from "../http";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Menu({ onClientSelect, clientName, clientId }) {
  const [selected, setSelected] = useState(null);
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false); // State to control the list visibility
  const placeholder = "Select client";

  const fetchClients = async () => {
    try {
      const data = await clientsIndex();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (!selected) {
      const initialSelected = clients.find(client => client.id === clientId) || null;
      setSelected(initialSelected);
      onClientSelect(initialSelected ? initialSelected.id : clientId);
    }
  }, [clients, clientId]);

  const handleSelect = (client) => {
    setSelected(client);
    onClientSelect(client.id);
    setOpen(false); // Close the list after selection
  };

  return (
    <div className="relative mt-2">
      <label className="block text-background mt-3 font-title font-bold">Client:</label>
      <button
        type="button"
        className="relative cursor-default bg-white pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none form-input mt-1 block w-full border border-background rounded-lg py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center">
          {selected && selected.avatar && (
            <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
          )}
          <span className="ml-3 block truncate">
            {selected ? selected.name : clientName || placeholder}
          </span>
        </span>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {clients.map((client) => (
            <li
              key={client.id}
              className={classNames(
                "relative cursor-default select-none py-2 pl-3 pr-9",
                selected && selected.id === client.id ? "bg-pistach text-white" : ""
              )}
              onClick={() => handleSelect(client)}
            >
              <div className="flex items-center">
                <img src={client.image} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className={classNames(selected && selected.id === client.id ? "font-semibold" : "font-normal", "ml-3 block truncate")}>
                  {client.name}
                </span>
              </div>

              {selected && selected.id === client.id && (
                <span
                  className={classNames(
                    "absolute inset-y-0 right-0 flex items-center pr-4",
                    "text-white"
                  )}
                >
                  
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
