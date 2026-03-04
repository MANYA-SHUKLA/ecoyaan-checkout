const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;
const PIN_REGEX = /^\d{6}$/;

export interface ShippingFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  city?: string;
  state?: string;
}

export type ShippingField = keyof ShippingFormErrors;

function validateField(
  field: ShippingField,
  value: string
): string | undefined {
  const trimmed = value.trim();
  switch (field) {
    case "fullName":
      return !trimmed ? "Full name is required" : undefined;
    case "email":
      if (!trimmed) return "Email is required";
      return !EMAIL_REGEX.test(trimmed)
        ? "Please enter a valid email address"
        : undefined;
    case "phone":
      if (!trimmed) return "Phone number is required";
      return !PHONE_REGEX.test(trimmed.replace(/\s/g, ""))
        ? "Phone must be 10 digits"
        : undefined;
    case "pinCode":
      if (!trimmed) return "PIN code is required";
      return !PIN_REGEX.test(trimmed) ? "PIN code must be 6 digits" : undefined;
    case "city":
      return !trimmed ? "City is required" : undefined;
    case "state":
      return !trimmed ? "State is required" : undefined;
    default:
      return undefined;
  }
}

export function validateShippingAddress(
  data: Record<string, string>
): ShippingFormErrors {
  const errors: ShippingFormErrors = {};
  (Object.keys(data) as ShippingField[]).forEach((key) => {
    const err = validateField(key, data[key] ?? "");
    if (err) errors[key] = err;
  });
  return errors;
}

export function validateShippingField(
  field: ShippingField,
  value: string
): string | undefined {
  return validateField(field, value);
}
