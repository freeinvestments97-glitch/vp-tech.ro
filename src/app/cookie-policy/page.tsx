import LegalDocumentView from "@/components/legal-document";
import { cookiePolicy, cookiePolicyRo } from "@/data/legal";
import { getLocale } from "@/lib/locale";

export default async function CookiePolicyPage() {
  const locale = await getLocale();
  const document = locale === "ro" ? cookiePolicyRo : cookiePolicy;

  return (
    <div className="command-bg min-h-screen px-6 py-8 text-slate-100 md:px-10 md:py-10 xl:px-14">
      <main className="w-full">
        <LegalDocumentView document={document} locale={locale} />
      </main>
    </div>
  );
}

