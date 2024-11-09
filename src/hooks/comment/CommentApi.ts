import axiosInstance from "@/configs/axios/axiosConfig";
import { useAuth } from "@/router/AuthContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type commentAddReq = {
  targetType: string;
  targetId: string;
  contents: string;
}

export type commentListRes = {
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
  replyList: reply[];
  youCreate: boolean;
  youLiked: boolean;
  youBlock: boolean;
}

export type reply = {
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
  replyList: reply[];
  youCreate: boolean;
  youLiked: boolean;
  youBlock: boolean;
}



// 댓글 등록 API
export const useCommentAdd = () => {
  const { accessToken, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const commentAddApi = async (param: commentAddReq) => {
    try {
      if(!isAuthenticated) {
        toast({
          description: '로그인 후 댓글을 작성하실 수 있습니다.',
          duration: 2000,
        });
        return;
      }

      if(param.contents == '') {
        toast({description: '내용을 입력해주세요.', duration: 2000});
        return;
      }

      await axiosInstance.post(`/api/comments`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast({
        description: '댓글 등록되었습니다.',
        duration: 2000,
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "댓글 등록 중 오류가 발생했습니다.";
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 2000,
        });
      }
      console.error("오류:", error);
      return false;
    }
  };

  return {
    commentAddApi,
  };
};


// 댓글 조회 API
export const useCommentList = () => {
  const { accessToken, isAuthenticated } = useAuth();
  const [commentList, setCommentList] = useState<commentListRes[]>([]);

  const commentListApi = async (boardId:string) => {
    try {
      if (isAuthenticated) {
        const response = await axiosInstance.get(`/api/boards/${boardId}/comments`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCommentList(response.data.result.commentList);
      } else {
        const response = await axiosInstance.get(`/api/boards/${boardId}/comments`);
        setCommentList(response.data.result.commentList);
      }
    } catch (error) {
      console.error("데이터 요청 오류:", error);
      throw error;
    }
  };

  return {
    commentListApi,
    commentList
  };
};

// 좋아요 토글 API
export const useCommentLikeToggle = () => {
  const navigate = useNavigate();
  const { accessToken, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const commentLikeToggleApi = async (commentId: string) => {
    try {
      // 로그인 안했을 경우 로그인 화면으로 이동
      if(!isAuthenticated) {
        navigate("/login");
        return;
      }
      await axiosInstance.post(
        `/api/comments/toggle-like`,
        { commentId: commentId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "좋아요 중 오류가 발생했습니다.";
        toast({
          description: errorMessage,
          duration: 2000,
        });
      } else {
        toast({
          description: "예기치 못한 오류가 발생했습니다.",
          duration: 2000,
        });
      }
      console.error("오류:", error);
      return false;
    }
  };

  return {
    commentLikeToggleApi,
  };
};