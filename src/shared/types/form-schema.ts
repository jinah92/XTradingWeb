import type { CommentSchema, FeedSchema, IdeaSchema } from '@/shared/consts';
import type { z } from 'zod';

export type IdeaData = z.infer<typeof IdeaSchema>;
export type FeedData = z.infer<typeof FeedSchema>;
export type CommentData = z.infer<typeof CommentSchema>;
