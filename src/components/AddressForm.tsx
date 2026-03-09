"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema, type ShippingAddressSchema } from "@/lib/schemas/addressSchema";
import { FloatingLabelField } from "@/components/ui/FloatingLabelField";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
const FIELDS: {
  name: keyof ShippingAddressSchema;
  label: string;
  type: string;
  autoComplete: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}[] = [
  { name: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    autoComplete: "tel",
    maxLength: 10,
    inputMode: "numeric",
  },
  {
    name: "pinCode",
    label: "PIN Code",
    type: "text",
    autoComplete: "postal-code",
    maxLength: 6,
    inputMode: "numeric",
  },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2" },
  { name: "state", label: "State", type: "text", autoComplete: "address-level1" },
];

interface AddressFormProps {
  initialValues?: Partial<ShippingAddressSchema>;
  onSubmit: (values: ShippingAddressSchema) => void;
  onBack?: () => void;
  submitLabel?: string;
  backLabel?: string;
}

export function AddressForm({
  initialValues,
  onSubmit,
  onBack,
  submitLabel = "Continue to Payment",
  backLabel = "Back to Cart",
}: AddressFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: initialValues?.fullName ?? "",
      email: initialValues?.email ?? "",
      phone: initialValues?.phone ?? "",
      pinCode: initialValues?.pinCode ?? "",
      city: initialValues?.city ?? "",
      state: initialValues?.state ?? "",
    },
    mode: "onBlur",
  });

  const pinCode = watch("pinCode");

  useEffect(() => {
    const code = pinCode?.trim().replace(/\D/g, "");
    if (!code || code.length !== 6) return;
    let cancelled = false;
    fetch(`/api/pincode?code=${encodeURIComponent(code)}`)
      .then((res) => res.json())
      .then((data: { city: string | null; state: string | null }) => {
        if (cancelled || (!data.city && !data.state)) return;
        setValue("city", data.city ?? "");
        setValue("state", data.state ?? "");
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pinCode, setValue]);

  return (
    <section
      className="card-hover min-w-0 rounded-2xl border border-ecoyaan-sage/40 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-soft-hover dark:border-slate-600/50 dark:bg-slate-800/90 sm:p-5 md:p-7"
      role="form"
      aria-label="Shipping address"
    >
      <h2 className="mb-4 text-lg font-semibold text-stone-800 dark:text-slate-100 sm:mb-6 sm:text-xl">
        Shipping Address
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
        noValidate
      >
        {FIELDS.slice(0, 4).map(({ name, label, type, autoComplete, maxLength, inputMode }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <FloatingLabelField
                id={name}
                label={label}
                type={type}
                autoComplete={autoComplete}
                maxLength={maxLength}
                inputMode={inputMode}
                error={errors[name]?.message}
                {...field}
              />
            )}
          />
        ))}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {FIELDS.slice(4).map(({ name, label, type, autoComplete }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <FloatingLabelField
                  id={name}
                  label={label}
                  type={type}
                  autoComplete={autoComplete}
                  error={errors[name]?.message}
                  {...field}
                />
              )}
            />
          ))}
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-ecoyaan-sage/50 pt-5 dark:border-slate-600 sm:flex-row sm:justify-between sm:pt-6">
          {onBack && (
            <AnimatedButton
              variant="secondary"
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto"
              aria-label={backLabel}
            >
              {backLabel}
            </AnimatedButton>
          )}
          <AnimatedButton
            type="submit"
            variant="primary"
            className="w-full sm:w-auto"
            aria-label={submitLabel}
          >
            {submitLabel}
          </AnimatedButton>
        </div>
      </form>
    </section>
  );
}
