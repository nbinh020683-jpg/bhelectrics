"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react/ssr";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-ink">{item.question}</span>
              <CaretDown
                size={18}
                weight="bold"
                className={`shrink-0 text-ink-muted transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-sm leading-relaxed text-ink-muted">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
