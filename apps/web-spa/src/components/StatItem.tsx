export interface StatItemProps {
  value: string;
  label: string;
  className?: string;
}

export function StatItem({ value, label, className = '' }: StatItemProps) {
  return (
    <div className={`px-4 py-6 text-center sm:px-6 ${className}`}>
      <p className="text-2xl font-bold text-emerald-600 sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
        {label}
      </p>
    </div>
  );
}
