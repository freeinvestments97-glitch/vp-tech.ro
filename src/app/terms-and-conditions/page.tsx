import LegalDocumentView from "@/components/legal-document";
import { termsAndConditions, termsAndConditionsRo } from "@/data/legal";
import { getLocale } from "@/lib/locale";

export default async function TermsAndConditionsPage() {
  const locale = await getLocale();
  const document = locale === "ro" ? termsAndConditionsRo : termsAndConditions;

  return <LegalDocumentView document={document} locale={locale} />;
}

