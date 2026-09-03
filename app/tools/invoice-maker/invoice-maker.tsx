"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import InvoiceForm from "./invoice-form";
import InvoicePreview from "./invoice-preview";
import { InvoiceData, SellerDefaults } from "@/lib/invoice-maker-types";


const SELLER_STORAGE_KEY =
  "invoice-maker-seller-defaults";

const getToday = () => {
  return new Intl.DateTimeFormat("fa-IR").format(
    new Date()
  );
};

const createItem = () => ({
  id: crypto.randomUUID(),
  title: "",
  quantity: 1,
  unitPrice: 0,
  discount: 0,
});

const createInitialInvoice = (
  seller?: SellerDefaults
): InvoiceData => ({
  invoiceNumber: "1001",
  date: getToday(),

  sellerName: seller?.sellerName ?? "",
  sellerPhone: seller?.sellerPhone ?? "",
  sellerAddress: seller?.sellerAddress ?? "",

  customerName: "",
  customerPhone: "",
  customerAddress: "",

  items: [createItem()],

  taxRate: 0,

  notes: "",
});

export default function InvoiceMaker() {
  const [invoice, setInvoice] =
    useState<InvoiceData>(
      createInitialInvoice()
    );

  const [sellerDefaults, setSellerDefaults] =
    useState<SellerDefaults>({
      sellerName: "",
      sellerPhone: "",
      sellerAddress: "",
    });

  const [isStorageLoaded, setIsStorageLoaded] =
    useState(false);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          SELLER_STORAGE_KEY
        );

      if (saved) {
        const parsed =
          JSON.parse(saved) as SellerDefaults;

        const defaults: SellerDefaults = {
          sellerName:
            parsed.sellerName ?? "",
          sellerPhone:
            parsed.sellerPhone ?? "",
          sellerAddress:
            parsed.sellerAddress ?? "",
        };

        setSellerDefaults(defaults);

        setInvoice(
          createInitialInvoice(defaults)
        );
      }
    } catch {
      console.error(
        "Failed to load seller defaults."
      );
    } finally {
      setIsStorageLoaded(true);
    }
  }, []);

  const updateInvoice = (
    updates: Partial<InvoiceData>
  ) => {
    setInvoice((current) => ({
      ...current,
      ...updates,
    }));
  };

  const saveSellerDefaults = (
    defaults: SellerDefaults
  ) => {
    try {
      localStorage.setItem(
        SELLER_STORAGE_KEY,
        JSON.stringify(defaults)
      );

      setSellerDefaults(defaults);

      toast.success(
        "اطلاعات فروشنده ذخیره شد."
      );
    } catch {
      toast.error(
        "ذخیره اطلاعات فروشنده انجام نشد."
      );
    }
  };

  const deleteSellerDefaults = () => {
    try {
      localStorage.removeItem(
        SELLER_STORAGE_KEY
      );

      setSellerDefaults({
        sellerName: "",
        sellerPhone: "",
        sellerAddress: "",
      });

      toast.success(
        "اطلاعات ذخیره‌شده حذف شد."
      );
    } catch {
      toast.error(
        "حذف اطلاعات ذخیره‌شده انجام نشد."
      );
    }
  };

  const resetInvoice = () => {
    setInvoice(
      createInitialInvoice(
        sellerDefaults
      )
    );

    toast.success(
      "فاکتور به حالت اولیه بازگشت."
    );
  };

  const clearInvoice = () => {
    setInvoice({
      invoiceNumber: "",
      date: "",

      sellerName: "",
      sellerPhone: "",
      sellerAddress: "",

      customerName: "",
      customerPhone: "",
      customerAddress: "",

      items: [createItem()],

      taxRate: 0,

      notes: "",
    });

    toast.success(
      "اطلاعات فاکتور پاک شد."
    );
  };

  if (!isStorageLoaded) {
    return (
      <div className="w-full rounded-2xl border bg-card/60 p-6 shadow-sm">
        <div className="flex min-h-32 items-center justify-center text-sm text-muted-foreground">
          در حال آماده‌سازی فاکتور...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearInvoice}
        >
          پاک کردن
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={resetInvoice}
        >
          <RotateCcw className="size-4" />
          بازنشانی
        </Button>
      </div>

      <div className="grid w-full min-w-0 gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0">
          <InvoiceForm
            invoice={invoice}
            sellerDefaults={sellerDefaults}
            updateInvoice={updateInvoice}
            saveSellerDefaults={
              saveSellerDefaults
            }
            deleteSellerDefaults={
              deleteSellerDefaults
            }
          />
        </div>

        <div className="min-w-0 xl:sticky xl:top-4 xl:self-start">
          <InvoicePreview
            invoice={invoice}
          />
        </div>
      </div>
    </div>
  );
}