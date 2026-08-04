"use client";

import * as React from "react";
import { Loader2Icon, SendIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const fieldWrap = "flex flex-col gap-2";
const labelCls = "text-xs font-semibold tracking-wider text-muted-foreground uppercase";

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
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldWrap}>
          <Label htmlFor="fullName" className={labelCls}>
            Full name
          </Label>
          <Input id="fullName" name="fullName" required placeholder="Jane Doe" />
        </div>
        <div className={fieldWrap}>
          <Label htmlFor="company" className={labelCls}>
            Company
          </Label>
          <Input id="company" name="company" placeholder="Acme Imports Ltd." />
        </div>
        <div className={fieldWrap}>
          <Label htmlFor="country" className={labelCls}>
            Country
          </Label>
          <Input id="country" name="country" placeholder="United States" />
        </div>
        <div className={fieldWrap}>
          <Label htmlFor="email" className={labelCls}>
            Email
          </Label>
          <Input id="email" name="email" type="email" required placeholder="you@company.com" />
        </div>
        <div className={fieldWrap}>
          <Label htmlFor="product" className={labelCls}>
            Product interest
          </Label>
          <NativeSelect
            id="product"
            name="product"
            defaultValue="Cilembu Sweet Potato"
            className="w-full [&>select]:w-full"
          >
            <NativeSelectOption>Cilembu Sweet Potato</NativeSelectOption>
            <NativeSelectOption>Purple Sweet Potato</NativeSelectOption>
            <NativeSelectOption>Murasaki Sweet Potato</NativeSelectOption>
            <NativeSelectOption>Mixed varieties</NativeSelectOption>
          </NativeSelect>
        </div>
        <div className={fieldWrap}>
          <Label htmlFor="quantity" className={labelCls}>
            Quantity
          </Label>
          <Input id="quantity" name="quantity" placeholder="e.g. 2× 40ft containers / month" />
        </div>
      </div>

      <div className={fieldWrap}>
        <Label htmlFor="message" className={labelCls}>
          Message (optional)
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your target market, specs, or shipping terms."
        />
      </div>

      <Button type="submit" variant="brand" size="lg" disabled={loading} className={cn("mt-1 w-full sm:w-auto")}>
        {loading ? <Loader2Icon className="animate-spin" /> : <SendIcon data-icon="inline-start" />}
        {loading ? "Sending…" : "Send Request"}
      </Button>
    </form>
  );
}
