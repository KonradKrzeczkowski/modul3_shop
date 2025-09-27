type SummaryRowProps = {
  label: string;
  value: string | number;
};

export default function SpanSummary
({ label, value }: SummaryRowProps) {
  return (
    <div className="space-y-1 text-sm">
      <div className="flex justify-between">
        <span className="text-neutral-600">{label}</span>
        <span className="text-neutral-900">{value}</span>
      </div>
    </div>
  );
}