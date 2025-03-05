import type { UserGrade } from '../../member/types';
import type { ISODateString } from '@/app/const/common';
import type { PaginationResponse } from '@/shared';

export interface Board {
  commentCount: number;
  likeCount: number;
  contents: string;
  cretId: string;
  subject: string;
  tagList: string[];
  viewCount: number;
  youAreFollowing: boolean;
  youBlock: boolean;
  youLike: boolean;
}

export interface Idea extends Board {
  boardId: string;
  cretDatetime: ISODateString;
  cretName: string;
  cretProfileImg: string;
  cretUserGrade: UserGrade;
  heroImgUrl: string | null;
}

export interface Feed extends Board {
  feedId: string;
  coinCode: string;
  coinId: string;
  coinImgUrl: string | null;
  coinName: string;
  createdByName: string;
  createdByProfilePicUrl: string;
  createdByUserGrade: UserGrade;
  createdDatetime: ISODateString;
}

export interface IdeaListResponse extends PaginationResponse {
  boardList: Idea[];
}

export interface FeedListResponse extends PaginationResponse {
  feedList: Feed[];
}
