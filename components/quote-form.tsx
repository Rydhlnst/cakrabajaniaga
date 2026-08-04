"use client";

import * as React from "react";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20";
const labelTextCls = "text-sm font-medium text-stone-700";

export function QuoteForm() {
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Request sent", {
        description: "Our export team will respond within one business day.",
      });
      form.reset();
    } catch {
      toast.error("Something went wrong", {
        description: "Please reach us on WhatsApp or email instead.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="flex flex-col gap-2">
        <span className={labelTextCls}>Full name</span>
        <input name="fullName" required className={inputCls} placeholder="Your name" />
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelTextCls}>Company</span>
        <input name="company" required className={inputCls} placeholder="Company name" />
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelTextCls}>Country</span>
        <input name="country" required className={inputCls} placeholder="Destination country" />
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelTextCls}>Email</span>
        <input name="email" required type="email" className={inputCls} placeholder="you@company.com" />
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelTextCls}>Product interest</span>
        <select name="product" className={inputCls} defaultValue="Cilembu Sweet Potato">
          <option>Cilembu Sweet Potato</option>
          <option>Purple Sweet Potato</option>
          <option>Murasaki Sweet Potato</option>
          <option>Mixed varieties</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelTextCls}>Quantity</span>
        <input name="quantity" className={inputCls} placeholder="e.g. 2 x 40ft container" />
      </label>
      <div className="sm:col-span-2">
        <label className="flex flex-col gap-2">
          <span className={labelTextCls}>Message (optional)</span>
          <textarea
            name="message"
            rows={3}
            className={inputCls}
            placeholder="Tell us about your requirements, target market, or timeline."
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-stone-700 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2Icon className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send Request <ArrowRightIcon className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}
