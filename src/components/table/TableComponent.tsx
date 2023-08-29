/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, Fragment } from "react";
import { Table } from "../../utils/interfaces/tables/tables";
import greenCircle from "../../assets/icons/greencircle.svg";
import redCircle from "../../assets/icons/redcircle.svg";
import { Dialog, Transition } from "@headlessui/react";

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

          {/* {modalOpen && (
            <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800">
              <div className="bg-white rounded-lg w-1/2">
                <div className="flex flex-col items-start p-4">
                  <div className="flex items-center w-full">
                    <div className="text-gray-900 font-medium text-lg">
                      My modal title
                    </div>
                    <svg
                      onClick={closeModal}
                      className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 18 18"
                    >
                      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                    </svg>
                  </div>
                  <hr />
                  <div className="">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                  <hr />
                  <div className="ml-auto">
                    <button
                      className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )} */}
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
