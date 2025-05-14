import { z } from "zod";

const StripeBodySchema = z.object({
  priceId: z.enum(["price_basic", "price_pro", "price_lifetime"]), // whitelist
  mode: z.union([z.literal("subscription"), z.literal("payment")]),
  trialPeriodDays: z.number().int().positive().max(30).optional(), // business rule
  isLifetime: z.boolean().optional(),
});

export default StripeBodySchema;
