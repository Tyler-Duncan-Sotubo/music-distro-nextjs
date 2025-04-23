import { Button } from "@/components/ui/Button";
import { MdPhotoAlbum } from "react-icons/md";

interface Props {
  setFilterStatus: (value: string) => void;
}
const IdentityTerms = ({ setFilterStatus }: Props) => {
  return (
    <section className="mx-auto flex w-[90%] flex-col items-center justify-center gap-6">
      <div>
        <h2>Let&apos;s verify Your identity</h2>
        <h4 className="text-center">To get verified you would need to: </h4>
      </div>
      <div className="flex w-full items-center justify-center">
        <MdPhotoAlbum size={100} color="blue" />
        <h3 className="w-[60%]">
          Upload photos of document proving your identity
        </h3>
      </div>
      <div>
        <p className="text-sm">
          By clicking &quot;Agree and Continue&quot; I consent to WePlug Music
          collecting and processing my uploaded documents, including scans of my
          ID, for the sole purpose of verifying my identity.
        </p>
      </div>
      <form className="overflow-y-auto px-6"></form>
      <Button
        className="cursor-pointer text-center"
        onClick={() => setFilterStatus("upload-document")}
      >
        Agree and Continue
      </Button>
    </section>
  );
};

export default IdentityTerms;
