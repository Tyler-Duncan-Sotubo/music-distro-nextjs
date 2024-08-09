import { useState } from "react";
import Image from "next/image";
import { FaImage, FaRegEdit, FaUserCircle } from "react-icons/fa";
import { Button } from "../ui/Button";
import { api } from "@/trpc/react";

const ProfilePhoto = () => {
  const photo = api.photo.getProfilePhoto.useQuery();

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [isModelOpen, setIsModelOpen] = useState(false);

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

  const uploadImageToServer = api.photo.updateProfilePhoto.useMutation({
    onSuccess: async () => {
      await photo.refetch();
      setIsModelOpen(false);
    },
  });

  const onSubmit = async () => {
    if (image) {
      await uploadImageToServer.mutateAsync({
        image: image as string,
        imageFileName: imageFileName!,
      });
    }
  };

  return (
    <>
      <section className="mx-auto mb-6 mt-10 flex flex-col items-center md:w-1/4">
        {photo?.data?.image ? (
          <Image
            src={photo?.data?.image || ""}
            width={320}
            height={320}
            className="rounded-full"
            alt="user profile image"
          />
        ) : (
          <FaUserCircle size={280} color="#1e40af" />
        )}
        <button
          className="my-6 flex items-center gap-3"
          onClick={() => setIsModelOpen(true)}
        >
          <FaRegEdit size={30} color="#1e40af" />
          <p className="font-medium text-primary">Edit Artists Photo</p>
        </button>
      </section>
      {isModelOpen && (
        <section className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-70">
          <div className="flex min-h-[30%] w-[90%] flex-col gap-6 bg-white px-10 py-10 md:h-[70%] md:w-[60%]">
            <div className="flex items-center justify-between border-b-2 border-secondary pb-6">
              <h3 className="text-xl md:text-4xl">Add Profile Photo</h3>
              <Button
                className="self-end"
                onClick={() => {
                  setIsModelOpen(false);
                  setImage(null);
                }}
              >
                Close
              </Button>
            </div>
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative hidden w-2/3 items-center justify-center bg-gray text-4xl uppercase shadow-2xl md:flex">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={String(image)} alt="Release Cover" />
                ) : (
                  <p>No Image</p>
                )}
              </div>
              <div className="md:border-2 md:border-dashed">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="flex h-full items-center justify-center bg-secondary shadow-2xl"
                >
                  <label className="flex w-64 cursor-pointer flex-col items-center px-4 py-6 tracking-wide text-primary">
                    <div className="md:hidden">
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={String(image)} alt="Release Cover" />
                      ) : (
                        <FaImage size={50} />
                      )}
                    </div>
                    <div className="hidden md:block">
                      <FaImage size={50} />
                    </div>
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

              {/* Submit Button */}
              <div className="self-end md:mt-16">
                <Button
                  onClick={async () => {
                    await onSubmit();
                  }}
                >
                  Submit
                </Button>
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default ProfilePhoto;