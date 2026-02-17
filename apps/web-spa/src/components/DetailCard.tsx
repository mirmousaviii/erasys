export interface DetailCardProps {
  label: string;
  value: string;
}

export function DetailCard({ label, value }: DetailCardProps) {
  const display = value.replace(/_/g, ' ');
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold capitalize text-gray-900">
        {display.toLowerCase()}
      </p>
    </div>
  );
}
