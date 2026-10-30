import LegalDocumentView from "@/components/legal-document";
import { privacyPolicy, privacyPolicyRo } from "@/data/legal";
import { getLocale } from "@/lib/locale";

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const document = locale === "ro" ? privacyPolicyRo : privacyPolicy;

  return <LegalDocumentView document={document} locale={locale} />;
}

