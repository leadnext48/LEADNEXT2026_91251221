"use client";

/*  Simple client-side password gate for the legacy homepage at /home.
    NOTE: this is view-obfuscation only (the content still ships to the client),
    which is exactly what's wanted here — keep the old page reachable on request
    but out of casual/public view. Password: lead@123. */

import { useEffect, useState } from "react";
import { cinzel, playfair } from "@/app/fonts";
import { Lock, ArrowRight } from "lucide-react";

const PASSWORD = "lead@123";
const KEY = "lead-legacy-unlocked";

export default function LegacyGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Restore unlock from this session (client-only; runs once after mount).
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (sessionStorage.getItem(KEY) === "1") setUnlocked(true);
    } catch {}
  }, []);

  if (unlocked) return <>{children}</>;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      try { sessionStorage.setItem(KEY, "1"); } catch {}
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="lg-gate">
      <style>{GATE_CSS}</style>
      <form className="lg-card" onSubmit={submit}>
        <div className="lg-icon"><Lock size={20} /></div>
        <p className={`lg-eyebrow ${cinzel.className}`}>LEAD College · Restricted</p>
        <h1 className={`lg-title ${cinzel.className}`}>Legacy Homepage</h1>
        <p className={`lg-sub ${playfair.className}`}>
          This is the earlier version of the LEAD College homepage, kept for reference.
          Enter the access password to continue.
        </p>
        <div className="lg-field">
          <input
            type="password"
            value={value}
            autoFocus
            placeholder="Enter password"
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            className={`lg-input ${playfair.className}`}
            aria-label="Access password"
          />
          <button type="submit" className="lg-btn" aria-label="Unlock"><ArrowRight size={16} /></button>
        </div>
        {error && <p className={`lg-error ${playfair.className}`}>Incorrect password. Please try again.</p>}
      </form>
    </div>
  );
}

const GATE_CSS = `
.lg-gate{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:1.5rem;
  background:radial-gradient(120% 100% at 50% 0%,#0d2f7a 0%,#0a2463 45%,#050f2c 100%);}
.lg-card{width:100%;max-width:440px;background:#fff;border-radius:14px;padding:clamp(2rem,4vw,2.8rem);text-align:center;
  box-shadow:0 40px 90px -30px rgba(0,0,0,.6);}
.lg-icon{width:48px;height:48px;border-radius:50%;margin:0 auto 1.2rem;display:flex;align-items:center;justify-content:center;
  background:rgba(0,92,159,.08);border:1px solid rgba(0,92,159,.18);color:#005C9F;}
.lg-eyebrow{font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:#005C9F;font-weight:600;margin:0 0 .6rem;}
.lg-title{font-size:clamp(1.5rem,4vw,2rem);font-weight:700;color:#0a2463;margin:0 0 .7rem;letter-spacing:-.01em;}
.lg-sub{font-size:.9rem;line-height:1.65;color:#5a6472;margin:0 0 1.6rem;}
.lg-field{display:flex;gap:.5rem;}
.lg-input{flex:1;padding:.85rem 1rem;border:1.5px solid #e3e8f0;border-radius:8px;font-size:.95rem;color:#0e1524;outline:none;transition:border-color .2s;}
.lg-input:focus{border-color:#005C9F;}
.lg-btn{flex-shrink:0;width:48px;border:none;border-radius:8px;background:linear-gradient(135deg,#0a2463,#005C9F);color:#fff;
  display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s,box-shadow .2s;}
.lg-btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(10,36,99,.35);}
.lg-error{color:#c0392b;font-size:.8rem;margin:.9rem 0 0;}
`;
