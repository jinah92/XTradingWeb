import { v4 as uuid } from 'uuid';

import type { Feed, FeedModelImpl, Idea, IdeaModelImpl, IdeaStatus } from './../types';

export class IdeaModel implements IdeaModelImpl {
  constructor(private readonly rawdata: Idea) {}

  get id() {
    return this.rawdata.boardId;
  }

  get title() {
    return this.rawdata.subject;
  }
  get content() {
    return this.rawdata.contents;
  }
  get createdDate() {
    return this.rawdata.cretDatetime.replace(/\./g, '-'); // "2024.10.30T00:39:04" -> "2024-10-30T00:39:04"
  }
  get userName() {
    return this.rawdata.cretName;
  }
  get userGrade() {
    return this.rawdata.cretUserGrade;
  }
  get viewCount() {
    return this.rawdata.viewCount;
  }
  get commentCount() {
    return this.rawdata.commentCount;
  }
  get likeCount() {
    return this.rawdata.likeCount;
  }
  get tags() {
    return this.rawdata.tagList.map(tag => ({ tagId: uuid(), tagName: `#${tag}` }));
  }
  get status() {
    return {
      isBlock: this.rawdata.youBlock,
      isLike: this.rawdata.youLike,
      isFollowed: this.rawdata.youAreFollowing,
    };
  }
  get profileImage() {
    return this.rawdata.cretProfileImg;
  }
}

export class FeedModel implements FeedModelImpl {
  constructor(private readonly rawdata: Feed) {}

  get id() {
    return this.rawdata.feedId;
  }
  get coin() {
    return {
      coinId: this.rawdata.coinId,
      code: this.rawdata.coinCode,
      name: this.rawdata.coinName,
      imgUrl: this.rawdata.coinImgUrl,
    };
  }
  get userName() {
    return this.rawdata.createdByName;
  }
  get userGrade() {
    return this.rawdata.createdByUserGrade;
  }
  get createdDate() {
    return this.rawdata.createdDatetime;
  }
  get profileImage() {
    return this.rawdata.createdByProfilePicUrl;
  }
  get title(): string {
    return this.rawdata.subject;
  }
  get content(): string {
    return this.rawdata.contents;
  }
  get viewCount(): number {
    return this.rawdata.viewCount;
  }
  get commentCount(): number {
    return this.rawdata.commentCount;
  }
  get likeCount(): number {
    return this.rawdata.likeCount;
  }
  get tags() {
    return this.rawdata.tagList.map(tag => ({ tagId: uuid(), tagName: `#${tag}` }));
  }
  get status(): IdeaStatus {
    return {
      isBlock: this.rawdata.youBlock,
      isLike: this.rawdata.youLike,
      isFollowed: this.rawdata.youAreFollowing,
    };
  }
}
