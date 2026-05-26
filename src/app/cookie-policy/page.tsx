import Link from "next/link";
import LegalDocumentView from "@/components/legal-document";
import { cookiePolicy, cookiePolicyRo } from "@/data/legal";
import { getLocale } from "@/lib/locale";

export default async function CookiePolicyPage() {
  const locale = await getLocale();
  const isRo = locale === "ro";
  const document = locale === "ro" ? cookiePolicyRo : cookiePolicy;

  return (
    <div className="command-bg min-h-screen px-6 py-8 text-slate-100 md:px-10 md:py-10 xl:px-14">
      <main className="w-full">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          &larr; {isRo ? "Înapoi la Home" : "Back to Home"}
        </Link>
        <LegalDocumentView document={document} locale={locale} />
      </main>
    </div>
  );
}

