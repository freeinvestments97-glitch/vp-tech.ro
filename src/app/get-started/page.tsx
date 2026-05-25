import Link from "next/link";
import GetStartedFlow from "@/components/get-started-flow";
import { getLocale } from "@/lib/locale";

export default async function GetStartedPage() {
  const locale = await getLocale();
  const isRo = locale === "ro";

  return (
    <div className="command-bg min-h-screen px-6 py-8 text-slate-100 md:px-10 md:py-10 xl:px-14">
      <main className="w-full">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          &larr; {isRo ? "Înapoi la Home" : "Back to Home"}
        </Link>

        <GetStartedFlow locale={locale} />
      </main>
    </div>
  );
}
