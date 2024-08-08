import { useState, useEffect } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Define the levels with their respective IDs
const levels = [
  { id: 0, name: 'JUNIOR' },
  { id: 1, name: 'MID_LEVEL' },
  { id: 2, name: 'SENIOR' }
];

export default function MenuLevels({ onClientSelect, clientName, clientId }) {
  const [selected, setSelected] = useState(null);
  const [clients, setClients] = useState(levels); // Initialize clients with levels
  const placeholder = "Select Level: ";

  useEffect(() => {
    onClientSelect(selected ? selected.id : clientId);
  }, [selected, onClientSelect]);

  useEffect(() => {
    setSelected(clients.find(client => client.id === clientId) || null);
  }, [clients, clientId]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <label className="block text-background mt-3 font-title font-bold">Level:</label>
          <div className="relative mt-2">
            <ListboxButton
              className="relative cursor-default bg-white pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none form-input mt-1 block w-full border border-background rounded-lg py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6"
            >
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {selected ? selected.name : clientName || placeholder}
                </span>
              </span>
            </ListboxButton>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {clients.map((client) => (
                  <ListboxOption
                    key={client.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-pistach text-white" : "",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={client}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>
                            {client.name}
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-pistach",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
