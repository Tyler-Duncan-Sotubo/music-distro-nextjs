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
  <div className="mb-4 flex flex-col items-center justify-center gap-2">
    <h4 className="text-3xl font-semibold">{header}</h4>
    <div className="flex items-center justify-center gap-2">
      <h5>{authQuestion}</h5>
      <Link
        href={path}
        className="text-blue-800 hover:text-blue-600 text-sm font-bold"
      >
        <h5>{pathText}</h5>
      </Link>
    </div>
  </div>
);

export default FormDescription;
