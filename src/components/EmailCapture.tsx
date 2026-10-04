"use client";

/**
 * Reusable email signup.
 *
 * v1 behaviour: this does NOT send anywhere. On submit it validates the
 * address and shows a success message, nothing more. When you're ready to
 * connect a provider (Mailchimp, Buttondown, ConvertKit, etc.), replace the
 * body of `handleSubmit` with a call to their API or form endpoint. The
 * surrounding markup can stay the same.
 */
import { useState } from "react";

interface EmailCaptureProps {
  heading?: string;
  description?: string;
  buttonLabel?: string;
}

export default function EmailCapture({
  heading = "Get new profiles in your inbox",
  description = "Occasional updates when we add people, gear breakdowns and articles. No spam.",
  buttonLabel = "Sign up",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    // Minimal sanity check — a real provider will validate properly.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    // PLACEHOLDER: no request is sent. Wire a provider in here later.
    setError(null);
    setSubmitted(true);
  }

  return (
    <section className="rounded-xl bg-ink p-6 text-paper sm:p-8">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <p className="mt-1 text-sm text-paper/70">{description}</p>

      {submitted ? (
        <p className="mt-4 rounded-md bg-gold/20 px-4 py-3 text-sm text-gold-soft">
          Thanks — you&apos;re on the list. (Demo only: no email was actually
          stored or sent.)
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          noValidate
        >
          <label htmlFor="email-capture" className="sr-only">
            Email address
          </label>
          <input
            id="email-capture"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-paper/20 bg-ink-soft px-4 py-2.5 text-paper placeholder:text-paper/40 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-gold px-5 py-2.5 font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            {buttonLabel}
          </button>
        </form>
      )}

      {error && <p className="mt-2 text-sm text-gold-soft">{error}</p>}
    </section>
  );
}
