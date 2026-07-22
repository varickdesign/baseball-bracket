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
    // Simulate submission (wire to real API route later)
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    onSubmitSuccess();
  }

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
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {children}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  const inputCls = (err?: string) =>
    `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      err ? "border-red-400 bg-red-50" : "border-gray-300"
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {!complete && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Complete all 11 series picks before submitting.
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
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 flex flex-col gap-4">
        <h3 className="font-semibold text-blue-900 text-sm uppercase tracking-wide">
          Tiebreaker
        </h3>
        <p className="text-xs text-blue-700">
          In case of a tie in bracket score, these predictions determine the winner.
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
                  "flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors",
                  form.tbWsGames === n
                    ? "bg-blue-800 text-white border-blue-800"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400",
                ].join(" ")}
              >
                {n}
              </button>
            ))}
          </div>
          {errors.tbWsGames && (
            <p className="text-xs text-red-600">{errors.tbWsGames}</p>
          )}
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

      {/* Rules checkbox */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.agreedToRules}
          onChange={(e) => set("agreedToRules", e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600">
          I have read and agree to the{" "}
          <a href="#rules" className="underline text-blue-700 hover:text-blue-900">
            Official Rules
          </a>
          .
        </span>
      </label>
      {errors.agreedToRules && (
        <p className="text-xs text-red-600 -mt-3">{errors.agreedToRules}</p>
      )}

      <button
        type="submit"
        disabled={!complete || submitting}
        className={[
          "w-full py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wide transition-all",
          complete && !submitting
            ? "bg-blue-800 hover:bg-blue-900 text-white shadow-md hover:shadow-lg"
            : "bg-gray-200 text-gray-400 cursor-not-allowed",
        ].join(" ")}
      >
        {submitting ? "Submitting…" : "Submit My Bracket"}
      </button>
    </form>
  );
}
