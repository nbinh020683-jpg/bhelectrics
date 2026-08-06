"use client";

import { useId, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/ssr";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-ink">{item.question}</span>
                <CaretDown
                  size={18}
                  weight="bold"
                  className={`shrink-0 text-ink-muted transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`}
                />
              </button>
            </h3>
            {/*
              The answer is always present in the rendered HTML — only CSS
              (grid-rows + overflow) controls its visibility. Search engines
              read the full markup regardless of the collapsed visual state,
              unlike a JS conditional that removes the node from the DOM
              entirely when closed.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
