import { getPlaiceholder } from "plaiceholder";

export const getPlaceholderForRemoteImage = async (url: string) => {
  try {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error("Image not found");
    }
    let buffer = await res.arrayBuffer();
    let { base64 } = await getPlaiceholder(Buffer.from(buffer));
    console.log(base64);
    return base64;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      console.log(error.stack, error.message);
    }
  }
};
