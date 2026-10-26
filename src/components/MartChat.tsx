import { useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { parseWaCommand } from "@/lib/wa-command";

type Msg = { from: "bot" | "me"; text: string };

export function MartChat({ onChangeWa }: { onChangeWa: (n: string) => void }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "مرحبا! أنا Mart AI. كتب: بدل النمرة ل +212..." },
  ]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    const n = parseWaCommand(t);
    if (n) onChangeWa(n);
    setMsgs((m) => [
      ...m,
      { from: "me", text: t },
      { from: "bot", text: n ? `تم! النمرة الجديدة ديال WA: +${n}` : "مافهمتش. جرب: بدل النمرة ل +212612345678" },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-96 w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl">
          <div className="flex items-center justify-between bg-brand px-4 py-3 text-primary-foreground">
            <span className="flex items-center gap-2 font-bold"><Bot className="h-5 w-5" />Mart AI</span>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-4 w-4" /></button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3" dir="auto">
            {msgs.map((m, i) => (
              <p key={i} dir="auto" className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.from === "me" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>{m.text}</p>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 border-t p-2">
            <input dir="auto" value={input} onChange={(e) => setInput(e.target.value)} placeholder="بدل النمرة ل +212..." className="min-w-0 flex-1 rounded-lg bg-muted px-3 py-2 text-sm outline-none" />
            <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground" aria-label="Send"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 rounded-full bg-brand px-4 py-3 font-bold text-primary-foreground shadow-2xl">
        <Bot className="h-5 w-5" /> Mart AI
      </button>
    </div>
  );
}
