"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { sendContactRequest, type ContactState } from "@/app/contact/actions";
import Icon from "@/components/icon";
import type { Locale } from "@/lib/locale";

type ContactFormProps = {
  locale: Locale;
  /** Service areas for the category select (titles in the current language). */
  areas: string[];
  /** From /contact?service=…: the service title and its area. */
  requested?: { title: string; area: string };
  /** Google Calendar booking page; the Meet button is hidden when empty. */
  bookingUrl?: string;
};

const initialState: ContactState = { status: "idle" };

export default function ContactForm({ locale, areas, requested, bookingUrl }: ContactFormProps) {
  const isRo = locale === "ro";
  const [state, formAction, pending] = useActionState(sendContactRequest, initialState);
  const startedAtRef = useRef<HTMLInputElement>(null);

  // set on the client only, so the server and client HTML match
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  if (state.status === "sent") {
    return (
      <div className="card flex flex-col items-center gap-3 py-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-ok-soft text-ok">
          <Icon name="checkCircle" className="h-8 w-8" />
        </span>
        <h2 className="text-[22px] font-extrabold text-ink">
          {isRo ? "Mulțumim, am primit solicitarea" : "Thanks, we’ve got your request"}
        </h2>
        <p className="max-w-md text-ink-2">
          {isRo
            ? "Îți răspundem în cel mult 1 zi lucrătoare. Dacă preferi, poți programa direct o discuție pe Google Meet."
            : "We’ll reply within 1 business day. If you prefer, you can book a Google Meet call right away."}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2.5">
          {bookingUrl ? (
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn primary">
              <Icon name="calendar" className="h-4 w-4" />
              {isRo ? "Programează pe Google Meet" : "Book a Google Meet"}
            </a>
          ) : null}
          <Link href="/services" className="btn">
            {isRo ? "Înapoi la servicii" : "Back to services"}
          </Link>
        </div>
      </div>
    );
  }

  const options = {
    timeline: isRo
      ? ["Imediat", "În 2-4 săptămâni", "În 1-3 luni", "Stadiu de planificare"]
      : ["Immediately", "Within 2-4 weeks", "Within 1-3 months", "Planning stage"],
    contact: isRo
      ? ["Email", "Apel telefonic", "Google Meet"]
      : ["Email", "Phone call", "Google Meet"],
  };

  return (
    <form action={formAction} className="card grid gap-x-4 gap-y-3.5 md:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="service" value={requested?.title ?? ""} />
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />
      {/* honeypot: hidden from people, filled in by bots */}
      <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="field">
        <span>{isRo ? "Nume complet" : "Full Name"} *</span>
        <input name="name" type="text" required maxLength={120} autoComplete="name" className="input" placeholder={isRo ? "Numele complet" : "Your full name"} />
      </label>
      <label className="field">
        <span>{isRo ? "Email companie" : "Business Email"} *</span>
        <input name="email" type="email" required maxLength={160} autoComplete="email" className="input" placeholder={isRo ? "nume@companie.com" : "name@company.com"} />
      </label>
      <label className="field">
        <span>{isRo ? "Număr de telefon" : "Phone Number"}</span>
        <input name="phone" type="tel" maxLength={40} autoComplete="tel" className="input" placeholder="+40..." />
      </label>
      <label className="field">
        <span>{isRo ? "Companie" : "Company"}</span>
        <input name="company" type="text" maxLength={160} autoComplete="organization" className="input" placeholder={isRo ? "Numele companiei" : "Company name"} />
      </label>
      <label className="field">
        <span>{isRo ? "Aria serviciului" : "Service Area"}</span>
        <select name="category" className="input" defaultValue={requested?.area ?? ""}>
          <option value="">{isRo ? "Nu sunt sigur / altceva" : "Not sure / something else"}</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>{isRo ? "Termen proiect" : "Project Timeline"}</span>
        <select name="timeline" className="input">
          {options.timeline.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="field md:col-span-2">
        <span>{isRo ? "Metodă preferată de contact" : "Preferred Contact Method"}</span>
        <select name="contactMethod" className="input">
          {options.contact.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="field md:col-span-2">
        <span>{isRo ? "Cu ce te putem ajuta?" : "What do you need help with?"} *</span>
        <textarea
          name="details"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          className="input"
          placeholder={
            isRo
              ? "Descrie situația, ce ai acum și când ai nevoie de rezultat."
              : "Describe the situation, your current setup and when you need it done."
          }
        />
      </label>

      {state.status === "error" ? (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-bad-soft px-3.5 py-2.5 text-sm font-medium text-bad md:col-span-2">
          <Icon name="alert" className="mt-0.5 h-4 w-4" />
          {state.message}
        </p>
      ) : null}

      <div className="mt-1 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:col-span-2">
        <p className="text-[13px] text-ink-3">
          {isRo
            ? "Prin trimitere, ești de acord cu politicile legale din footer."
            : "By submitting, you agree to our legal policies in the footer."}
        </p>
        <button type="submit" disabled={pending} className="btn primary lg">
          <Icon name="mail" className="h-[18px] w-[18px]" />
          {pending ? (isRo ? "Se trimite…" : "Sending…") : isRo ? "Trimite solicitarea" : "Send Request"}
        </button>
      </div>
    </form>
  );
}
