"use client";

import { Check, Clipboard, Printer } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { InvoiceData } from "@/lib/invoice-maker-types";

type InvoicePreviewProps = {
  invoice: InvoiceData;
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("fa-IR").format(Math.round(value));
};

const calculateItem = (
  quantity: number,
  unitPrice: number,
  discount: number,
) => {
  const subtotal = quantity * unitPrice;

  const discountAmount = subtotal * (discount / 100);

  return {
    subtotal,
    discountAmount,
    total: subtotal - discountAmount,
  };
};

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const [copied, setCopied] = useState(false);

  const totals = invoice.items.reduce(
    (acc, item) => {
      const result = calculateItem(
        item.quantity,
        item.unitPrice,
        item.discount,
      );

      return {
        subtotal: acc.subtotal + result.subtotal,

        discount: acc.discount + result.discountAmount,

        afterDiscount: acc.afterDiscount + result.total,
      };
    },
    {
      subtotal: 0,
      discount: 0,
      afterDiscount: 0,
    },
  );

  const taxAmount = totals.afterDiscount * (invoice.taxRate / 100);

  const finalTotal = totals.afterDiscount + taxAmount;

  const createInvoiceText = () => {
    const itemsText = invoice.items
      .filter((item) => item.title.trim())
      .map((item, index) => {
        const result = calculateItem(
          item.quantity,
          item.unitPrice,
          item.discount,
        );

        return `${index + 1}. ${item.title} | تعداد: ${
          item.quantity
        } | مبلغ: ${formatNumber(result.total)} تومان`;
      })
      .join("\n");

    return `فاکتور شماره ${invoice.invoiceNumber || "-"}
تاریخ: ${invoice.date || "-"}

فروشنده: ${invoice.sellerName || "-"}
تماس: ${invoice.sellerPhone || "-"}

مشتری: ${invoice.customerName || "-"}
تماس: ${invoice.customerPhone || "-"}

${itemsText}

جمع کالاها: ${formatNumber(totals.subtotal)} تومان

تخفیف: ${formatNumber(totals.discount)} تومان

مبلغ پس از تخفیف: ${formatNumber(totals.afterDiscount)} تومان

مالیات ${invoice.taxRate}٪: ${formatNumber(taxAmount)} تومان

مبلغ نهایی: ${formatNumber(finalTotal)} تومان

${invoice.notes || ""}`;
  };

  const copyInvoice = async () => {
    try {
      await navigator.clipboard.writeText(createInvoiceText());

      setCopied(true);

      toast.success("اطلاعات فاکتور کپی شد.");

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      toast.error("کپی کردن اطلاعات فاکتور انجام نشد.");
    }
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-2 print:hidden">
        <Button type="button" variant="outline" size="sm" onClick={copyInvoice}>
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Clipboard className="size-4" />
          )}

          {copied ? "کپی شد" : "کپی فاکتور"}
        </Button>

        <Button type="button" size="sm" onClick={printInvoice}>
          <Printer className="size-4" />
          چاپ فاکتور
        </Button>
      </div>

      {/* Invoice */}
      <div
        id="invoice-preview"
        dir="rtl"
        className="invoice-paper w-full overflow-hidden rounded-2xl border bg-white text-black shadow-sm"
      >
        {/* Header */}
        <div className="border-b-2 border-black/80 p-4 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="wrap-break text-xl font-bold sm:text-2xl">
                {invoice.sellerName || "نام کسب‌وکار"}
              </h2>

              {invoice.sellerAddress && (
                <p className="mt-2 max-w-md wrap-break text-xs leading-6 text-black/60">
                  {invoice.sellerAddress}
                </p>
              )}

              {invoice.sellerPhone && (
                <p className="mt-1 text-xs text-black/60">
                  تماس: {invoice.sellerPhone}
                </p>
              )}
            </div>

            <div className="shrink-0 text-right sm:text-left">
              <h1 className="text-lg font-bold sm:text-xl">فاکتور فروش</h1>

              <div className="mt-3 space-y-1 text-xs">
                <p>
                  شماره: <strong>{invoice.invoiceNumber || "-"}</strong>
                </p>

                <p>
                  تاریخ: <strong>{invoice.date || "-"}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Parties */}
        <div className="grid border-b border-black/20 sm:grid-cols-2">
          <div className="border-b border-black/20 p-4 sm:border-b-0 sm:border-l sm:p-6">
            <h3 className="mb-3 text-xs font-bold">فروشنده</h3>

            <p className="wrap-break text-sm font-medium">
              {invoice.sellerName || "-"}
            </p>

            {invoice.sellerPhone && (
              <p className="mt-1 text-xs text-black/60">
                {invoice.sellerPhone}
              </p>
            )}

            {invoice.sellerAddress && (
              <p className="mt-1 wrap-break text-xs leading-5 text-black/60">
                {invoice.sellerAddress}
              </p>
            )}
          </div>

          <div className="p-4 sm:p-6">
            <h3 className="mb-3 text-xs font-bold">مشتری</h3>

            <p className="wrap-break text-sm font-medium">
              {invoice.customerName || "-"}
            </p>

            {invoice.customerPhone && (
              <p className="mt-1 text-xs text-black/60">
                {invoice.customerPhone}
              </p>
            )}

            {invoice.customerAddress && (
              <p className="mt-1 wrap-break text-xs leading-5 text-black/60">
                {invoice.customerAddress}
              </p>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="p-3 sm:p-6">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-155 border-collapse text-xs">
              <thead>
                <tr className="bg-black/4">
                  <th className="border border-black/20 p-3 text-center">
                    ردیف
                  </th>

                  <th className="border border-black/20 p-3 text-right">
                    شرح کالا / خدمت
                  </th>

                  <th className="border border-black/20 p-3 text-center">
                    تعداد
                  </th>

                  <th className="border border-black/20 p-3 text-center">
                    قیمت واحد
                  </th>

                  <th className="border border-black/20 p-3 text-center">
                    تخفیف
                  </th>

                  <th className="border border-black/20 p-3 text-center">
                    مبلغ نهایی
                  </th>
                </tr>
              </thead>

              <tbody>
                {invoice.items.map((item, index) => {
                  const result = calculateItem(
                    item.quantity,
                    item.unitPrice,
                    item.discount,
                  );

                  return (
                    <tr key={item.id}>
                      <td className="border border-black/20 p-3 text-center">
                        {index + 1}
                      </td>

                      <td className="max-w-55 wrap-break border border-black/20 p-3">
                        {item.title || "-"}
                      </td>

                      <td className="border border-black/20 p-3 text-center">
                        {formatNumber(item.quantity)}
                      </td>

                      <td className="border border-black/20 p-3 text-center">
                        {formatNumber(item.unitPrice)}
                      </td>

                      <td className="border border-black/20 p-3 text-center">
                        {formatNumber(item.discount)}٪
                      </td>

                      <td className="border border-black/20 p-3 text-center font-medium">
                        {formatNumber(result.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end px-4 pb-5 sm:px-6 sm:pb-6">
          <div className="w-full max-w-sm space-y-2 rounded-xl border border-black/20 p-4 text-xs">
            <div className="flex justify-between gap-4">
              <span>جمع کالاها</span>

              <strong>{formatNumber(totals.subtotal)} تومان</strong>
            </div>

            <div className="flex justify-between gap-4">
              <span>تخفیف</span>

              <strong>{formatNumber(totals.discount)} تومان</strong>
            </div>

            <div className="flex justify-between gap-4">
              <span>مبلغ پس از تخفیف</span>

              <strong>{formatNumber(totals.afterDiscount)} تومان</strong>
            </div>

            {invoice.taxRate > 0 && (
              <div className="flex justify-between gap-4">
                <span>
                  مالیات ({invoice.taxRate}
                  ٪)
                </span>

                <strong>{formatNumber(taxAmount)} تومان</strong>
              </div>
            )}

            <div className="my-2 border-t border-black/20" />

            <div className="flex justify-between gap-4 text-sm">
              <span className="font-bold">مبلغ قابل پرداخت</span>

              <strong>{formatNumber(finalTotal)} تومان</strong>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="border-t border-black/20 p-4 sm:p-6">
            <h3 className="mb-2 text-xs font-bold">توضیحات</h3>

            <p className="whitespace-pre-wrap wrap-break text-xs leading-6 text-black/60">
              {invoice.notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-black/20 px-4 py-4 text-center text-[10px] text-black/50">
          این فاکتور توسط ابزار فاکتور ساز جعبه‌ابزار ایجاد شده است.
        </div>
      </div>
    </div>
  );
}
