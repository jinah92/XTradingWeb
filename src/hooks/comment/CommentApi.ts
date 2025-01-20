import axiosInstance from '@/configs/axios/axiosConfig';
import { useAuth } from '@/router/AuthContext';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type CommentAddReq = {
  targetType: string;
  targetId: string;
  contents: string;
};

export type CommentListRes = {
  commentId: string;
  targetId: string;
  targetType: string;
  contents: string;
  cretDatetime: string;
  createdBy: string;
  createdByName: string;
  createdByUserGrade: string;
  createdByProfilePicUrl: string;
  likeCount: number;
  replyList: Reply[];
  youCreate: boolean;
  youLiked: boolean;
  youBlock: boolean;
};

export type Reply = {
  commentId: string;
  targetId: string;
  targetType: string;
  contents: string;
  cretDatetime: string;
  createdBy: string;
  createdByName: string;
  createdByUserGrade: string;
  createdByProfilePicUrl: string;
  likeCount: number;
  replyList: Reply[];
  youCreate: boolean;
  youLiked: boolean;
  youBlock: boolean;
};

export type CommentModifyReq = {
  commentId: string;
  contents: string;
};

// 댓글 등록 API
export const useCommentAdd = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const commentAddApi = async (param: CommentAddReq) => {
    try {
      if (!isAuthenticated) {
        toast({
          description: '로그인 후 댓글을 작성하실 수 있습니다.',
          duration: 2000,
        });
        return;
      }

      if (param.contents == '') {
        toast({ description: '내용을 입력해주세요.', duration: 2000 });
        return;
      }

      await axiosInstance.post(`/api/comments`, param);

      toast({
        description: '댓글 등록되었습니다.',
        duration: 2000,
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.result?.message || '댓글 등록 중 오류가 발생했습니다.';
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
    commentAddApi,
  };
};

// 아이디어 댓글 조회 API
export const useBoardCommentList = () => {
  const [commentList, setCommentList] = useState<CommentListRes[]>([]);

  const commentListApi = async (boardId: string) => {
    try {
      const response = await axiosInstance.get(`/api/boards/${boardId}/comments`);
      setCommentList(response.data.result.commentList);
    } catch (error) {
      console.error('데이터 요청 오류:', error);
      throw error;
    }
  };

  return {
    commentListApi,
    commentList,
  };
};

// 피드 댓글 조회 API
export const useFeedCommentList = () => {
  const [commentList, setCommentList] = useState<CommentListRes[]>([]);

  const commentListApi = async (boardId: string) => {
    try {
      const response = await axiosInstance.get(`/api/feeds/${boardId}/comments`);
      setCommentList(response.data.result.commentList);
    } catch (error) {
      console.error('데이터 요청 오류:', error);
      throw error;
    }
  };

  return {
    commentListApi,
    commentList,
  };
};

// 댓글 수정 API
export const useCommentModify = () => {
  const { toast } = useToast();
  const commentModifyApi = async (param: CommentModifyReq) => {
    try {
      if (param.contents == '') {
        toast({ description: '내용을 입력해주세요.', duration: 2000 });
        return;
      }

      await axiosInstance.put(`/api/comments`, param);

      toast({
        description: '댓글 수정되었습니다.',
        duration: 2000,
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.result?.message || '댓글 수정 중 오류가 발생했습니다.';
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
    commentModifyApi,
  };
};

// 댓글 삭제 API
export const useCommentDelete = () => {
  const { toast } = useToast();
  const commentDeleteApi = async (commentId: string) => {
    try {
      await axiosInstance.delete(`/api/comments/` + commentId + `?sortType=NEWEST`);

      toast({
        description: '댓글 삭제되었습니다.',
        duration: 2000,
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.result?.message || '댓글 삭제 중 오류가 발생했습니다.';
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
    commentDeleteApi,
  };
};

// 좋아요 토글 API
export const useCommentLikeToggle = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const commentLikeToggleApi = async (commentId: string) => {
    try {
      // 로그인 안했을 경우 로그인 화면으로 이동
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      await axiosInstance.post(`/api/comments/toggle-like`, { commentId: commentId });
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
    commentLikeToggleApi,
  };
};
