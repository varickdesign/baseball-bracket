"use client";

import { useState } from "react";

interface Props {
  heading?: string;
}

export default function Newsletter({
  heading = "Stay in the Game\nGet Bracket Updates!",
}: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) { setError("Enter a valid email address."); return; }
    if (!consent) { setError("Please check the consent box to continue."); return; }
    setSubmitted(true);
  }

  const [line1, line2] = heading.split("\n");

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Watermark */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="font-heading font-black uppercase text-sox-border whitespace-nowrap"
          style={{ fontSize: "clamp(60px, 14vw, 160px)", letterSpacing: "0.05em" }}>
          newsletter
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 flex flex-col items-center gap-6 text-center">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-crimson flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </div>

        {/* Headline */}
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-sox-body leading-snug">
          {line1}
          {line2 && <><br />{line2}</>}
        </h2>

        {submitted ? (
          <p className="font-heading font-bold text-sm uppercase tracking-widest text-crimson py-4">
            ✓ You&apos;re signed up!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4" noValidate>
            {/* Email + Subscribe in one bordered row */}
            <div className="flex w-full border border-sox-border">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                className="flex-1 min-w-0 px-4 py-3 font-body text-sm text-sox-body placeholder:text-gray-400 focus:outline-none bg-white"
              />
              <div className="w-px bg-sox-border flex-shrink-0" />
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-3 font-heading font-black text-xs uppercase tracking-widest text-sox-body hover:text-crimson transition-colors flex-shrink-0 bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
                Subscribe
              </button>
            </div>

            {error && (
              <p className="font-body text-xs text-crimson">{error}</p>
            )}

            {/* Consent */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="h-4 w-4 border border-sox-border accent-crimson flex-shrink-0"
              />
              <span className="font-body text-sm text-gray-500">
                I agree to the{" "}
                <a href="#rules" className="underline text-sox-body hover:text-crimson transition-colors">
                  Official Rules
                </a>
                .
              </span>
            </label>
          </form>
        )}
      </div>
    </section>
  );
}
