"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";
import { FadeIn } from "@/components/ui/FadeIn";
import { FloatingPhone } from "@/components/exhibition/FloatingPhone";
import { PhoneScene } from "@/components/exhibition/PhoneScene";

const SCREENS = {
  dashboard: {
    src: "/images/projects/edunet-dashboard.svg",
    alt: "Classroom Dashboard",
  },
  list: {
    src: "/images/projects/edunet-list.svg",
    alt: "Classroom List",
  },
  chat: {
    src: "/images/projects/edunet-chat.svg",
    alt: "Chat",
  },
  home: {
    src: "/images/projects/edunet-home.svg",
    alt: "Home",
  },
  videocall: {
    src: "/images/projects/edunet-videocall.svg",
    alt: "Video Call",
  },
  settings: {
    src: "/images/projects/edunet-settings.svg",
    alt: "Settings",
  },
  join: {
    src: "/images/projects/edunet-join.svg",
    alt: "Join Classroom",
  },
  notes: {
    src: "/images/projects/edunet-notes.svg",
    alt: "Notes",
  },
} as const;

const FEATURES = [
  {
    title: "Nearby Discovery",
    body: "From the Home screen, find peers on BLE and Wi-Fi Direct without leaving the classroom.",
  },
  {
    title: "Offline Messaging",
    body: "Open Chat to message and share files through a star-topology local network.",
  },
  {
    title: "Local Calls",
    body: "Move into Video Call when conversation needs a face — still offline, no cloud required.",
  },
  {
    title: "WebRTC",
    body: "Peer-to-peer audio and video for live classroom interaction.",
  },
] as const;

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

function StoryBlock({ label, body }: { label: string; body?: string }) {
  if (!body) return null;
  return (
    <div className="border-t border-border pt-6">
      <p className="label-caps mb-3">{label}</p>
      <p className="text-sm leading-relaxed text-fg-muted md:text-base">{body}</p>
    </div>
  );
}

interface EdunetMobileShowcaseProps {
  project: Project;
  index: number;
}

