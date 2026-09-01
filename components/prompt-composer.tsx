"use client";

import { useState } from "react";
import { ArrowUp, Paperclip, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { examplePrompts } from "@/lib/mock-data";

export function PromptComposer() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-border bg-card p-3 shadow-sm transition-shadow focus-within:shadow-md">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Describe the tool you need — who it's for, what it should do, and any data it touches..."
          rows={3}
          className="w-full resize-none bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="flex items-center justify-between px-1 pt-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            type="button"
          >
            <Paperclip data-icon="inline-start" />
            Attach reference
          </Button>
          <Button size="icon" disabled={value.trim().length === 0} type="button">
            <ArrowUp />
            <span className="sr-only">Generate tool</span>
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5" />
          Try:
        </span>
        {examplePrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => setValue(prompt)}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {prompt.length > 60 ? `${prompt.slice(0, 57)}...` : prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
