interface OverviewRowProps {
  label: string;
  value?: number | string;
  formattedValue: string;
  streams?: number;
  downloads?: number | string;
}

export const OverviewRow = ({
  label,
  value,
  formattedValue,
  streams,
  downloads,
}: OverviewRowProps) => {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-5">
        <p className="text-left font-bold lg:text-xl">{label}</p>
      </td>
      {streams && (
        <td className="px-4 py-4">
          <p className="lg:text-xl">{streams}</p>
        </td>
      )}
      {downloads && (
        <td className="hidden whitespace-nowrap px-4 py-4 md:block">
          <p className="lg:text-xl">{downloads}</p>
        </td>
      )}
      {value && (
        <td className="whitespace-nowrap px-4 py-4">
          <p className="lg:text-xl">{value}</p>
        </td>
      )}
      <td className="whitespace-nowrap px-4 py-4">
        <p className="lg:text-xl">{formattedValue}</p>
      </td>
    </tr>
  );
};
