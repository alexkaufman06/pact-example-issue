export const ServerTags = {
  incidentsDashboard: "incidents dashboard",
} as const;

export type ServerTagsEnum = (typeof ServerTags)[keyof typeof ServerTags];
