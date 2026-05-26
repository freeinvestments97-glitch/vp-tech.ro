"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale";

const BOOT_EN = [
  { text: "VP-TECH SECURE CLIENT PORTAL  v2.4.1", type: "title" },
  { text: "Initializing encrypted session...", type: "info" },
  { text: "TLS 1.3 handshake complete", type: "ok" },
  { text: "Loading authentication module...", type: "info" },
  { text: "Verifying certificate chain...", type: "ok" },
  { text: "Session ready. Credentials required.", type: "ready" },
];

const BOOT_RO = [
  { text: "VP-TECH PORTAL SECURIZAT CLIENT  v2.4.1", type: "title" },
  { text: "Initializare sesiune criptata...", type: "info" },
  { text: "Handshake TLS 1.3 finalizat", type: "ok" },
  { text: "Incarcare modul autentificare...", type: "info" },
  { text: "Verificare lant de certificate...", type: "ok" },
  { text: "Sesiune activa. Credentiale necesare.", type: "ready" },
];

const AUTH_FLOW_EN = [
  { text: "Connecting to identity provider...", type: "info", delay: 0 },
  { text: "Validating credentials...", type: "info", delay: 700 },
  { text: "Checking permission matrix...", type: "info", delay: 1400 },
  { text: "Account provisioning status: PENDING", type: "warn", delay: 2100 },
  { text: "ACCESS RESTRICTED — Contact your account manager.", type: "error", delay: 2800 },
];

const AUTH_FLOW_RO = [
  { text: "Conectare la furnizorul de identitate...", type: "info", delay: 0 },
  { text: "Validare credentiale...", type: "info", delay: 700 },
  { text: "Verificare matrice permisiuni...", type: "info", delay: 1400 },
  { text: "Status cont: IN ASTEPTARE", type: "warn", delay: 2100 },
  { text: "ACCES RESTRICTIONAT — Contacteaza managerul de cont.", type: "error", delay: 2800 },
];

type LogLine = { text: string; type: string; id: number };

let idCounter = 0;
const newLine = (text: string, type: string): LogLine => ({ text, type, id: idCounter++ });

