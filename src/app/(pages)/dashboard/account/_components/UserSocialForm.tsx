import { type FieldValues, type UseFormRegister } from "react-hook-form";
import { type ArtistDetailsInput } from "../../types/artist.type";
import { type UserSocialErrorObject } from "./errorObject.type";
import TextInput from "@/components/ui/TextInput";
import { SocialIconLabel } from "./SocialIconLabel";

type UserInfoFormProps = {
  errors: UserSocialErrorObject;
  register: UseFormRegister<ArtistDetailsInput>;
};

const UserSocialForm = ({ errors, register }: UserInfoFormProps) => {
  return (
    <article className="grid grid-cols-1 md:w-[80%]">
      {/* Apple */}
      <div className="relative w-full">
        <SocialIconLabel platform="apple" description="Apple Artist Link" />
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="apple"
          error={errors.apple?.message}
          id="apple"
          type="text"
          placeholder="URL"
        />
      </div>

      {/* Spotify */}
      <div className="relative w-full">
        <SocialIconLabel platform="spotify" description="Spotify Artist Link" />
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="spotify"
          error={errors.spotify?.message}
          id="spotify"
          type="text"
          placeholder="URL"
        />
      </div>

      {/* Instagram */}
      <div className="relative w-full">
        <SocialIconLabel
          platform="instagram"
          description="Instagram Profile Link"
        />
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="youtube"
          error={errors.instagram?.message}
          id="instagram"
          type="text"
          placeholder="URL"
        />
      </div>

      {/* Youtube */}
      <div className="relative w-full">
        <SocialIconLabel
          platform="youtube"
          description="YouTube Channel Link"
        />
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="youtube"
          error={errors.youtube?.message}
          id="youtube"
          type="text"
          placeholder="URL"
        />
      </div>

      {/* Facebook */}
      <div className="relative w-full">
        <SocialIconLabel
          platform="facebook"
          description="Facebook Profile Link"
        />
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="facebook"
          error={errors.facebook?.message}
          id="facebook"
          type="text"
          placeholder="URL"
        />
      </div>

      {/* Tiktok */}
      <div className="relative w-full">
        <SocialIconLabel platform="tiktok" description="TikTok Profile Link" />
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="tiktok"
          error={errors.tiktok?.message}
          id="tiktok"
          type="text"
          placeholder="URL"
        />
      </div>

      {/* Twitter */}
      <div className="relative w-full">
        <SocialIconLabel platform="twitter" description="X Profile Link" />
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="twitter"
          error={errors.twitter?.message}
          id="twitter"
          type="text"
          placeholder="URL"
        />
      </div>

      {/* Soundcloud */}
      <div className="relative w-full">
        <SocialIconLabel
          platform="soundcloud"
          description="Soundcloud Profile Link"
        />
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="soundcloud"
          error={errors.soundcloud?.message}
          id="soundcloud"
          type="text"
          placeholder="URL"
        />
      </div>

      {/* Website */}
      <div className="relative w-full">
        <SocialIconLabel platform="website" description="Website link" />
        <TextInput
          register={register as unknown as UseFormRegister<FieldValues>}
          name="website"
          error={errors.website?.message}
          id="website"
          type="text"
          placeholder="URL"
        />
      </div>
    </article>
  );
};

export default UserSocialForm;
