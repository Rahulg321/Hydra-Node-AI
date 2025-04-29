import { z } from "zod";

// Define the schema for the login form
// export const ConnectWalletFormSchema = z.object({
//   walletAddress: z.string({ message: "name is required" }).min(3).max(20),
// });

export const ConnectWalletFormSchema = z.object({
  walletAddress: z
    .string({ message: "Wallet address is required" })
    .min(26, { message: "Wallet address must be at least 26 characters long" }) // Ethereum addresses are usually 42 characters, Bitcoin addresses vary
    .max(42, { message: "Wallet address cannot exceed 42 characters" }) // Adjust as per your blockchain needs
    .regex(/^0x[a-fA-F0-9]{40}$/, {
      message: "Invalid Ethereum wallet address format",
    }), // Example for Ethereum
});

// Define the TypeScript type for the login form data
export type ConnectWalletFormZodType = z.infer<typeof ConnectWalletFormSchema>;
