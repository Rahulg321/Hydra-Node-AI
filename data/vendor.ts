import db from "@/lib/db";

export default async function getAllVendors() {
  try {
    const vendors = await db.vendor.findMany();

    return vendors;
  } catch (error) {
    console.log("an error occured while trying to fetch vendors", error);
    return null;
  }
}
