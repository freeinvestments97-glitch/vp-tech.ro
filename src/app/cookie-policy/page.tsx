import LegalDocumentView from "@/components/legal-document";
import { cookiePolicy, cookiePolicyRo } from "@/data/legal";
import { getLocale } from "@/lib/locale";

export default async function CookiePolicyPage() {
  const locale = await getLocale();
  const document = locale === "ro" ? cookiePolicyRo : cookiePolicy;

  return <LegalDocumentView document={document} locale={locale} />;
}

