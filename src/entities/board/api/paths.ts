const ideaPrefix = {
  v1: '/api/boards',
} as const;

const feedPrefix = {
  v1: '/api/feeds',
} as const;

export const boardPaths = {
  ideas: `${ideaPrefix.v1}`,
  feeds: `${feedPrefix.v1}`,
} as const;
