"use client";

import { useState } from "react";
import Image from "next/image";
import { FaIdCard, FaImage, FaPassport } from "react-icons/fa";
import DocumentButton from "./document-button";
import axios from "@/libs/axios";
import { useSession } from "next-auth/react";

interface Props {
  setFilterStatus: (value: string) => void;
}
const DocumentUpload = ({ setFilterStatus }: Props) => {
  const { data: session } = useSession();

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [document, setDocument] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    if (!image || !document) {
      setError("Please select a document and upload an image");
      setIsLoading(false);
      return;
    }
    try {
      // Send the image and document type to the server
      const res = await axios.post("/api/id-check", {
        image: image as string,
        imageFileName: imageFileName!,
        user: session?.user,
        documentType: document,
      });

      // Handle the response
      if (res.status === 201) {
        setIsLoading(false);
        setFilterStatus("upload-confirmation");
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
      setIsLoading(false);
    }
  };

  const handleImage = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      handleImage(file);

      const maxSizeInBytes = 4 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        setError("Maximum Image Size is 4MB Please Upload a Smaller Image");
        return;
      } else {
        setError("");
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <section>
      {/* Document Select in radio input */}
      <div>
        <h2 className="mb-3 text-center text-2xl font-bold">
          Select Document to Verify
        </h2>
        <div className="flex flex-col items-center justify-between gap-1">
          <div className="flex items-center justify-between">
            <input
              type="radio"
              id="id_card"
              name="document"
              value="id_card"
              className="mr-2"
              onChange={(e) => setDocument(e.target.value)}
            />
            <label htmlFor="id_card">Driver&#39;s License</label>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="radio"
              id="nin"
              name="document"
              value="nin"
              className="mr-2"
              onChange={(e) => setDocument(e.target.value)}
            />
            <label htmlFor="nin">NIN</label>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="radio"
              id="passport"
              name="document"
              value="passport"
              className="mr-2"
              onChange={(e) => setDocument(e.target.value)}
            />
            <label htmlFor="passport">International Passport</label>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="mx-auto my-4 min-h-80 w-[90%]">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex h-full items-center justify-center bg-secondary shadow-2xl"
        >
          <label className="flex h-80 w-[95%] cursor-pointer flex-col items-center py-2 tracking-wide text-primary">
            {image ? (
              <div className="relative h-[99%] w-[99%]">
                <Image
                  src={image as string}
                  alt="uploaded image"
                  fill
                  objectFit="cover"
                />
              </div>
            ) : (
              <div>
                {document === "id_card" ? (
                  <FaIdCard className="h-56 w-64" />
                ) : document === "passport" ? (
                  <FaPassport className="h-56 w-64" />
                ) : (
                  <FaImage className="h-56 w-64" /> // Default rendering when nothing is selected
                )}
              </div>
            )}
            <span className="my-6 text-center font-bold">
              Drag and drop an image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center text-sm">
          <p className="text-error">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="mx-10 my-4 flex justify-end text-lg font-bold">
        <DocumentButton
          className="bg-primary text-white"
          isLoading={isLoading}
          onClick={() => onSubmit()}
        >
          Submit
        </DocumentButton>
      </div>
    </section>
  );
};

export default DocumentUpload;
