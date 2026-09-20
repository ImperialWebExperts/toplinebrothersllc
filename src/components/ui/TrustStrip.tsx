import Icon, { type IconName } from "@/components/ui/Icon";

export type TrustPoint = {
  icon: IconName;
  /** A confirmed fact, or a <Placeholder> for a point the client has not confirmed yet. */
  label: React.ReactNode;
  detail?: React.ReactNode;
};

/**
 * 3-4 trust points. Only shows facts the client can prove: an unconfirmed point passes a
 * <Placeholder> as its label, never an invented claim.
 * Icon above a body-strong label and one body-sm line, columns split by 1px hairlines.
 * Place it inside a Container; it is a soft surface block, not a full-bleed band.
 */
export default function TrustStrip({ points }: { points: readonly TrustPoint[] }) {
  return (
    // Every cell draws a top and left hairline; the negative margin plus overflow-hidden clips the
    // outer edge, so only the lines *between* cells remain at every column count.
    <div className="overflow-hidden bg-surface-1">
      <ul className="-ml-px -mt-px grid sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p) => (
          <li key={p.icon} className="flex flex-col gap-3 border-l border-t border-hairline px-6 py-8">
            <Icon name={p.icon} />
            <p className="type-body-strong">{p.label}</p>
            {p.detail ? <p className="type-body-sm text-ink-muted">{p.detail}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
