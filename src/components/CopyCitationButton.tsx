"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "./Icons";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older in-app browsers (e.g. some WhatsApp/Messenger webviews) lack the async clipboard API.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  }
}

export function CopyCitationButton({ citation, className }: { citation: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = async () => {
    const ok = await copyText(citation);
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2500);
  };

  return (
    <>
      <button type="button" className={className ?? "btn btn-ghost btn-sm"} onClick={onClick} title={citation}>
        {state === "copied" ? <Check /> : <Copy />}
        {state === "copied" ? "Copied" : "Copy citation"}
        <span className="visually-hidden"> (APA)</span>
      </button>
      <span role="status" className="visually-hidden">
        {state === "copied" ? "APA citation copied to clipboard" : state === "failed" ? "Could not copy. Select the citation text instead." : ""}
      </span>
    </>
  );
}
