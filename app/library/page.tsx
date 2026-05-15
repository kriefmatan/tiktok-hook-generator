"use client";

import { FileText } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AppShell } from "../components/AppShell";
import type { AppLocale } from "../lib/locale/appLocale";
import { DEFAULT_APP_LOCALE } from "../lib/locale/appLocale";
import { PRESET_GROUPS, UI } from "../lib/locale/uiCatalog";
import { readStoredUiLocale, writeStoredUiLocale } from "../lib/locale/uiLocaleStorage";
import {
  ALL_TOPIC_METAS,
  topicLabel,
  topicPdfHref,
  type TopicId,
} from "../lib/pdf/topicCatalog";

export default function LibraryPage() {
  const [uiLocale, setUiLocale] = useState<AppLocale>(DEFAULT_APP_LOCALE);
  const [localeReady, setLocaleReady] = useState(false);

  useEffect(() => {
    const stored = readStoredUiLocale();
    if (stored) setUiLocale(stored);
    setLocaleReady(true);
  }, []);

  const onUiLocaleChange = useCallback((locale: AppLocale) => {
    setUiLocale(locale);
    writeStoredUiLocale(locale);
  }, []);

  if (!localeReady) {
    return <main className="min-h-screen bg-background" />;
  }

  const ui = UI[uiLocale];
  const chips = ALL_TOPIC_METAS.filter((t) => t.kind === "chip");
  const presetsByGroup = PRESET_GROUPS.map((g) => ({
    groupId: g.id,
    label: ui.presetGroups[g.id],
    topics: ALL_TOPIC_METAS.filter((t) => t.kind === "preset" && t.groupId === g.id),
  }));

  return (
    <AppShell locale={uiLocale} onLocaleChange={onUiLocaleChange}>
      <div>
        <h1 className="text-2xl font-semibold text-white">{ui.pdfLibrary}</h1>
        <p className="mt-2 max-w-xl text-sm text-text-secondary">{ui.pdfLibrarySubtitle}</p>

        <TopicSection title={ui.chipsLabel} topics={chips} locale={uiLocale} openLabel={ui.pdfOpenTopic} />
        {presetsByGroup.map((group) => (
          <TopicSection
            key={group.groupId}
            title={group.label}
            topics={group.topics}
            locale={uiLocale}
            openLabel={ui.pdfOpenTopic}
          />
        ))}
      </div>
    </AppShell>
  );
}

function TopicSection({
  title,
  topics,
  locale,
  openLabel,
}: {
  title: string;
  topics: readonly { id: TopicId }[];
  locale: AppLocale;
  openLabel: string;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">{title}</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <li key={t.id}>
            <a
              href={topicPdfHref(locale, t.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-card px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-accent/40 hover:text-white"
            >
              <FileText className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span className="min-w-0 flex-1 truncate">{topicLabel(t.id, locale)}</span>
              <span className="text-[11px] text-text-muted">{openLabel}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
