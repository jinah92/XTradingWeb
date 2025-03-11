import { z } from 'zod';

export const IdeaSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const FeedSchema = z.object({
  // code: z.string(),
  title: z.string(),
  content: z.string(),
});

export const CommentSchema = z.object({
  content: z.string(),
});