export default function ClientLoginTerminal({ locale }: { locale: Locale }) {
  const isRo = locale === "ro";
  const boot = isRo ? BOOT_RO : BOOT_EN;
  const authFlow = isRo ? AUTH_FLOW_RO : AUTH_FLOW_EN;

  const [log, setLog] = useState<LogLine[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authing, setAuthing] = useState(false);
  const [authDone, setAuthDone] = useState(false);
  const [blink, setBlink] = useState(true);
  const [userFocus, setUserFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Boot sequence — pre-schedule every line as an independent timeout so
  // the full set can be cancelled on cleanup (fixes StrictMode double-invoke).
  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 400;
    boot.forEach((item, index) => {
      const id = setTimeout(() => {
        setLog((prev) => [...prev, newLine(item.text, item.type)]);
        if (index === boot.length - 1) setBootDone(true);
      }, elapsed);
      ids.push(id);
      elapsed += index === 0 ? 120 : 340 + Math.floor(Math.random() * 100);
    });
    return () => ids.forEach(clearTimeout);
  // boot is derived from module-level constants; safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 520);
    return () => clearInterval(t);
  }, []);

  // Scroll within the terminal box only — never moves the page
  useEffect(() => {
    const el = terminalBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  const handleAuth = () => {
    if (!username.trim() || !password.trim()) {
      setLog((prev) => [
        ...prev,
        newLine(isRo ? "EROARE: Campuri obligatorii lipsa." : "ERROR: Missing required fields.", "error"),
      ]);
      return;
    }
    setAuthing(true);
    setAuthDone(false);
    setLog((prev) => [...prev, newLine(`> AUTH_USER=${username}  AUTH_PASS=${"*".repeat(password.length)}`, "cmd")]);

    authFlow.forEach(({ text, type, delay }) => {
      setTimeout(() => {
        setLog((prev) => [...prev, newLine(text, type)]);
        if (delay >= 2800) {
          setAuthing(false);
          setAuthDone(true);
        }
      }, delay + 200);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAuth();
  };

  const lineColor = (type: string) => {
    switch (type) {
      case "title":  return "text-cyan-300 font-bold tracking-widest";
      case "ok":     return "text-emerald-400";
      case "info":   return "text-slate-400";
      case "ready":  return "text-cyan-200";
      case "cmd":    return "text-slate-300";
      case "warn":   return "text-amber-400";
      case "error":  return "text-red-400 font-semibold";
      default:       return "text-slate-400";
    }
  };

  const prefix = (type: string) => {
    switch (type) {
      case "title":  return "  ";
      case "ok":     return "✓ ";
      case "info":   return "· ";
      case "ready":  return "→ ";
      case "cmd":    return "";
      case "warn":   return "⚠ ";
      case "error":  return "✕ ";
      default:       return "  ";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-cyan-400/40 bg-[#090e1a] shadow-2xl shadow-cyan-900/30 ring-1 ring-cyan-500/10"
      style={{ fontFamily: "var(--font-geist-mono)" }}>

      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-slate-700/80 bg-slate-900 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <p className="ml-3 min-w-0 flex-1 truncate text-center text-[11px] font-semibold tracking-[0.18em] text-slate-300">
          {isRo ? "PORTAL CLIENT — VP TECHNOLOGIES" : "CLIENT PORTAL — VP TECHNOLOGIES"}
        </p>
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
      </div>

      {/* Terminal output */}
      <div ref={terminalBodyRef} className="h-64 overflow-y-auto px-5 pt-4 pb-2 space-y-[3px] scrollbar-thin">
        {log.map((line) => (
          <p key={line.id} className={`text-xs leading-relaxed ${lineColor(line.type)}`}>
            {prefix(line.type)}{line.text}
          </p>
        ))}

        {/* Divider after boot */}
        {bootDone && !authing && log.length > 0 && log[log.length - 1].type !== "cmd" && log[log.length - 1].type !== "error" && !authDone && (
          <p className="text-[10px] text-slate-700 pt-1 pb-0.5 tracking-widest select-none">
            ────────────────────────────────
          </p>
        )}

        {/* Idle cursor */}
        {bootDone && !authing && (
          <p className="text-xs text-cyan-400">
            &gt; {blink ? "█" : " "}
          </p>
        )}

        {/* Authenticating spinner */}
        {authing && (
          <p className="text-xs text-cyan-400 animate-pulse">
            &gt; processing{blink ? " █" : "  "}
          </p>
        )}

      </div>

      {/* Input area */}
      {bootDone && !authDone && (
        <div className="border-t border-slate-700/80 bg-slate-900/80 px-5 py-5 space-y-4">
          {/* Username row */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-[0.22em] text-cyan-500 uppercase">
              {isRo ? "Utilizator" : "Username"}
            </span>
            <div className={`flex items-center gap-2 rounded-md border px-3 py-2.5 transition-colors ${userFocus ? "border-cyan-400 bg-slate-800" : "border-slate-700 bg-slate-950"}`}>
              <span className="text-cyan-600 text-sm select-none">$</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                onKeyDown={handleKeyDown}
                placeholder={isRo ? "identificator_client" : "client_identifier"}
                disabled={authing}
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600 disabled:opacity-40"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Password row */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold tracking-[0.22em] text-cyan-500 uppercase">
              {isRo ? "Parola" : "Password"}
            </span>
            <div className={`flex items-center gap-2 rounded-md border px-3 py-2.5 transition-colors ${passFocus ? "border-cyan-400 bg-slate-800" : "border-slate-700 bg-slate-950"}`}>
              <span className="text-cyan-600 text-sm select-none">$</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••••••"
                disabled={authing}
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600 disabled:opacity-40"
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <p className="text-[10px] text-slate-600 tracking-wide">
              {isRo ? "Enter sau executa comanda" : "Enter or run command"}
            </p>
            <button
              type="button"
              onClick={handleAuth}
              disabled={authing}
              className="rounded-md bg-cyan-500 px-5 py-2 text-xs font-black tracking-[0.18em] text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {authing ? "PROCESSING..." : "> AUTHENTICATE"}
            </button>
          </div>
        </div>
      )}

      {/* Post-auth state */}
      {authDone && (
        <div className="border-t border-slate-800/80 bg-slate-950/60 px-5 py-4">
          <p className="text-[10px] tracking-widest text-slate-500">
            {isRo
              ? "Solicita acces — contacteaza managerul tau de cont VP TECHNOLOGIES."
              : "Request access — contact your VP TECHNOLOGIES account manager."}
          </p>
          <button
            type="button"
            onClick={() => {
              setLog([]);
              setBootDone(false);
              setUsername("");
              setPassword("");
              setAuthing(false);
              setAuthDone(false);
              idCounter = 0;
              let elapsed = 200;
              boot.forEach((item, index) => {
                setTimeout(() => {
                  setLog((prev) => [...prev, newLine(item.text, item.type)]);
                  if (index === boot.length - 1) setBootDone(true);
                }, elapsed);
                elapsed += index === 0 ? 120 : 340 + Math.floor(Math.random() * 100);
              });
            }}
            className="mt-3 text-[11px] tracking-widest text-slate-500 transition hover:text-cyan-400"
          >
            &gt; reset_session
          </button>
        </div>
      )}
    </div>
  );
}
