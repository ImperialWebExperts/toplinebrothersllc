export type Step = { title: string; body?: React.ReactNode };

type Props = {
  steps: readonly Step[];
  /** "columns" (default): 3 or 4 across on desktop. "stack": one column, numeral beside the text. */
  layout?: "columns" | "stack";
};

/**
 * A real sequence (How it works, What happens next). The only place numbers appear as markers.
 * A 1px hairline rule sits above each step.
 */
export default function Steps({ steps, layout = "columns" }: Props) {
  if (layout === "stack") {
    return (
      <ol>
        {steps.map((s, i) => (
          <li key={s.title} className="flex items-start gap-5 border-t border-hairline py-5 first:border-t-0 first:pt-0">
            <span aria-hidden className="type-numeral w-14 shrink-0 md:w-20">
              {i + 1}
            </span>
            <div className="pt-1">
              <h3 className="type-title">{s.title}</h3>
              {s.body ? <p className="type-body mt-2 text-ink-muted">{s.body}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  // Match the columns to the step count so 3 steps don't leave an empty 4th column.
  const columns = steps.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <ol className={`grid gap-x-6 gap-y-8 ${columns}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="border-t border-hairline pt-6">
          <span aria-hidden className="type-numeral block">
            {i + 1}
          </span>
          <h3 className="type-title mt-4">{s.title}</h3>
          {s.body ? <p className="type-body mt-2 text-ink-muted">{s.body}</p> : null}
        </li>
      ))}
    </ol>
  );
}
