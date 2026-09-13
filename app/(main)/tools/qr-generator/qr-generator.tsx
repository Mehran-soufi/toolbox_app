"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  Check,
  Clipboard,
  Download,
  Link as LinkIcon,
  Mail,
  MessageSquare,
  Phone,
  QrCode,
  UserRound,
  Wifi,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToolHistory } from "@/hooks/useToolHistory";

type QRType = "text" | "url" | "phone" | "email" | "sms" | "wifi" | "contact";

type FormData = {
  text: string;

  url: string;

  phone: string;

  email: string;
  emailSubject: string;
  emailBody: string;

  smsPhone: string;
  smsMessage: string;

  wifiSSID: string;
  wifiPassword: string;
  wifiSecurity: "WPA" | "WEP" | "nopass";
  wifiHidden: boolean;

  firstName: string;
  lastName: string;
  contactPhone: string;
  contactEmail: string;
  organization: string;
};

const qrTypes = [
  {
    value: "text",
    label: "متن",
    icon: QrCode,
  },
  {
    value: "url",
    label: "لینک",
    icon: LinkIcon,
  },
  {
    value: "phone",
    label: "شماره تلفن",
    icon: Phone,
  },
  {
    value: "email",
    label: "ایمیل",
    icon: Mail,
  },
  {
    value: "sms",
    label: "پیامک",
    icon: MessageSquare,
  },
  {
    value: "wifi",
    label: "Wi-Fi",
    icon: Wifi,
  },
  {
    value: "contact",
    label: "مخاطب",
    icon: UserRound,
  },
] as const;

const initialFormData: FormData = {
  text: "",
  url: "",
  phone: "",
  email: "",
  emailSubject: "",
  emailBody: "",
  smsPhone: "",
  smsMessage: "",
  wifiSSID: "",
  wifiPassword: "",
  wifiSecurity: "WPA",
  wifiHidden: false,
  firstName: "",
  lastName: "",
  contactPhone: "",
  contactEmail: "",
  organization: "",
};

