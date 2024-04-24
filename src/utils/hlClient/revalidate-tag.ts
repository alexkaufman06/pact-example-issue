import { revalidateTag as _revalidateTag } from "next/cache";
import { ServerTagsEnum } from "./(types)/server-tags";
export const revalidateTag = (tag: ServerTagsEnum) => {
  _revalidateTag(tag);
};
