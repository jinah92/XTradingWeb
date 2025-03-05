import type { Idea } from './schema';

interface Tags {
  tagId: string;
  tagName: string;
}

export interface IdeaStatus {
  isBlock: boolean;
  isLike: boolean;
  isFollowed: boolean;
}

export interface IdeaModelImpl {
  get title(): Idea['subject'];
  get content(): Idea['contents'];
  get createdDate(): Idea['cretDatetime'];
  get userName(): Idea['cretName'];
  get userGrade(): Idea['cretUserGrade'];
  get viewCount(): Idea['viewCount'];
  get commentCount(): Idea['commentCount'];
  get likeCount(): Idea['likeCount'];
  get tags(): Tags[];
  get status(): IdeaStatus;
}
