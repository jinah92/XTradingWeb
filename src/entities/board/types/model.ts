import type { Feed, Idea } from './schema';

interface Tags {
  tagId: string;
  tagName: string;
}

interface Coin {
  coinId: string;
  code: string;
  name: string;
  imgUrl: string | null;
}

export interface IdeaStatus {
  isBlock: boolean;
  isLike: boolean;
  isFollowed: boolean;
}

export interface IdeaModelImpl {
  get id(): Idea['boardId'];
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
  get profileImage(): Idea['cretProfileImg'];
}

export interface FeedModelImpl {
  get id(): Feed['feedId'];
  get title(): Feed['subject'];
  get content(): Feed['contents'];
  get coin(): Coin;
  get userName(): string;
  get userGrade(): Feed['createdByUserGrade'];
  get createdDate(): Feed['createdDatetime'];
  get profileImage(): Feed['createdByProfilePicUrl'];
  get viewCount(): Feed['viewCount'];
  get commentCount(): Feed['commentCount'];
  get likeCount(): Feed['likeCount'];
  get tags(): Tags[];
  get status(): IdeaStatus;
}
