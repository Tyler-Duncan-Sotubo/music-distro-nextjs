type ArtistDetailsCardProps = {
  title: string;
  children?: React.ReactNode;
  width?: string;
};

const ArtistDetailPlaceholder = ({ width }: { width: string }) => {
  return <div className={`h-6 bg-secondary ${width} rounded-lg`} />;
};

export const ArtistDetailsCard = ({
  title,
  children,
  width = "w-1/2",
}: ArtistDetailsCardProps) => {
  return (
    <div className="mb-4 w-full">
      <p className="mb-1 text-[1.1rem] font-light">{title}</p>
      {children ? (
        <p className="mb-2 text-[1rem] font-medium">{children}</p>
      ) : (
        <ArtistDetailPlaceholder width={width} />
      )}
    </div>
  );
};

export const ArtistDetailsCardContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="my-2 w-full items-center justify-between gap-10 md:flex">
      {children}
    </div>
  );
};
