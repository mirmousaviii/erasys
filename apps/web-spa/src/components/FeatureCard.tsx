export interface FeatureCardProps {
  step: string;
  title: string;
  description: string;
}

export function FeatureCard({
  step,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
          <span className="text-lg font-bold">{step}</span>
        </div>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </article>
  );
}
