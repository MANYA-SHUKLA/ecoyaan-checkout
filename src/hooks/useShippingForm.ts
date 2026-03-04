"use client";

import { useState, useCallback } from "react";
import type { ShippingAddress } from "@/types/checkout";
import {
  validateShippingAddress,
  validateShippingField,
  type ShippingFormErrors,
  type ShippingField,
} from "@/lib/validators";

export type { ShippingField };

const INITIAL_FORM: ShippingAddress = {
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
};

export function useShippingForm(initial: Partial<ShippingAddress> = {}) {
  const [form, setForm] = useState<ShippingAddress>({ ...INITIAL_FORM, ...initial });
  const [errors, setErrors] = useState<ShippingFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ShippingField, boolean>>>({});

  const setValue = useCallback((field: keyof ShippingAddress, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const blurField = useCallback((field: ShippingField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setForm((current) => {
      const value = (current[field] ?? "") as string;
      const error = validateShippingField(field, value);
      setErrors((prev) =>
        error ? { ...prev, [field]: error } : { ...prev, [field]: undefined }
      );
      return current;
    });
  }, []);

  const validateAll = useCallback((): boolean => {
    const nextErrors = validateShippingAddress(form as unknown as Record<string, string>);
    setErrors(nextErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      pinCode: true,
      city: true,
      state: true,
    });
    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const getFieldError = useCallback(
    (field: ShippingField) => (touched[field] ? errors[field] : undefined),
    [errors, touched]
  );

  return {
    form,
    setValue,
    errors,
    touched,
    blurField,
    validateAll,
    getFieldError,
    setForm,
  };
}
