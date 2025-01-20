import axiosInstance from '@/configs/axios/axiosConfig';
import { useAuth } from '@/router/AuthContext';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export interface BoardData {
  boardId: string;
  heroImgUrl: string;
  subject: string;
  contents: string;
  cretName: string;
  cretUserGrade: string;
  cretDatetime: string;
  cretId: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tagList: string[];
  youLike: boolean;
  youBlock: boolean;
  youAreFollowing: boolean;
}

export type ListReq = {
  page: number;
  pageSize: number;
  keyword?: string;
  code?: string;
  type?: string;
};

export type BoardAddReq = {
  subject: string;
  contents: string;
  tagList: string[] | null;
};

export type BoardModifyReq = {
  boardId: string;
  subject: string;
  contents: string;
  tagList: string[] | null;
};

export type BoardDetail = {
  cretInfo: {
    userId: string;
    name: string;
    profileImg: string;
    userGrade: string;
    youAreFollowing: boolean;
  };
  boardId: string;
  heroImgUrl: string;
  subject: string;
  contents: string;
  cretDatetime: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tagList: string[];
  youCreate: boolean;
  youLike: boolean;
  youBlock: boolean;
};

// 아이디어 조회 API
export const useIdeaList = () => {
  const ideaListApi = async (param: ListReq) => {
    try {
      const response = await axiosInstance.get(`/api/boards`, {
        params: param,
      });
      return response.data.result.boardList;
    } catch (error) {
      console.error('데이터 요청 오류:', error);
      throw error;
    }
  };

  return {
    ideaListApi,
  };
};

// 아이디어 추가 API
export const useIdeaAdd = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const ideaAddApi = async (param: BoardAddReq) => {
    try {
      // 로그인 안했을 경우 로그인 화면으로 이동
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      if (param.contents == '') {
        toast({ description: '내용을 입력해주세요.', duration: 2000 });
      }
      if (param.subject == '') {
        toast({ description: '제목을 입력해주세요.', duration: 2000 });
      }
      /* 태그는 validation 체크 안함 */

      await axiosInstance.post(`/api/boards`, param);

      toast({
        description: '아이디어 등록되었습니다.',
        duration: 2000,
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.result?.message || '아이디어 등록 중 오류가 발생했습니다.';
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: '예기치 못한 오류가 발생했습니다.',
          duration: 2000,
        });
      }
      console.error('오류:', error);
      return false;
    }
  };

  return {
    ideaAddApi,
  };
};

// 좋아요 토글 API
export const useIdeaLikeToggle = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const ideaLikeToggleApi = async (boardId: string) => {
    try {
      // 로그인 안했을 경우 로그인 화면으로 이동
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      await axiosInstance.post(`/api/boards/toggle-like`, { boardId: boardId });
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.result?.message || '좋아요 중 오류가 발생했습니다.';
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: '예기치 못한 오류가 발생했습니다.',
          duration: 2000,
        });
      }
      console.error('오류:', error);
      return false;
    }
  };

  return {
    ideaLikeToggleApi,
  };
};

// 아이디어 상세 조회 API
export const useIdeaDetail = () => {
  const { toast } = useToast();
  const [detailData, setDetailData] = useState<BoardDetail>();
  const ideaDetailApi = async (boardId: string) => {
    try {
      const response = await axiosInstance.get(`/api/boards/` + boardId);
      setDetailData(response.data.result);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.result?.message || '상세 조회 중 오류가 발생했습니다.';
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: '예기치 못한 오류가 발생했습니다.',
          duration: 2000,
        });
      }
      console.error('오류:', error);
      return false;
    }
  };

  return {
    ideaDetailApi,
    detailData,
  };
};

// 아이디어 삭제 API
export const useIdeaDelete = () => {
  const { toast } = useToast();
  const ideaDeleteApi = async (boardId: string) => {
    try {
      await axiosInstance.delete(`/api/boards/` + boardId);
      toast({
        description: '삭제되었습니다.',
        duration: 2000,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.result?.message || '이슈 삭제 중 오류가 발생했습니다.';
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: '예기치 못한 오류가 발생했습니다.',
          duration: 2000,
        });
      }
      console.error('오류:', error);
      return false;
    }
  };

  return {
    ideaDeleteApi,
  };
};

// 아이디어 수정 API
export const useIdeaModify = () => {
  const { toast } = useToast();
  const ideaModifyApi = async (param: BoardModifyReq) => {
    try {
      if (param.contents == '') {
        toast({ description: '내용을 입력해주세요.', duration: 2000 });
      }
      if (param.subject == '') {
        toast({ description: '제목을 입력해주세요.', duration: 2000 });
      }
      /* 태그는 validation 체크 안함 */

      await axiosInstance.put(`/api/boards`, param);

      toast({
        description: '아이디어 수정되었습니다.',
        duration: 2000,
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.result?.message || '아이디어 수정 중 오류가 발생했습니다.';
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: '예기치 못한 오류가 발생했습니다.',
          duration: 2000,
        });
      }
      console.error('오류:', error);
      return false;
    }
  };

  return {
    ideaModifyApi,
  };
};

// 게시물 차단 토글 API
export const useIdeaBlockToggle = () => {
  const { toast } = useToast();
  const ideaBlockToggleApi = async (boardId: string) => {
    try {
      await axiosInstance.post(`/api/boards/toggle-block`, { boardId: boardId });
      toast({
        description: '게시글 차단 되었습니다.',
        duration: 2000,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.result?.message || '차단 작업 중 오류가 발생했습니다.';
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: '예기치 못한 오류가 발생했습니다.',
          duration: 2000,
        });
      }
      console.error('오류:', error);
      return false;
    }
  };

  return {
    ideaBlockToggleApi,
  };
};
