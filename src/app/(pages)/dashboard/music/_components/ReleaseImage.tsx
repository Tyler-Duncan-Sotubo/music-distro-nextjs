import React from "react";
import { FaImage } from "react-icons/fa";

type ReleaseImageProps = {
  imageSubmitError: string;
  setImageFileName: (name: string) => void;
  releaseCover: string | ArrayBuffer | null;
  setReleaseCover: (releaseCover: string | ArrayBuffer | null) => void;
};

const ReleaseImage = ({
  imageSubmitError,
  setImageFileName,
  setReleaseCover,
  releaseCover,
}: ReleaseImageProps) => {
  const handleImage = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setReleaseCover(reader.result);
      };
      reader.readAsDataURL(file);
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

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      handleImage(file);
    }
  };
  return (
    <>
      <h2 className="mb-10 border-b py-5 text-4xl">3. Release Artwork</h2>
      <section className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="relative flex h-[400px] w-full items-center justify-center bg-gray text-4xl uppercase shadow-2xl md:w-[400px]">
          {releaseCover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={String(releaseCover)} alt="Release Cover" />
          ) : (
            <p>No Image</p>
          )}
        </div>
        <div className="border-2 border-dashed p-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex h-full items-center justify-center bg-secondary shadow-2xl"
          >
            <label className="flex w-64 cursor-pointer flex-col items-center px-4 py-6 tracking-wide text-primary">
              <FaImage size={60} />
              <span className="my-6 text-center font-bold">
                Drag and drop an image
              </span>
              <span className="mt-2 rounded-3xl border-2 px-6 py-3 font-bold leading-normal">
                Select a file
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

        {/* Image instructions */}
        <div className="">
          <h3 className="text-2xl tracking-wider">Artwork Guidelines</h3>
          <p className="my-4 text-sm">
            Cover art must be a square .jpg or .jpeg file, at least 3000x3000
            pixels, not blurry or pixelated and no more than 10mb in size.
          </p>
          <p className="my-4 text-sm tracking-wider">
            Cover art cannot contain: - Social media logos or handles - Website
            links or brand/record label logos - Any text except for artist names
            and/or the name of the release
          </p>
          <p className="my-4 text-sm tracking-wider">
            If your cover art contains any of the above, we will have to reject
            your release. These rules are set by the music stores and we have to
            follow them.
          </p>
        </div>
      </section>
      {imageSubmitError && <p className="text-error">{imageSubmitError}</p>}
      {/* Release Lyrics */}
    </>
  );
};

export default ReleaseImage;
