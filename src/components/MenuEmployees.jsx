import { useState, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { employeeLoade } from "../http";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuEmployees({
  onClientSelect,
  clientName,
  clientId,
}) {
  const [selected, setSelected] = useState([]);
  const [clients, setClients] = useState([]);
  const placeholder = "Select employees";

  const handleButtonClick = async () => {
    try {
      const data = await employeeLoade();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    if (clients.length > 0 && Array.isArray(clientId)) {
      setSelected(clients.filter((client) => clientId.includes(client.id)));
    }
  }, [clients, clientId]);

  useEffect(() => {
    onClientSelect(selected.map((client) => client.id));
  }, [selected]);

  const handleSelection = (client) => {
    setSelected((prevSelected) =>
      prevSelected.some((item) => item.id === client.id)
        ? prevSelected.filter((item) => item.id !== client.id)
        : [...prevSelected, client]
    );
  };

  return (
    <div className="relative">
      <div className="block text-background mt-3 font-title font-bold">
        Clients:
      </div>
      <Listbox as="div" className="mt-2">
        {({ open }) => (
          <>
            <ListboxButton
              className="relative cursor-default bg-white pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none form-input mt-1 block w-full border border-background rounded-lg py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6"
              onClick={handleButtonClick}
            >
              <span className="flex items-center">
                {selected.length > 0 && selected[0].avatar && (
                  <img
                    src={selected[0].avatar}
                    alt=""
                    className="h-5 w-5 flex-shrink-0 rounded-full"
                  />
                )}
                <span className="ml-3 block truncate">
                  {selected.length > 0
                    ? selected.map((client) => client.name).join(",")
                    : clientName || placeholder}
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
                    onClick={() => handleSelection(client)}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={client.image}
                            alt=""
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {client.name}
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-pistach",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          ></span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
