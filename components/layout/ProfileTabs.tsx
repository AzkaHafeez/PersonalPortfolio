"use client";

import { profileTabs, type ProfileTabId } from "@/content/site";

interface ProfileTabsProps {
  activeTab: ProfileTabId;
  onTabChange: (tab: ProfileTabId) => void;
  counts: Record<ProfileTabId, number>;
}

export function ProfileTabs({ activeTab, onTabChange, counts }: ProfileTabsProps) {
  return (
    <nav
      className="border-b border-border"
      aria-label="Profile sections"
    >
      <div className="container-editorial flex gap-8 overflow-x-auto px-6 md:gap-12 md:px-10 lg:px-16 xl:px-24">
        {profileTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = counts[tab.id];

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative shrink-0 pb-4 pt-2 text-sm font-medium transition-colors ${
                isActive ? "text-fg" : "text-fg-muted hover:text-fg"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {count > 0 && (
                  <span
                    className={`inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold ${
                      isActive
                        ? "bg-cherry text-cream"
                        : "bg-lavender/40 text-obsidian dark:bg-lavender/20 dark:text-cream"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-cherry" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
