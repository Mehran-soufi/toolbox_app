"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Check,
  Clipboard,
  Eraser,
  FilePlus,
  Save,
  StickyNote,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useToolHistory } from "@/hooks/useToolHistory";

import { toast } from "sonner";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "toolbox-notes";

export default function NoteTool() {
  useToolHistory({
    toolName: "یادداشت",
    toolSlug: "notes",
    toolIcon: "StickyNote",
  });

  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  /* ---------------- Load Notes ---------------- */

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);

      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);

        if (Array.isArray(parsedNotes)) {
          setNotes(parsedNotes);
        }
      }
    } catch (error) {
      console.error("Load notes error:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /* ---------------- Save Notes ---------------- */

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error("Save notes error:", error);
    }
  }, [notes, isLoaded]);

  /* ---------------- Statistics ---------------- */

  const wordCount = useMemo(() => {
    const trimmed = content.trim();

    if (!trimmed) {
      return 0;
    }

    return trimmed.split(/\s+/).length;
  }, [content]);

  const characterCount = content.length;

  /* ---------------- Create New Note ---------------- */

  const handleNewNote = () => {
    setActiveNoteId(null);
    setTitle("");
    setContent("");
    setCopied(false);
  };

  /* ---------------- Save Note ---------------- */

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle && !trimmedContent) {
      toast.error("ابتدا عنوان یا متن یادداشت را وارد کنید.");
      return;
    }

    const now = new Date().toISOString();

    if (activeNoteId) {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.id === activeNoteId
            ? {
                ...note,
                title: trimmedTitle || "یادداشت بدون عنوان",
                content,
                updatedAt: now,
              }
            : note,
        ),
      );

      toast.success("یادداشت با موفقیت به‌روزرسانی شد.");
      return;
    }

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: trimmedTitle || "یادداشت بدون عنوان",
      content,
      createdAt: now,
      updatedAt: now,
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);

    setActiveNoteId(newNote.id);

    toast.success("یادداشت با موفقیت ذخیره شد.");
  };

  /* ---------------- Open Note ---------------- */

  const handleOpenNote = (note: Note) => {
    setActiveNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCopied(false);
  };

  /* ---------------- Delete Note ---------------- */

  const handleDelete = (id: string) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id),
    );

    if (activeNoteId === id) {
      handleNewNote();
    }

    toast.success("یادداشت حذف شد.");
  };

  /* ---------------- Copy ---------------- */

  const handleCopy = async () => {
    if (!content.trim()) {
      toast.error("متنی برای کپی کردن وجود ندارد.");
      return;
    }

    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);

      toast.success("متن یادداشت کپی شد.");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy note error:", error);

      toast.error("کپی کردن متن انجام نشد.");
    }
  };

  /* ---------------- Clear ---------------- */

  const handleClear = () => {
    setTitle("");
    setContent("");
    setCopied(false);

    toast.success("ویرایشگر پاک شد.");
  };

  /* ---------------- Date Formatter ---------------- */

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  /* ---------------- Preview ---------------- */

  const getPreview = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return "بدون متن";
    }

    return trimmed.length > 100
      ? `${trimmed.slice(0, 100)}...`
      : trimmed;
  };

  return (
    <div className="w-full space-y-5">
      {/* Editor */}
      <div className="w-full rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
              <StickyNote className="size-5" />
            </div>

            <div>
              <h2 className="text-base font-bold md:text-lg">
                {activeNoteId ? "ویرایش یادداشت" : "یادداشت جدید"}
              </h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                یادداشت خود را بنویسید؛ تغییرات را می‌توانید ذخیره کنید.
              </p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label
            htmlFor="note-title"
            className="text-sm font-medium"
          >
            عنوان
          </label>

          <Input
            id="note-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="عنوان یادداشت..."
            className="h-11"
          />
        </div>

        {/* Content */}
        <div className="mt-5 space-y-2">
          <label
            htmlFor="note-content"
            className="text-sm font-medium"
          >
            متن یادداشت
          </label>

          <Textarea
            id="note-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="یادداشت خود را اینجا بنویسید..."
            dir="auto"
            className="min-h-65 resize-y leading-8"
          />
        </div>

        {/* Statistics */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              {wordCount.toLocaleString("fa-IR")} کلمه
            </span>

            <span>
              {characterCount.toLocaleString("fa-IR")} کاراکتر
            </span>
          </div>

          {activeNoteId && (
            <span>
              آخرین ویرایش:{" "}
              {formatDate(
                notes.find((note) => note.id === activeNoteId)
                  ?.updatedAt ?? new Date().toISOString(),
              )}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Button
            type="button"
            onClick={handleSave}
            className="w-full"
          >
            <Save className="size-4" />
            {activeNoteId ? "ذخیره تغییرات" : "ذخیره یادداشت"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleCopy}
            className="w-full"
          >
            {copied ? (
              <>
                <Check className="size-4" />
                کپی شد
              </>
            ) : (
              <>
                <Clipboard className="size-4" />
                کپی متن
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="w-full"
          >
            <Eraser className="size-4" />
            پاک کردن
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleNewNote}
            className="w-full"
          >
            <FilePlus className="size-4" />
            یادداشت جدید
          </Button>
        </div>
      </div>

      {/* Saved Notes */}
      {notes.length > 0 && (
        <div className="w-full rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold md:text-lg">
                یادداشت‌های ذخیره‌شده
              </h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                یادداشت‌های شما در همین مرورگر نگهداری می‌شوند.
              </p>
            </div>

            <span className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-400">
              {notes.length.toLocaleString("fa-IR")} یادداشت
            </span>
          </div>

          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`rounded-xl border p-4 transition-colors ${
                  activeNoteId === note.id
                    ? "border-violet-500/30 bg-violet-500/5"
                    : "border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleOpenNote(note)}
                  className="w-full text-right"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold">
                        {note.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
                        {getPreview(note.content)}
                      </p>
                    </div>
                  </div>
                </button>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200/70 pt-3 dark:border-zinc-800">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span>
                      {formatDate(note.updatedAt)}
                    </span>

                    <span>
                      {note.content
                        .trim()
                        .split(/\s+/)
                        .filter(Boolean)
                        .length.toLocaleString("fa-IR")}{" "}
                      کلمه
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(note.id)}
                    className="text-red-500 hover:text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {notes.length === 0 && (
        <div className="w-full rounded-2xl border border-dashed border-zinc-300 bg-white/40 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
          <StickyNote className="mx-auto size-8 text-zinc-400" />

          <h3 className="mt-3 text-sm font-semibold">
            هنوز یادداشتی ذخیره نکرده‌اید
          </h3>

          <p className="mt-1 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
            اولین یادداشت خود را بنویسید و روی «ذخیره یادداشت» بزنید.
          </p>
        </div>
      )}
    </div>
  );
}