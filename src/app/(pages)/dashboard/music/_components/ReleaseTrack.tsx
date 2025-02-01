import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

type ReleaseTrackProps = {
  audioFileName: string;
  audioSubmitError: string;
  setReleaseAudio: (audio: string | ArrayBuffer | null) => void;
  setAudioFileName: (name: string) => void;
  setAudioSubmitError: (error: string) => void;
};

const ReleaseTrack = ({
  audioFileName,
  audioSubmitError,
  setReleaseAudio,
  setAudioFileName,
  setAudioSubmitError,
}: ReleaseTrackProps) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleAudioDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) {
      handleAudio(file);
    }
  };

  const handleAudio = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setReleaseAudio(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAudioDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUploadProgress = () => {
    setAudioSubmitError("");
    // Simulating upload process
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 20;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 300);
  };

  const handleAudioInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadProgress(0);
    const file = e.target.files?.[0];
    if (file) {
      setAudioFileName(file.name);
      handleAudio(file);
      handleUploadProgress();
    }
  };

  const cancelAudioUpload = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setUploadProgress(0);
    setReleaseAudio(null);
    setAudioFileName("");
  };

  return (
    <div>
      <h2 className="border-b py-10 text-4xl">5. Release Track</h2>
      <section className="min-h-30 my-10">
        {/* Upload Audio file Input */}
        <div className="h-[100px] border-2 border-dashed p-4">
          <div
            onDrop={handleAudioDrop}
            onDragOver={handleAudioDragOver}
            className="flex h-full items-center justify-center"
          >
            <label className="flex cursor-pointer items-center gap-4 px-4 py-6 tracking-wide text-primary">
              <FaUpload size={30} />
              <span className="text-lg">
                {uploadProgress <= 0
                  ? "Drag and drop an audio file"
                  : uploadProgress < 100 && uploadProgress > 0
                    ? "Uploading"
                    : "Drag and drop an audio file"}
              </span>
              <input
                type="file"
                accept=".mp3,.wav"
                className="hidden"
                onChange={handleAudioInputChange}
              />
            </label>
          </div>
        </div>
        {audioSubmitError && (
          <p className="my-2 text-error">{audioSubmitError}</p>
        )}
        {/* Audio Progress */}
        <div className="my-5">
          {audioFileName && (
            <div className="flex items-center justify-between">
              <p>{audioFileName}</p>
              <button
                onClick={cancelAudioUpload}
                className="bg-red-500 rounded-md px-4 py-2 text-black"
              >
                <MdCancel size={30} />
              </button>
            </div>
          )}
          {/* Audio Progress */}
          {uploadProgress > 0 && (
            <div className="flex h-[10px] items-center gap-2 rounded-md bg-zinc-900">
              <Progress value={uploadProgress} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReleaseTrack;
