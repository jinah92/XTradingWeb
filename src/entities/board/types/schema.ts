import type { UserGrade } from '../../member/types';
import type { ISODateString } from '@/app/const/common';
import type { PaginationResponse } from '@/shared';

type DeletedStatus = 'Y' | 'N';

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

export interface CreateBoardRequest {
  subject: string;
  contents: string;
  tagList: string[];
}

export interface CreateFeedRequest extends CreateBoardRequest {
  code: string;
}

export interface CreatedBoardResponse {
  boardId: string;
  heroImgUrl: string | null;
  subject: string;
  contents: string;
  deleted: DeletedStatus;
  createdBy: string;
  cretDatetime: ISODateString;
  updatedBy: string;
  modDatetime: ISODateString;
}

export interface CreatedFeedResponse extends Omit<CreatedBoardResponse, 'boardId' | 'heroImgUrl'> {
  feedId: string;
  coinCode: string;
}
