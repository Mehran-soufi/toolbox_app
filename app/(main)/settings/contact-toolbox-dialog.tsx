"use client";

import { FormEvent, useState } from "react";
import { Mail, Send, User, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ContactToolboxDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactToolboxDialog({
  open,
  onOpenChange,
}: ContactToolboxDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [website, setWebsite] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("لطفاً ایمیل خود را وارد کنید");
      return;
    }

    if (!message.trim()) {
      toast.error("لطفاً پیام خود را وارد کنید");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "ارسال پیام با مشکل مواجه شد");
      }

      toast.success("پیام شما با موفقیت ارسال شد");

      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Contact form error:", error);

      toast.error(
        error instanceof Error ? error.message : "ارسال پیام با مشکل مواجه شد",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent
        dir="rtl"
        className="max-h-[90vh] overflow-y-auto sm:max-w-lg"
      >
        <DialogHeader className="text-right">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
              <Mail className="size-6" />
            </div>

            <div>
              <DialogTitle className="text-lg font-bold">
                ارتباط با من
              </DialogTitle>

              <DialogDescription className="mt-1 text-xs leading-5">
                اگر پیشنهاد، انتقاد یا مشکلی در جعبه ابزار دارید، از این فرم
                برای ارسال پیام استفاده کنید.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="contact-name"
              className="flex items-center gap-2 text-xs font-medium"
            >
              <User className="size-3.5 text-zinc-400" />
              نام
              <span className="font-normal text-zinc-400">(اختیاری)</span>
            </label>

            <Input
              id="contact-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="نام شما"
              disabled={loading}
              className="h-10 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contact-email"
              className="flex items-center gap-2 text-xs font-medium"
            >
              <Mail className="size-3.5 text-zinc-400" />
              ایمیل
              <span className="text-red-500">*</span>
            </label>

            <Input
              id="contact-email"
              type="email"
              dir="ltr"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@email.com"
              disabled={loading}
              required
              className="h-10 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-subject" className="text-xs font-medium">
              موضوع
            </label>

            <Input
              id="contact-subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="مثلاً: پیشنهاد یا گزارش مشکل"
              disabled={loading}
              className="h-10 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contact-message"
              className="flex items-center gap-2 text-xs font-medium"
            >
              <MessageSquare className="size-3.5 text-zinc-400" />
              پیام
              <span className="text-red-500">*</span>
            </label>

            <Textarea
              id="contact-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="پیام خود را بنویسید..."
              disabled={loading}
              required
              rows={6}
              className="resize-none rounded-xl"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="contact-website">Website</label>

            <Input
              id="contact-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                در حال ارسال...
              </>
            ) : (
              <>
                <Send className="size-4" />
                ارسال پیام
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
