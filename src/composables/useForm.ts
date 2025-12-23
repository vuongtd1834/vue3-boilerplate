import { toTypedSchema } from "@vee-validate/zod";
import { useForm as useVeeForm } from "vee-validate";
import { z } from "zod";

// Example usage with zod validation
export function useForm<T extends z.ZodTypeAny>(schema: T) {
  return useVeeForm({
    validationSchema: toTypedSchema(schema),
  });
}
