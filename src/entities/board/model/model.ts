import { v4 as uuid } from 'uuid';

import type { Idea, IdeaModelImpl } from './../types';

export class IdeaModel implements IdeaModelImpl {
  constructor(private readonly rawdata: Idea) {}

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
}
