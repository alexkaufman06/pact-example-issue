import { ServerTagsEnum } from "./server-tags";

export interface HttpOptions {
  callbacks: any;
  headers: any;
  queryParameters?: Record<string, string>;
  tags?: Array<ServerTagsEnum>;
}
