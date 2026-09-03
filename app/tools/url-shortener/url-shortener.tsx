"use client";

import { FormEvent, useState } from "react";
import {
  Check,
  Clipboard,
  ExternalLink,
  Link2,
  Loader2,
  RotateCcw,
  Scissors,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UrlShortener() {
  const [url, setUrl] = useState("");

  const [shortUrl, setShortUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const shortenUrl = async (event?: FormEvent) => {
    event?.preventDefault();

    const value = url.trim();

    if (!value) {
      toast.error("لطفاً لینک را وارد کنید.");
      return;
    }

    try {
      const parsedUrl = new URL(value);

      if (
        !["http:", "https:"].includes(
          parsedUrl.protocol
        )
      ) {
        toast.error(
          "لینک باید با http یا https شروع شود."
        );
        return;
      }
    } catch {
      toast.error("لینک واردشده معتبر نیست.");
      return;
    }

    setLoading(true);
    setCopied(false);
    setShortUrl("");

    try {
      const response = await fetch(
        "/api/url-shortener",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            link: value,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message ||
            "کوتاه کردن لینک انجام نشد."
        );
      }

      setShortUrl(data.shortUrl);

      toast.success(
        "لینک با موفقیت کوتاه شد."
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "خطایی هنگام کوتاه کردن لینک رخ داد.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const copyShortUrl = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);

      toast.success(
        "لینک کوتاه با موفقیت کپی شد."
      );

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      toast.error(
        "کپی کردن لینک انجام نشد."
      );
    }
  };

  const clear = () => {
    setUrl("");
    setShortUrl("");
    setCopied(false);

    toast.success("مقدار پاک شد.");
  };

  const reset = () => {
    setUrl("");
    setShortUrl("");
    setCopied(false);

    toast.success(
      "ابزار به حالت اولیه بازگشت."
    );
  };

  return (
    <div className="w-full rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <Scissors className="size-5" />
          </div>

          <div>
            <h2 className="font-semibold">
              کوتاه‌کننده لینک
            </h2>

            <p className="text-xs text-muted-foreground">
              تبدیل لینک‌های طولانی به لینک کوتاه
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={reset}
          title="بازنشانی"
          className="self-end sm:self-auto"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>

      {/* Form */}
      <form
        onSubmit={shortenUrl}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="url"
            className="text-sm font-medium"
          >
            لینک موردنظر
          </label>

          <div className="relative">
            <Link2 className="pointer-events-none absolute right-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="url"
              value={url}
              onChange={(event) =>
                setUrl(event.target.value)
              }
              placeholder="https://example.com/your-long-url"
              dir="ltr"
              inputMode="url"
              autoComplete="url"
              className="h-12 pr-10 text-base"
              disabled={loading}
            />
          </div>

          <p className="text-xs leading-6 text-muted-foreground">
            لینک باید با http:// یا https:// شروع شود.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={loading || !url.trim()}
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              در حال کوتاه کردن...
            </>
          ) : (
            <>
              <Scissors className="size-4" />
              کوتاه کردن لینک
            </>
          )}
        </Button>
      </form>

      {/* Result */}
      {shortUrl && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">
              لینک کوتاه
            </label>

            <span className="text-xs text-green-500">
              آماده استفاده
            </span>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <code
                  dir="ltr"
                  className="block break-all text-sm font-semibold sm:text-base"
                >
                  {shortUrl}
                </code>
              </div>

              <div className="flex shrink-0 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={copyShortUrl}
                  title="کپی لینک"
                >
                  {copied ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <Clipboard className="size-4" />
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  asChild
                  title="باز کردن لینک"
                >
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom actions */}
      <div className="mt-5 flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={clear}
          disabled={
            loading ||
            (!url && !shortUrl)
          }
        >
          <Trash2 className="size-4" />
          پاک کردن
        </Button>
      </div>
    </div>
  );
}