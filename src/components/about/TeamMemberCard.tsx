"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X, User } from "@phosphor-icons/react/ssr";
import type { TeamMember } from "@/lib/team-repository";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card group relative aspect-[3/4] overflow-hidden">
      {member.photoData ? (
        <Image src={member.photoData} alt={member.name} fill unoptimized className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary/8 text-primary">
          <User size={64} weight="fill" />
        </div>
      )}

      {member.role && (
        <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow">
          {member.role}
        </span>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-4 pb-4 pt-12 text-left transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "group-hover:opacity-0"
        }`}
      >
        <p className="text-lg font-bold text-white">{member.name}</p>
      </div>

      {member.bio && (
        <>
          <div
            className={`absolute inset-0 flex flex-col justify-end bg-ink/90 p-5 text-left transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <p className="text-sm leading-relaxed text-white/90">{member.bio}</p>
            <p className="mt-3 text-base font-bold text-white">{member.name}</p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? `Hide ${member.name}'s bio` : `Show ${member.name}'s bio`}
            className="absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105"
          >
            {isOpen ? <X size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
          </button>
        </>
      )}
    </div>
  );
}
