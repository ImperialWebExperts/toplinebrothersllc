"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { flushSync } from "react-dom";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { CATEGORY_SLUGS, CITY_SLUGS, REQUIRED_FIELDS, fieldError, type Fields } from "@/lib/quote";
import { CATEGORIES, CITIES, SITE } from "@/lib/site";

type Errors = Partial<Record<keyof Fields, string>>;

// IBM filled-field pattern: surface fill, no border except a 1px bottom rule, 48px tall.
// Focus: 2px ink outline, bottom rule hidden (transparent, so nothing shifts).
// Error: 2px error outline. It stays on while focused so the error is not lost, and the message
// below carries an icon and text, so the state is never color alone.
// scroll-mt keeps a focused field clear of the sticky header.
const fieldCls =
  "type-body block min-h-12 w-full scroll-mt-28 rounded-none border-0 border-b border-ink-subtle bg-surface-1 px-4 py-[11px] text-ink focus-visible:border-b-transparent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ink aria-invalid:outline-2 aria-invalid:outline-offset-0 aria-invalid:outline-error aria-invalid:focus-visible:outline-error";

const labelCls = "type-body-sm mb-2 block font-medium";

// Helper text sits under the field. Errors replace the need for it, but both stay in aria-describedby.
const HELP: Partial<Record<keyof Fields, string>> = {
  contact: "A phone number or an email address.",
  length: "For example, 3 days.",
};

// ?category= and ?city= are user input: only accept values the selects actually offer, otherwise
// state would hold a value the <select> cannot display.
const pick = (value: string | null, allowed: readonly string[], fallback: string) =>
  value !== null && allowed.includes(value) ? value : fallback;

export default function QuoteForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [values, setValues] = useState<Fields>({
    name: "",
    contact: "",
    category: pick(params.get("category"), CATEGORY_SLUGS, CATEGORIES[0].slug),
    need: "",
    start: "",
    length: "",
    city: pick(params.get("city"), CITY_SLUGS, ""),
    fulfilment: "delivery",
    website: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    // Once a field is flagged, re-check it as the user types so the error clears the moment it is fixed.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: fieldError(key, value) }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    if (values.website) return; // honeypot tripped: drop silently (/api/quote checks it again)
    const form = event.currentTarget;
    const e: Errors = {};
    for (const key of REQUIRED_FIELDS) {
      const message = fieldError(key, values[key]);
      if (message) e[key] = message;
    }
    // Render the errors before moving focus so aria-invalid and aria-describedby are already on the
    // field when it is announced.
    flushSync(() => setErrors(e));
    const first = REQUIRED_FIELDS.find((key) => e[key]);
    if (first) {
      form.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    // /api/quote validates again and emails the request to SITE.email.
    setStatus("sending");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Quote request failed: ${response.status}`);
      router.push("/contact/thanks");
    } catch {
      setStatus("error");
    }
  }

  const help = (key: keyof Fields) =>
    HELP[key] ? (
      <p id={`${key}-help`} className="type-caption mt-2 text-ink-muted">
        {HELP[key]}
      </p>
    ) : null;

  const err = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`${key}-error`} className="type-body-sm mt-2 flex items-start gap-2 font-medium text-error">
        <Icon name="alert" className="h-5 w-5" />
        {errors[key]}
      </p>
    ) : null;

  // Every field that has helper text or an error points at both, in reading order.
  const aria = (key: keyof Fields) => {
    const ids = [HELP[key] ? `${key}-help` : null, errors[key] ? `${key}-error` : null].filter(Boolean);
    return {
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": ids.length ? ids.join(" ") : undefined,
    };
  };

  return (
    // noValidate is deliberate: errors are ours so they stay consistent and are announced via aria-*.
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <p className="type-body-sm text-ink-muted">All fields are required.</p>

      <div className="hidden">
        <label htmlFor="website">Leave this blank</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className={labelCls}>Name</label>
        <input id="name" required autoComplete="name" className={fieldCls} value={values.name}
          onChange={(e) => set("name", e.target.value)} {...aria("name")} />
        {err("name")}
      </div>

      <div>
        <label htmlFor="contact" className={labelCls}>Phone or email</label>
        {/* Email or phone: stop mobile keyboards capitalizing the first letter and autocorrecting it. */}
        <input id="contact" required autoCapitalize="none" autoCorrect="off" spellCheck={false} className={fieldCls} value={values.contact}
          onChange={(e) => set("contact", e.target.value)} {...aria("contact")} />
        {help("contact")}
        {err("contact")}
      </div>

      <div>
        <label htmlFor="category" className={labelCls}>Equipment category</label>
        <div className="relative">
          <select id="category" className={`${fieldCls} appearance-none pr-12`} value={values.category}
            onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
          <Icon name="chevron-down" className="pointer-events-none absolute right-4 top-3 h-6 w-6" />
        </div>
      </div>

      <div>
        <label htmlFor="need" className={labelCls}>What do you need?</label>
        <textarea id="need" required rows={4} className={`${fieldCls} min-h-[120px]`} value={values.need}
          onChange={(e) => set("need", e.target.value)} {...aria("need")} />
        {err("need")}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="start" className={labelCls}>Rental start date</label>
          <input id="start" type="date" required className={fieldCls} value={values.start}
            onChange={(e) => set("start", e.target.value)} {...aria("start")} />
          {err("start")}
        </div>
        <div>
          <label htmlFor="length" className={labelCls}>Rental length</label>
          <input id="length" required className={fieldCls} value={values.length}
            onChange={(e) => set("length", e.target.value)} {...aria("length")} />
          {help("length")}
          {err("length")}
        </div>
      </div>

      <div>
        <label htmlFor="city" className={labelCls}>Job site city</label>
        <div className="relative">
          <select id="city" required className={`${fieldCls} appearance-none pr-12`} value={values.city}
            onChange={(e) => set("city", e.target.value)} {...aria("city")}>
            <option value="">Select a city</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
            <option value="other">Other / nearby</option>
          </select>
          <Icon name="chevron-down" className="pointer-events-none absolute right-4 top-3 h-6 w-6" />
        </div>
        {err("city")}
      </div>

      <fieldset>
        <legend className={labelCls}>Delivery or pickup</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["delivery", "pickup"] as const).map((opt) => (
            // Selected: 2px ink border. Padding drops 1px so the box does not shift. The radio stays a
            // native control, so it is keyboard and screen-reader correct; the border is the extra signal.
            <label
              key={opt}
              className="type-body flex min-h-12 cursor-pointer items-center gap-3 border border-hairline bg-canvas px-4 capitalize has-[:checked]:border-2 has-[:checked]:border-ink has-[:checked]:px-[15px] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink"
            >
              <input type="radio" name="fulfilment" value={opt}
                className="h-5 w-5 accent-ink"
                checked={values.fulfilment === opt}
                onChange={() => set("fulfilment", opt)} />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {status === "error" && (
        <p role="alert" className="type-body-sm flex items-start gap-3 border-2 border-error p-4 font-medium">
          <Icon name="alert" className="h-5 w-5 text-error" />
          <span>
            We couldn&apos;t send your request. Try again, or email us at{" "}
            <a href={`mailto:${SITE.email}`} className="link">
              {SITE.email}
            </a>
            .
          </span>
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto sm:self-start">
        {status === "sending" ? "Sending…" : "Request a quote"}
      </Button>
    </form>
  );
}
