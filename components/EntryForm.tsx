"use client";

import { useState } from "react";
import { entrySchema, US_STATES, type EntryFormData } from "@/lib/entry-schema";
import type { BracketState } from "@/lib/bracket-types";
import { isBracketComplete } from "@/lib/bracket-engine";

interface Props {
  bracket: BracketState;
  onSubmitSuccess: () => void;
}

// Local form state allows agreedToRules = false before validation
type FormState = Omit<EntryFormData, "agreedToRules"> & { agreedToRules: boolean };
type FieldErrors = Partial<Record<keyof EntryFormData, string>>;

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  tbWsGames: 0,
  tbCombinedRuns: 0,
  agreedToRules: false,
};

export default function EntryForm({ bracket, onSubmitSuccess }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const complete = isBracketComplete(bracket);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof EntryFormData]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = entrySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof EntryFormData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    // Simulate submission — wire to real API route before launch
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    onSubmitSuccess();
  }

  const inputCls = (err?: string) =>
    [
      "w-full px-3 py-2.5 text-sm font-body border bg-white text-sox-body",
      "focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson transition-colors",
      err ? "border-crimson bg-red-50" : "border-sox-border",
    ].join(" ");

  function Field({
    label,
    id,
    error,
    children,
  }: {
    label: string;
    id: string;
    error?: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="font-heading font-bold text-xs uppercase tracking-wide text-sox-body"
        >
          {label}
        </label>
        {children}
        {error && (
          <p className="font-body text-xs text-crimson">{error}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {!complete && (
        <div className="border-l-4 border-crimson bg-sox-gray px-4 py-3">
          <p className="font-body text-sm text-sox-body">
            Complete all 11 series picks before submitting.
          </p>
        </div>
      )}

      {/* Personal info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name" id="firstName" error={errors.firstName}>
          <input
            id="firstName"
            type="text"
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            className={inputCls(errors.firstName)}
            placeholder="Jane"
          />
        </Field>
        <Field label="Last Name" id="lastName" error={errors.lastName}>
          <input
            id="lastName"
            type="text"
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            className={inputCls(errors.lastName)}
            placeholder="Smith"
          />
        </Field>
      </div>

      <Field label="Email Address" id="email" error={errors.email}>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          className={inputCls(errors.email)}
          placeholder="jane@example.com"
        />
      </Field>

      <Field label="Phone Number (10 digits)" id="phone" error={errors.phone}>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
          className={inputCls(errors.phone)}
          placeholder="5555551234"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="City" id="city" error={errors.city}>
          <input
            id="city"
            type="text"
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            className={inputCls(errors.city)}
            placeholder="Rochester"
          />
        </Field>
        <Field label="State" id="state" error={errors.state}>
          <select
            id="state"
            value={form.state}
            onChange={(e) => set("state", e.target.value)}
            className={inputCls(errors.state)}
          >
            <option value="">Select…</option>
            {US_STATES.map(([code, name]) => (
              <option key={code} value={code}>
                {code} — {name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Tiebreaker */}
      <div className="border border-sox-border border-t-4 border-t-crimson">
        <div className="bg-sox-charcoal px-4 py-2.5">
          <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-white/60">
            Tiebreaker
          </p>
        </div>
        <div className="p-4 bg-sox-gray flex flex-col gap-4">
          <p className="font-body text-xs text-gray-500">
            Used only to break ties in bracket score. Closest without going over wins each tiebreaker step.
          </p>

          <Field
            label="Predicted World Series length (games)"
            id="tbWsGames"
            error={errors.tbWsGames}
          >
            <div className="flex gap-2">
              {[4, 5, 6, 7].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => set("tbWsGames", n)}
                  className={[
                    "flex-1 py-2 text-sm font-heading font-bold uppercase tracking-wide border transition-colors",
                    form.tbWsGames === n
                      ? "bg-crimson text-white border-crimson"
                      : "bg-white text-sox-body border-sox-border hover:border-crimson",
                  ].join(" ")}
                >
                  {n}
                </button>
              ))}
            </div>
          </Field>

          <Field
            label="Combined runs in the deciding game"
            id="tbCombinedRuns"
            error={errors.tbCombinedRuns}
          >
            <input
              id="tbCombinedRuns"
              type="number"
              min={0}
              max={99}
              value={form.tbCombinedRuns || ""}
              onChange={(e) =>
                set("tbCombinedRuns", parseInt(e.target.value, 10) || 0)
              }
              className={inputCls(errors.tbCombinedRuns)}
              placeholder="e.g. 9"
            />
          </Field>
        </div>
      </div>

      {/* Rules checkbox */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.agreedToRules}
          onChange={(e) => set("agreedToRules", e.target.checked)}
          className="mt-0.5 h-4 w-4 border-sox-border text-crimson focus:ring-crimson"
        />
        <span className="font-body text-sm text-sox-body">
          I have read and agree to the{" "}
          <a href="#rules" className="underline text-crimson hover:text-crimson-dark">
            Official Rules
          </a>
          .
        </span>
      </label>
      {errors.agreedToRules && (
        <p className="font-body text-xs text-crimson -mt-3">{errors.agreedToRules}</p>
      )}

      <button
        type="submit"
        disabled={!complete || submitting}
        className={[
          "w-full py-3.5 px-6 font-heading font-black text-sm uppercase tracking-widest transition-all",
          complete && !submitting
            ? "bg-crimson hover:bg-crimson-dark text-white shadow-md hover:shadow-lg cursor-pointer"
            : "bg-sox-border text-gray-400 cursor-not-allowed",
        ].join(" ")}
      >
        {submitting ? "Submitting…" : "Submit My Bracket →"}
      </button>
    </form>
  );
}
