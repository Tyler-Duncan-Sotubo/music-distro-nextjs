import Link from "next/link";

type FormDescriptionProps = {
  header: string;
  authQuestion: string;
  path: string;
  pathText: string;
};

const FormDescription = ({
  header,
  authQuestion,
  path,
  pathText,
}: FormDescriptionProps) => (
  <div className="mb-10 flex flex-col items-center justify-center gap-2">
    <h2>{header}</h2>
    <div className="flex items-center justify-center gap-2">
      <h4>{authQuestion}</h4>
      <Link
        href={path}
        className="text-blue-800 hover:text-blue-600 text-sm font-bold"
      >
        <h4>{pathText}</h4>
      </Link>
    </div>
  </div>
);

export default FormDescription;
