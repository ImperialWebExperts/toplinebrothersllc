type Props = { label: string; block?: boolean };

/**
 * Every fact the client has not confirmed renders through this component.
 * Never hardcode invented copy anywhere in the site. Removed or emptied at launch.
 */
export default function Placeholder({ label, block = false }: Props) {
  if (block) {
    return (
      <div className="type-body-sm grid min-h-28 place-items-center rounded-sm border border-dashed border-ink-muted bg-surface-1 p-4 text-center text-ink-muted">
        [PLACEHOLDER: {label}]
      </div>
    );
  }
  return (
    <span className="type-body-sm inline-block rounded-sm border border-dashed border-ink-muted bg-surface-1 px-2 py-0.5 text-ink-muted">
      [PLACEHOLDER: {label}]
    </span>
  );
}
