import axiosInstance from "@/configs/axios/axiosConfig";
import { useAuth } from "@/router/AuthContext";
import { ListReq } from "@/hooks/idea/IdeaApi";
import { useNavigate } from "react-router-dom";
import { useToast } from "../use-toast";
import axios from "axios";
import { useState } from "react";

export interface FeedData {
  feedId: string;
  coinId: string;
  coinCode: string;
  coinName: string;
  coinImgUrl: string | null;
  subject: string;
  contents: string;
  cretId: string;
  createdByName: string;
  createdByProfilePicUrl: string;
  createdDatetime: string;
  createdByUserGrade: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tagList: string[];
  youLike: boolean;
  youBlock: boolean;
  youAreFollowing: boolean;
};

export type FeedAddReq = {
  code: string;
  subject: string;
  contents: string;
  tagList: string[] | null;
};

export type FeedModifyReq = {
  feedId: string;
  code: string;
  subject: string;
  contents: string;
  tagList: string[] | null;
};


export type FeedDetail = {
  cretInfo: {
    userId: string;
    name: string;
    profileImg: string;
    userGrade: string;
    youAreFollowing: boolean;
  };
  coinInfo: {
    coinId: string;
    code: string;
    name: string;
    imgUrl: string | null;
  };
  feedId: string;
  subject: string;
  contents: string;
  createdDatetime: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tagList: string[];
  youCreate: boolean;
  youLike: boolean;
  youBlock: boolean;
}

// 피드 조회 API
export const useFeedList = () => {
  const feedListApi = async (param: ListReq) => {
    try {
      const response = await axiosInstance.get("/api/feeds", {params: param});
      return response.data.result.feedList;
    } catch (error) {
      console.error("데이터 요청 오류:", error);
      throw error;
    }
  };
  return {
    feedListApi,
  };
};


// 피드 추가 API
export const useFeedAdd = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const feedAddApi = async (param: FeedAddReq) => {
    try {
      // 로그인 안했을 경우 로그인 화면으로 이동
      if(!isAuthenticated) {
        navigate("/login");
        return;
      }

      if(param.code == '') {
        toast({description: '종목을 입력해주세요.', duration: 2000});
        return;
      }
      if(param.contents == '') {
        toast({description: '내용을 입력해주세요.', duration: 2000});
      }
      if(param.subject == '') {
        toast({description: '제목을 입력해주세요.', duration: 2000});
      }
      /* 태그는 validation 체크 안함 */

      await axiosInstance.post(`/api/feeds`, param);

      toast({
        description: '피드 등록되었습니다.',
        duration: 2000,
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "피드 등록 중 오류가 발생했습니다.";
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
    feedAddApi,
  };
};

// 좋아요 토글 API
export const useFeedLikeToggle = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const feedLikeToggleApi = async (feedId: string) => {
    try {
      // 로그인 안했을 경우 로그인 화면으로 이동
      if(!isAuthenticated) {
        navigate("/login");
        return;
      }
      await axiosInstance.post(`/api/feeds/toggle-like`,{ feedId: feedId });
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
    feedLikeToggleApi,
  };
};

// 피드 상세 조회 API
export const useFeedDetail = () => {
  const { toast } = useToast();
  const [detailData, setDetailData] = useState<FeedDetail>();
  const feedDetailApi = async (feedId: string) => {
    try {
      const response = await axiosInstance.get(`/api/feeds/`+feedId);
      setDetailData(response.data.result);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "상세 조회 중 오류가 발생했습니다.";
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
    feedDetailApi,
    detailData
  };
};

// 피드 삭제 API
export const useFeedDelete = () => {
  const { toast } = useToast();
  const feedDeleteApi = async (feedId: string) => {
    try {
      await axiosInstance.delete(`/api/feeds/`+feedId);
      toast({
        description: "삭제되었습니다.",
        duration: 2000,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "피드 삭제 중 오류가 발생했습니다.";
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
    feedDeleteApi
  };
};


// 피드 수정 API
export const useFeedModify = () => {
  const { toast } = useToast();
  const feedModifyApi = async (param: FeedModifyReq) => {
    try {
      if(param.contents == '') {
        toast({description: '내용을 입력해주세요.', duration: 2000});
      }
      if(param.subject == '') {
        toast({description: '제목을 입력해주세요.', duration: 2000});
      }
      /* 태그는 validation 체크 안함 */

      await axiosInstance.put(`/api/feeds`, param);

      toast({
        description: '피드 수정되었습니다.',
        duration: 2000,
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "피드 수정 중 오류가 발생했습니다.";
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
    feedModifyApi,
  };
};


// 게시물 차단 토글 API
export const useIdeaBlockToggle = () => {
  const { toast } = useToast();
  const ideaBlockToggleApi = async (boardId: string) => {
    try {
      await axiosInstance.post(`/api/boards/toggle-block`, {boardId: boardId} );

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "차단 작업 중 오류가 발생했습니다.";
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
    ideaBlockToggleApi,
  };
};

// 게시물 차단 토글 API
export const useFeedBlockToggle = () => {
  const { toast } = useToast();
  const feedBlockToggleApi = async (feedId: string) => {
    try {
      await axiosInstance.post(`/api/feeds/toggle-block`, {feedId: feedId} );

      toast({
        description: '게시글 차단 되었습니다.',
        duration: 2000,
      });

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
        error.response.data?.result?.message ||
        "차단 작업 중 오류가 발생했습니다.";
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
    feedBlockToggleApi,
  };
};