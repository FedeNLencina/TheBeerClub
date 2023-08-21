/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Table } from "../../utils/interfaces/tables/tables";
import greenCircle from "../../assets/icons/greencircle.svg";
import redCircle from "../../assets/icons/redcircle.svg";

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
          {modalOpen && (
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
          )}
        </div>
      )}
    </div>
  );
};
