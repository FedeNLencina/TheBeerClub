/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, Fragment } from "react";
import { Table } from "../../utils/interfaces/tables/tables";
import greenCircle from "../../assets/icons/greencircle.svg";
import redCircle from "../../assets/icons/redcircle.svg";
import { Dialog, Transition } from "@headlessui/react";
import { getDatabase, ref, onValue, remove } from "firebase/database";

interface TableProps {
  table?: Table;
  iconUrl?: string;
}

export const TableComponent = ({ table, iconUrl }: TableProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  //console.log("Table state: ", table?.open);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const removeTable = (id: string | undefined) => {
    const db = getDatabase();
    // referencio a la lista en la base de datos
    if (id) {
      const postListRef = ref(db, "tablesMock" + id);
      remove(postListRef)
        .then(() => {
          console.log("Lista de tablas eliminada correctamente");
        })
        .catch((error) => {
          console.error("Error al eliminar la lista de tablas:", error);
        });
    }
  };

  return (
    <div>
      {table && (
        <div className="relative">
          <button onClick={openModal}>
            <img src={iconUrl} alt="mesa" />
          </button>
          {table?.ocupped ? (
            <img
              className="w-1/4 absolute right-0 top-0"
              src={greenCircle}
              alt="Available"
            />
          ) : (
            <img
              className="w-1/4 absolute right-0 top-0"
              src={redCircle}
              alt="NotAvailable"
            />
          )}

          <Transition appear show={modalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Payment successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your payment has been successfully submitted. We’ve
                          sent you an email with all of the details of your
                          order.
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Got it, thanks!
                        </button>
                        {table.id && (
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => removeTable(table.id)}
                          >
                            Remove table
                          </button>
                        )}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </div>
  );
};