export function EdunetMobileShowcase({
  project,
  index,
}: EdunetMobileShowcaseProps) {
  return (
    <div>
      <FadeIn>
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="font-serif-display text-5xl font-bold text-fg/15 md:text-7xl">
              {padIndex(index + 1)}
            </p>
            <h3 className="font-serif-display mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
              {project.description}
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Category", value: project.category ?? project.tag },
                { label: "Role", value: project.role },
                { label: "Duration", value: project.duration },
                { label: "Year", value: project.year },
              ].map((item) => (
                <div key={item.label} className="border-t border-border pt-3">
                  <dt className="label-caps">{item.label}</dt>
                  <dd className="mt-1 text-sm md:text-base">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <p className="label-caps mb-3">Tech Stack</p>
              <p className="text-sm text-fg-muted">
                {project.technologies.join(" · ")}
              </p>
            </div>
            <div className="mt-10 space-y-6">
              <StoryBlock label="Problem" body={project.problem} />
              <StoryBlock label="Solution" body={project.solution} />
              <StoryBlock label="Process" body={project.process} />
              <StoryBlock label="Outcome" body={project.outcome} />
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-caps border-b border-border pb-0.5 text-fg-muted transition-colors hover:border-fg hover:text-fg"
                >
                  GitHub ↗
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="label-caps border-b border-border pb-0.5 text-fg-muted transition-colors hover:border-fg hover:text-fg"
              >
                Full Case Study
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <PhoneScene
              className="relative mx-auto flex min-h-[460px] items-center justify-center md:min-h-[560px] lg:min-h-[620px]"
              intensity={14}
            >
              {(p) => (
                <>
                  <div className="absolute left-[4%] top-[8%] z-10 md:left-[8%] md:top-[6%]">
                    <FloatingPhone
                      {...SCREENS.list}
                      rotate={-12}
                      floatDelay={0.2}
                      depth={0.95}
                      className="w-[160px] md:w-[210px] lg:w-[230px]"
                      parallaxX={p.x * 0.8}
                      parallaxY={p.y * 0.8}
                    />
                  </div>
                  <div className="absolute bottom-[4%] right-[2%] z-20 md:bottom-[6%] md:right-[6%]">
                    <FloatingPhone
                      {...SCREENS.dashboard}
                      rotate={8}
                      floatDelay={0}
                      depth={1.08}
                      className="w-[180px] md:w-[240px] lg:w-[260px]"
                      priority
                      parallaxX={-p.x * 0.6}
                      parallaxY={-p.y * 0.5}
                    />
                  </div>
                </>
              )}
            </PhoneScene>
          </div>
        </div>
      </FadeIn>

      <FadeIn className="py-24 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <PhoneScene className="flex justify-center lg:justify-start">
            {(p) => (
              <FloatingPhone
                {...SCREENS.join}
                rotate={7}
                floatDelay={0.3}
                depth={1}
                className="w-[200px] md:w-[250px]"
                parallaxX={p.x}
                parallaxY={p.y}
              />
            )}
          </PhoneScene>
          <div>
            <p className="label-caps mb-4 text-cherry">Capabilities</p>
            <p className="font-serif-display text-2xl font-bold tracking-tight md:text-3xl">
              Offline workflow
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted md:text-base">
              The classroom flow is simple: Discover nearby peers from Home,
              Message in Chat, then Call when the conversation needs a live
              Video Call — all without internet.
            </p>
            <ul className="mt-10 space-y-0">
              {FEATURES.map((f) => (
                <li
                  key={f.title}
                  className="border-t border-border py-6 first:border-t-0 first:pt-0"
                >
                  <h4 className="font-serif-display text-xl font-bold md:text-2xl">
                    {f.title}
                  </h4>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted md:text-base">
                    {f.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>

      <FadeIn className="py-24 md:py-36">
        <p className="label-caps mb-4 text-center">Exhibition Wall</p>
        <p className="mx-auto mb-16 max-w-md text-center font-serif-display text-2xl md:text-3xl">
          Every screen, one offline classroom
        </p>
        <PhoneScene
          className="relative mx-auto min-h-[640px] max-w-5xl md:min-h-[720px]"
          intensity={16}
        >
          {(p) => (
            <>
              <div className="absolute left-[2%] top-[8%] md:left-[6%]">
                <FloatingPhone
                  {...SCREENS.home}
                  rotate={-10}
                  floatDelay={0}
                  depth={0.9}
                  className="w-[130px] md:w-[170px]"
                  parallaxX={p.x * 0.4}
                  parallaxY={p.y * 0.3}
                />
              </div>
              <div className="absolute left-[22%] top-[0%] md:left-[26%]">
                <FloatingPhone
                  {...SCREENS.chat}
                  rotate={6}
                  floatDelay={0.25}
                  depth={1.05}
                  className="w-[150px] md:w-[190px]"
                  parallaxX={p.x * 0.7}
                  parallaxY={p.y * 0.5}
                />
              </div>
              <div className="absolute right-[24%] top-[4%] md:right-[28%]">
                <FloatingPhone
                  {...SCREENS.videocall}
                  rotate={-7}
                  floatDelay={0.5}
                  depth={0.95}
                  className="w-[140px] md:w-[180px]"
                  parallaxX={-p.x * 0.5}
                  parallaxY={p.y * 0.4}
                />
              </div>
              <div className="absolute right-[2%] top-[10%] md:right-[5%]">
                <FloatingPhone
                  {...SCREENS.dashboard}
                  rotate={12}
                  floatDelay={0.35}
                  depth={1}
                  className="w-[135px] md:w-[175px]"
                  parallaxX={-p.x * 0.6}
                  parallaxY={-p.y * 0.3}
                />
              </div>
              <div className="absolute bottom-[12%] left-[10%] md:bottom-[8%] md:left-[14%]">
                <FloatingPhone
                  {...SCREENS.settings}
                  rotate={-14}
                  floatDelay={0.6}
                  depth={0.88}
                  className="w-[125px] md:w-[160px]"
                  parallaxX={p.x * 0.3}
                  parallaxY={-p.y * 0.4}
                />
              </div>
              <div className="absolute bottom-[4%] left-1/2 z-20 -translate-x-1/2">
                <FloatingPhone
                  {...SCREENS.join}
                  rotate={4}
                  floatDelay={0.15}
                  depth={1.12}
                  className="w-[160px] md:w-[210px]"
                  parallaxX={p.x}
                  parallaxY={p.y}
                />
              </div>
              <div className="absolute bottom-[16%] right-[8%] md:bottom-[12%] md:right-[12%]">
                <FloatingPhone
                  {...SCREENS.notes}
                  rotate={9}
                  floatDelay={0.8}
                  depth={0.92}
                  className="w-[130px] md:w-[165px]"
                  parallaxX={-p.x * 0.45}
                  parallaxY={-p.y * 0.55}
                />
              </div>
            </>
          )}
        </PhoneScene>
      </FadeIn>
    </div>
  );
}
