import getAllVendors from "@/data/vendor";

export const baseUrl = "https://hydranode.ai";

let routes = [
  "",
  "/",
  "/pricing",
  "/about-us",
  "/reward",
  "/token",
  "/exam",
  "/vendors",
  "/login",
  "/signup",
  "/product",
  "/settings",
];

export default async function sitemap() {
  let vendorRoutes = [];

  let vendors = await getAllVendors();

  if (!vendors) {
    vendorRoutes = [null];
  } else {
    vendorRoutes = vendors.map((e) => {
      return {
        url: `${baseUrl}/vendors/${e.slug}`,
        lastModified: e.updatedAt,
      };
    });
  }

  routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...vendorRoutes];
}
