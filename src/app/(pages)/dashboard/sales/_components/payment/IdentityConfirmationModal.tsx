"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import IdentityTerms from "./IdentityTerms";
import DocumentUpload from "./DocumentUpload";
import UploadConfirmation from "./UploadConfirmation";

interface PageProps {
  setShowModal: (value: boolean) => void;
}

const IdentityConfirmationModal = ({ setShowModal }: PageProps) => {
  const [filterStatus, setFilterStatus] = useState("terms");

  const renderContent = () => {
    if (filterStatus === "terms") {
      return <IdentityTerms setFilterStatus={setFilterStatus} />;
    } else if (filterStatus === "upload-document") {
      return <DocumentUpload setFilterStatus={setFilterStatus} />;
    } else if (filterStatus === "upload-confirmation") {
      return <UploadConfirmation />;
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-auto bg-black bg-opacity-70 text-black">
      <div className="flex h-[85%] w-[90%] flex-col gap-6 rounded-xl bg-white md:w-[35%]">
        <div className="m-0 w-full bg-primaryHover py-5 text-white">
          <div className="flex justify-between px-10">
            <h2 className="text-center text-xl font-medium">Verify Identity</h2>
            <button onClick={() => setShowModal(false)}>
              <IoClose size={30} />
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </section>
  );
};

export default IdentityConfirmationModal;
