"use client";

import { useState } from "react";

interface Props {
  heading?: string;
  subheading?: string;
}

export default function Newsletter({
  heading = "Stay in the Game",
  subheading = "Get postseason updates, bracket reminders, and Bargain Grocery deals delivered to your inbox.",
}: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please check the consent box to continue.");
      return;
    }

    // Stub — wire to a real email provider (Mailchimp, Klaviyo, etc.)
    setSubmitted(true);
  }

  return (
    <section className="bg-sox-charcoal py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="max-w-xl mx-auto text-center flex flex-col gap-4">
          <p className="font-heading font-bold text-[10px] uppercase tracking-[0.25em] text-crimson">
            Newsletter
          </p>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white tracking-tight">
            {heading}
          </h2>
          <p className="font-body text-sm text-white/60 leading-relaxed">
            {subheading}
          </p>

          {submitted ? (
            <p className="font-heading font-bold text-sm uppercase tracking-wide text-crimson">
              ✓ You&apos;re signed up!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2" noValidate>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/30 font-body text-sm px-4 py-2.5 focus:outline-none focus:border-crimson transition-colors"
                />
                <button
                  type="submit"
                  className="bg-crimson hover:bg-crimson-dark text-white font-heading font-black text-xs uppercase tracking-widest px-5 py-2.5 transition-colors flex-shrink-0"
                >
                  Subscribe
                </button>
              </div>

              <label className="flex items-start gap-2.5 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 accent-crimson flex-shrink-0"
                />
                <span className="font-body text-xs text-white/40 leading-relaxed">
                  I agree to receive email communications from Bargain Grocery. Unsubscribe at any time.
                </span>
              </label>

              {error && (
                <p className="font-body text-xs text-crimson text-left">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
