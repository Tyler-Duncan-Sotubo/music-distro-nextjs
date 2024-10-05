import React from "react";

const UploadConfirmation = () => {
  return (
    <div className="mx-auto flex w-[90%] flex-col justify-center gap-4">
      <div className="flex items-center justify-center bg-secondary p-14">
        <h1 className="text-center text-3xl font-semibold">
          Document uploaded successfully
        </h1>
      </div>
      <h2 className="mt-10">What Happens Next</h2>
      <p className="text-lg">
        An admin will process the uploaded document to check if it is acceptable
        for verification.
      </p>
      <p className="text-lg">
        We will email if your document is acceptable or not. if your document is
        not acceptable, you will be required to upload another document.
      </p>
    </div>
  );
};

export default UploadConfirmation;