export default function QRGenerator() {
  useToolHistory({
    toolName: "تولید QR Code",
    toolSlug: "qr-generator",
    toolIcon: "QrCode",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [type, setType] = useState<QRType>("text");
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const generateContent = () => {
    switch (type) {
      case "text":
        return formData.text.trim();

      case "url":
        return formData.url.trim();

      case "phone":
        return formData.phone.trim() ? `tel:${formData.phone.trim()}` : "";

      case "email": {
        if (!formData.email.trim()) return "";

        const params = new URLSearchParams();

        if (formData.emailSubject.trim()) {
          params.set("subject", formData.emailSubject.trim());
        }

        if (formData.emailBody.trim()) {
          params.set("body", formData.emailBody.trim());
        }

        const query = params.toString();

        return `mailto:${formData.email.trim()}${query ? `?${query}` : ""}`;
      }

      case "sms":
        if (!formData.smsPhone.trim()) return "";

        return `SMSTO:${formData.smsPhone.trim()}:${formData.smsMessage.trim()}`;

      case "wifi": {
        if (!formData.wifiSSID.trim()) return "";

        const escapeWifiValue = (value: string) =>
          value
            .replace(/\\/g, "\\\\")
            .replace(/;/g, "\\;")
            .replace(/,/g, "\\,")
            .replace(/:/g, "\\:");

        return `WIFI:T:${formData.wifiSecurity};S:${escapeWifiValue(
          formData.wifiSSID,
        )};P:${escapeWifiValue(
          formData.wifiPassword,
        )};H:${formData.wifiHidden ? "true" : "false"};;`;
      }

      case "contact": {
        if (
          !formData.firstName.trim() &&
          !formData.lastName.trim() &&
          !formData.contactPhone.trim() &&
          !formData.contactEmail.trim()
        ) {
          return "";
        }

        const fullName =
          `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

        return [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:${fullName}`,
          `N:${formData.lastName.trim()};${formData.firstName.trim()};;;`,
          formData.organization.trim()
            ? `ORG:${formData.organization.trim()}`
            : "",
          formData.contactPhone.trim()
            ? `TEL:${formData.contactPhone.trim()}`
            : "",
          formData.contactEmail.trim()
            ? `EMAIL:${formData.contactEmail.trim()}`
            : "",
          "END:VCARD",
        ]
          .filter(Boolean)
          .join("\n");
      }

      default:
        return "";
    }
  };

  const qrContent = generateContent();

  const generateQR = useCallback(async () => {
    if (!canvasRef.current || !qrContent) {
      setGenerated(false);
      return;
    }

    try {
      await QRCode.toCanvas(canvasRef.current, qrContent, {
        width: 280,
        margin: 2,
        errorCorrectionLevel: "M",
      });
      setGenerated(true);
    } catch (error) {
      console.error("QR generation error:", error);
      setGenerated(false);
    }
  }, [qrContent]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      generateQR();
    }, 200);

    return () => clearTimeout(timeout);
  }, [qrContent, generateQR]);

  const handleDownload = () => {
    if (!canvasRef.current || !generated) return;

    const link = document.createElement("a");

    link.download = "qr-code.png";
    link.href = canvasRef.current.toDataURL("image/png");

    link.click();
  };

  const handleCopy = async () => {
    if (!qrContent) return;

    try {
      await navigator.clipboard.writeText(qrContent);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  const clearForm = () => {
    setFormData(initialFormData);
    setGenerated(false);
    setCopied(false);
  };

  const selectedType = qrTypes.find((item) => item.value === type);

  const renderForm = () => {
    switch (type) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor="text">متن موردنظر</Label>

            <Textarea
              id="text"
              value={formData.text}
              onChange={(event) => updateField("text", event.target.value)}
              placeholder="متن خود را وارد کنید..."
              className="min-h-36 resize-none"
            />
          </div>
        );

      case "url":
        return (
          <div className="space-y-2">
            <Label htmlFor="url">آدرس لینک</Label>

            <Input
              id="url"
              dir="ltr"
              value={formData.url}
              onChange={(event) => updateField("url", event.target.value)}
              placeholder="https://example.com"
            />
          </div>
        );

      case "phone":
        return (
          <div className="space-y-2">
            <Label htmlFor="phone">شماره تلفن</Label>

            <Input
              id="phone"
              dir="ltr"
              type="tel"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+989121234567"
            />
          </div>
        );

      case "email":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">آدرس ایمیل</Label>

              <Input
                id="email"
                dir="ltr"
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="example@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailSubject">موضوع ایمیل</Label>

              <Input
                id="emailSubject"
                value={formData.emailSubject}
                onChange={(event) =>
                  updateField("emailSubject", event.target.value)
                }
                placeholder="موضوع ایمیل"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailBody">متن ایمیل</Label>

              <Textarea
                id="emailBody"
                value={formData.emailBody}
                onChange={(event) =>
                  updateField("emailBody", event.target.value)
                }
                placeholder="متن ایمیل..."
              />
            </div>
          </div>
        );

      case "sms":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smsPhone">شماره گیرنده</Label>

              <Input
                id="smsPhone"
                dir="ltr"
                type="tel"
                value={formData.smsPhone}
                onChange={(event) =>
                  updateField("smsPhone", event.target.value)
                }
                placeholder="+989121234567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smsMessage">متن پیامک</Label>

              <Textarea
                id="smsMessage"
                value={formData.smsMessage}
                onChange={(event) =>
                  updateField("smsMessage", event.target.value)
                }
                placeholder="متن پیامک..."
              />
            </div>
          </div>
        );

      case "wifi":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wifiSSID">نام شبکه (SSID)</Label>

              <Input
                id="wifiSSID"
                dir="ltr"
                value={formData.wifiSSID}
                onChange={(event) =>
                  updateField("wifiSSID", event.target.value)
                }
                placeholder="My WiFi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wifiPassword">رمز عبور</Label>

              <Input
                id="wifiPassword"
                dir="ltr"
                type="password"
                value={formData.wifiPassword}
                onChange={(event) =>
                  updateField("wifiPassword", event.target.value)
                }
                placeholder="رمز عبور شبکه"
              />
            </div>

            <div className="space-y-2">
              <Label>نوع امنیت</Label>

              <Select
                value={formData.wifiSecurity}
                onValueChange={(value) =>
                  updateField("wifiSecurity", value as "WPA" | "WEP" | "nopass")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="WPA">WPA / WPA2</SelectItem>

                  <SelectItem value="WEP">WEP</SelectItem>

                  <SelectItem value="nopass">بدون رمز</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.wifiHidden}
                onChange={(event) =>
                  updateField("wifiHidden", event.target.checked)
                }
                className="size-4 rounded border-zinc-300 accent-violet-500"
              />
              شبکه مخفی است
            </label>
          </div>
        );

      case "contact":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">نام</Label>

              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(event) =>
                  updateField("firstName", event.target.value)
                }
                placeholder="مهران"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">نام خانوادگی</Label>

              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(event) =>
                  updateField("lastName", event.target.value)
                }
                placeholder="صوفی"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">شماره تلفن</Label>

              <Input
                id="contactPhone"
                dir="ltr"
                type="tel"
                value={formData.contactPhone}
                onChange={(event) =>
                  updateField("contactPhone", event.target.value)
                }
                placeholder="+989121234567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">ایمیل</Label>

              <Input
                id="contactEmail"
                dir="ltr"
                type="email"
                value={formData.contactEmail}
                onChange={(event) =>
                  updateField("contactEmail", event.target.value)
                }
                placeholder="example@email.com"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="organization">شرکت / سازمان</Label>

              <Input
                id="organization"
                value={formData.organization}
                onChange={(event) =>
                  updateField("organization", event.target.value)
                }
                placeholder="نام شرکت یا سازمان"
              />
            </div>
          </div>
        );
    }
  };
  const SelectedIcon = selectedType?.icon;

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Input */}
      <div className="rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mb-5">
          <h2 className="text-base font-bold md:text-lg">اطلاعات QR Code</h2>

          <p className="mt-1 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
            نوع اطلاعات را انتخاب کرده و مشخصات موردنظر خود را وارد کنید.
          </p>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label>نوع QR Code</Label>

          <Select
            value={type}
            onValueChange={(value) => setType(value as QRType)}
          >
            <SelectTrigger className="h-11 w-full" dir="rtl">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {qrTypes.map((item) => {
                const Icon = item.icon;

                return (
                  <SelectItem key={item.value} value={item.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Selected type */}
        {selectedType && SelectedIcon && (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-violet-500/5 px-3 py-2.5 text-sm text-violet-600 dark:text-violet-400">
            <SelectedIcon className="size-4" />

            <span>ساخت QR برای {selectedType.label}</span>
          </div>
        )}

        {/* Form */}
        <div className="mt-5">{renderForm()}</div>

        {/* Actions */}
        <div className="mt-5">
          <Button
            type="button"
            variant="outline"
            onClick={clearForm}
            disabled={!qrContent}
            className="w-full"
          >
            پاک کردن اطلاعات
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex min-h-100 flex-col rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mb-5">
          <h2 className="text-base font-bold md:text-lg">پیش‌نمایش QR Code</h2>

          <p className="mt-1 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
            QR Code تولیدشده را مشاهده و در صورت نیاز دریافت کنید.
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="flex size-72 items-center justify-center rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800">
            <canvas
              ref={canvasRef}
              className={`max-h-full max-w-full ${
                generated ? "block" : "hidden"
              }`}
            />

            {!generated && (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
                  <QrCode className="size-7" />
                </div>

                <p className="text-sm font-medium">QR Code هنوز ساخته نشده</p>

                <p className="mt-1 max-w-50 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                  اطلاعات موردنظر خود را وارد کنید تا QR Code به‌صورت خودکار
                  ساخته شود.
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 flex w-full max-w-72 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              disabled={!qrContent}
              className="flex-1"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  کپی شد
                </>
              ) : (
                <>
                  <Clipboard className="size-4" />
                  کپی
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleDownload}
              disabled={!generated}
              className="flex-1"
            >
              <Download className="size-4" />
              دانلود
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
