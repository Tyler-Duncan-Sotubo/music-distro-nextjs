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
        <p className="mb-5 text-sm">
          By clicking &quot;Agree and Continue&quot; I consent to WePlug Music
          collecting and processing my uploaded documents, including scans of my
          ID, for the sole purpose of verifying my identity. I understand that
          this data will be handled in accordance with WePlug Music&apos;s
          Privacy Policy. I am aware that I can exercise my privacy rights,
          including withdrawing my consent, by contacting{" "}
          <span className="font-bold">privacy@weplugmusic.com.</span>
        </p>
        <p className="text-sm">
          I have read and agree to WePlug Music&apos;s Privacy Policy and the
          terms outlined above.
        </p>
      </div>
      <form className="overflow-y-auto px-6"></form>
      <div
        className="mb-5 mt-5 cursor-pointer text-center"
        onClick={() => setFilterStatus("upload-document")}
      >
        Agree and Continue
      </div>
    </section>
  );
};

export default IdentityTerms;
