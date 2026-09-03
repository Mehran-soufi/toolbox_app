"use client";

import {
  CalendarDays,
  Plus,
  Save,
  Store,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  useRef,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  InvoiceData,
  InvoiceItem,
  SellerDefaults,
} from "@/lib/invoice-maker-types";

type InvoiceFormProps = {
  invoice: InvoiceData;
  sellerDefaults: SellerDefaults;

  updateInvoice: (
    updates: Partial<InvoiceData>
  ) => void;

  saveSellerDefaults: (
    defaults: SellerDefaults
  ) => void;

  deleteSellerDefaults: () => void;
};

const toEnglishDigits = (
  value: string
) => {
  return value
    .replace(/[۰-۹]/g, (digit) =>
      String(
        "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)
      )
    )
    .replace(/[٠-٩]/g, (digit) =>
      String(
        "٠١٢٣٤٥٦٧٨٩".indexOf(digit)
      )
    );
};

const parseNumber = (
  value: string
) => {
  const normalized =
    toEnglishDigits(value).replace(
      /,/g,
      ""
    );

  const number = Number(normalized);

  return Number.isFinite(number)
    ? number
    : 0;
};

export default function InvoiceForm({
  invoice,
  sellerDefaults,
  updateInvoice,
  saveSellerDefaults,
  deleteSellerDefaults,
}: InvoiceFormProps) {
  const itemTitleRefs = useRef<
    Record<
      string,
      HTMLInputElement | null
    >
  >({});

  const updateItem = (
    id: string,
    updates: Partial<InvoiceItem>
  ) => {
    updateInvoice({
      items: invoice.items.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                ...updates,
              }
            : item
      ),
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      title: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
    };

    updateInvoice({
      items: [
        ...invoice.items,
        newItem,
      ],
    });

    setTimeout(() => {
      itemTitleRefs.current[
        newItem.id
      ]?.focus();
    }, 50);
  };

  const removeItem = (
    id: string
  ) => {
    if (invoice.items.length === 1) {
      return;
    }

    delete itemTitleRefs.current[id];

    updateInvoice({
      items: invoice.items.filter(
        (item) => item.id !== id
      ),
    });
  };

  const saveSeller = () => {
    saveSellerDefaults({
      sellerName:
        invoice.sellerName.trim(),
      sellerPhone:
        invoice.sellerPhone.trim(),
      sellerAddress:
        invoice.sellerAddress.trim(),
    });
  };

  const loadSellerDefaults = () => {
    updateInvoice({
      sellerName:
        sellerDefaults.sellerName,
      sellerPhone:
        sellerDefaults.sellerPhone,
      sellerAddress:
        sellerDefaults.sellerAddress,
    });
  };

  const hasSavedSeller =
    Boolean(
      sellerDefaults.sellerName ||
        sellerDefaults.sellerPhone ||
        sellerDefaults.sellerAddress
    );

  return (
    <div className="space-y-5 rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
      {/* Invoice info */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <CalendarDays className="size-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              اطلاعات فاکتور
            </h3>

            <p className="text-xs text-muted-foreground">
              شماره و تاریخ فاکتور
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              شماره فاکتور
            </label>

            <Input
              value={
                invoice.invoiceNumber
              }
              onChange={(event) =>
                updateInvoice({
                  invoiceNumber:
                    event.target.value,
                })
              }
              placeholder="1001"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              تاریخ
            </label>

            <Input
              value={invoice.date}
              onChange={(event) =>
                updateInvoice({
                  date:
                    event.target.value,
                })
              }
              placeholder="۱۴۰۵/۰۶/۱۱"
            />
          </div>
        </div>
      </section>

      {/* Seller */}
      <section className="space-y-4 rounded-xl border bg-background/40 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
              <Store className="size-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                اطلاعات فروشنده
              </h3>

              <p className="text-[11px] text-muted-foreground">
                این اطلاعات را می‌توانید برای دفعات بعد ذخیره کنید.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {hasSavedSeller && (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={
                    loadSellerDefaults
                  }
                >
                  استفاده از اطلاعات ذخیره‌شده
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={
                    deleteSellerDefaults
                  }
                >
                  حذف ذخیره‌شده
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">
              نام فروشنده / کسب‌وکار
            </label>

            <Input
              value={
                invoice.sellerName
              }
              onChange={(event) =>
                updateInvoice({
                  sellerName:
                    event.target.value,
                })
              }
              placeholder="مثلاً فروشگاه مهران"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              شماره تماس
            </label>

            <Input
              value={
                invoice.sellerPhone
              }
              onChange={(event) =>
                updateInvoice({
                  sellerPhone:
                    event.target.value,
                })
              }
              placeholder="۰۹۱۲۱۲۳۴۵۶۷"
              dir="ltr"
              inputMode="tel"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">
              آدرس
            </label>

            <Textarea
              value={
                invoice.sellerAddress
              }
              onChange={(event) =>
                updateInvoice({
                  sellerAddress:
                    event.target.value,
                })
              }
              placeholder="آدرس فروشنده"
              rows={2}
            />
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={saveSeller}
          className="w-full sm:w-auto"
        >
          <Save className="size-4" />
          ذخیره اطلاعات فروشنده
        </Button>
      </section>

      {/* Customer */}
      <section className="space-y-4 rounded-xl border bg-background/40 p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
            <UserRound className="size-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              اطلاعات مشتری
            </h3>

            <p className="text-[11px] text-muted-foreground">
              اطلاعات مشتری فقط در همین فاکتور استفاده می‌شود.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">
              نام مشتری
            </label>

            <Input
              value={
                invoice.customerName
              }
              onChange={(event) =>
                updateInvoice({
                  customerName:
                    event.target.value,
                })
              }
              placeholder="نام مشتری"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              شماره تماس
            </label>

            <Input
              value={
                invoice.customerPhone
              }
              onChange={(event) =>
                updateInvoice({
                  customerPhone:
                    event.target.value,
                })
              }
              placeholder="۰۹۱۲۱۲۳۴۵۶۷"
              dir="ltr"
              inputMode="tel"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">
              آدرس
            </label>

            <Textarea
              value={
                invoice.customerAddress
              }
              onChange={(event) =>
                updateInvoice({
                  customerAddress:
                    event.target.value,
                })
              }
              placeholder="آدرس مشتری"
              rows={2}
            />
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold">
              کالا / خدمات
            </h3>

            <p className="text-xs text-muted-foreground">
              اقلام موجود در فاکتور را وارد کنید.
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addItem}
            className="w-full sm:w-auto"
          >
            <Plus className="size-4" />
            افزودن کالا
          </Button>
        </div>

        <div className="space-y-3">
          {invoice.items.map(
            (item, index) => (
              <div
                key={item.id}
                className="rounded-xl border bg-background/40 p-3 sm:p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    ردیف {index + 1}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive"
                    onClick={() =>
                      removeItem(
                        item.id
                      )
                    }
                    disabled={
                      invoice.items
                        .length === 1
                    }
                    title="حذف ردیف"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2 sm:col-span-2 lg:col-span-4">
                    <label className="text-xs font-medium">
                      نام کالا / خدمت
                    </label>

                    <Input
                      ref={(element) => {
                        itemTitleRefs.current[
                          item.id
                        ] = element;
                      }}
                      value={
                        item.title
                      }
                      onChange={(
                        event
                      ) =>
                        updateItem(
                          item.id,
                          {
                            title:
                              event
                                .target
                                .value,
                          }
                        )
                      }
                      placeholder="مثلاً طراحی سایت"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium">
                      تعداد
                    </label>

                    <Input
                      value={
                        item.quantity
                      }
                      onChange={(
                        event
                      ) =>
                        updateItem(
                          item.id,
                          {
                            quantity:
                              Math.max(
                                0,
                                parseNumber(
                                  event
                                    .target
                                    .value
                                )
                              ),
                          }
                        )
                      }
                      inputMode="decimal"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium">
                      قیمت واحد
                    </label>

                    <Input
                      value={
                        item.unitPrice ||
                        ""
                      }
                      onChange={(
                        event
                      ) =>
                        updateItem(
                          item.id,
                          {
                            unitPrice:
                              Math.max(
                                0,
                                parseNumber(
                                  event
                                    .target
                                    .value
                                )
                              ),
                          }
                        )
                      }
                      placeholder="۰"
                      inputMode="numeric"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium">
                      تخفیف
                    </label>

                    <Input
                      value={
                        item.discount ||
                        ""
                      }
                      onChange={(
                        event
                      ) =>
                        updateItem(
                          item.id,
                          {
                            discount:
                              Math.min(
                                100,
                                Math.max(
                                  0,
                                  parseNumber(
                                    event
                                      .target
                                      .value
                                  )
                                )
                              ),
                          }
                        )
                      }
                      placeholder="۰"
                      inputMode="numeric"
                      dir="ltr"
                    />

                    <p className="text-[11px] text-muted-foreground">
                      درصد
                    </p>
                  </div>

                  <div className="flex items-end">
                    <div className="w-full rounded-lg bg-muted/50 px-3 py-2.5 text-xs">
                      <span className="text-muted-foreground">
                        مبلغ پس از تخفیف
                      </span>

                      <div className="mt-1 font-semibold">
                        {new Intl.NumberFormat(
                          "fa-IR"
                        ).format(
                          Math.round(
                            item.quantity *
                              item.unitPrice *
                              (1 -
                                item.discount /
                                  100)
                          )
                        )}{" "}
                        تومان
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Tax */}
      <section className="space-y-3 rounded-xl border bg-background/40 p-4">
        <div>
          <h3 className="text-sm font-semibold">
            مالیات و عوارض
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            درصد مالیات روی مبلغ پس از تخفیف محاسبه می‌شود.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="w-full space-y-2 sm:max-w-xs">
            <label className="text-xs font-medium">
              نرخ مالیات
            </label>

            <div className="relative">
              <Input
                value={
                  invoice.taxRate || ""
                }
                onChange={(event) =>
                  updateInvoice({
                    taxRate:
                      Math.min(
                        100,
                        Math.max(
                          0,
                          parseNumber(
                            event
                              .target
                              .value
                          )
                        )
                      ),
                  })
                }
                placeholder="۰"
                inputMode="numeric"
                dir="ltr"
                className="pl-10"
              />

              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ٪
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-2">
        <label className="text-sm font-medium">
          توضیحات / یادداشت
        </label>

        <Textarea
          value={invoice.notes}
          onChange={(event) =>
            updateInvoice({
              notes:
                event.target.value,
            })
          }
          placeholder="توضیحات اضافی فاکتور..."
          rows={3}
        />
      </section>
    </div>
  );
}