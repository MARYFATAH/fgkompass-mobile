import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const buildImageUrl = (source, { width, height } = {}) => {
  if (!source) return null;

  let img = urlFor(source).auto("format");

  if (width) img = img.width(width);
  if (height) img = img.height(height);

  return img.fit("clip").quality(80).url();
};
