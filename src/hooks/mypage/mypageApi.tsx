import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/configs/axios/axiosConfig";
import { useAuth } from "@/router/AuthContext";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export type FollowReq = {
  targetId: string;
};

export type FollowingRes = {
  userId: string;
  name: string;
  profilePicUrl: string | null;
  userGrade: string;
};

export type nickNameReq = {
  userId: string;
  nickName: string;
};

type memberInfoRes = {
  email: string;
  nickName: string;
  profilePicUrl: string;
  userGrade: string;
  reputationScore: number;
  boardCount: number;
  followerCount: number;
  followingCount: number;
  youAreFollowing: boolean;
  youBlock: boolean;
};

// 개인정보 조회 API
export const useMemberInfo = () => {
  const { toast } = useToast();
  const [memberInfo, setMemberInfo] = useState<memberInfoRes>();
  const memberInfoApi = async (userId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/members/${userId}/base-info`
      );
      setMemberInfo(response.data.result);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "개인정보 조회 중 오류가 발생했습니다.";
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
    memberInfoApi,
    memberInfo,
  };
};

// 팔로우하기 API
export const useFollow = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const followApi = async (param: FollowReq) => {
    try {
      // 로그인 안했을 경우 로그인 화면으로 이동
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      await axiosInstance.post(`/api/my-page/follow`, param);
      // toast({
      //   description: "팔로우 하였습니다.",
      //   duration: 2000,
      // });
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "팔로우 중 오류가 발생했습니다.";
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
    followApi,
  };
};

// 언팔로우하기 API
export const useUnfollow = () => {
  const { toast } = useToast();
  const unfollowApi = async (param: FollowReq) => {
    try {
      await axiosInstance.post(`/api/my-page/unfollow`, param);
      // toast({
      //   description: "언팔로우 하였습니다.",
      //   duration: 2000,
      // });
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "언팔로우 중 오류가 발생했습니다.";
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
    unfollowApi,
  };
};

// 팔로잉 목록 API
export const useFollowingList = () => {
  const { toast } = useToast();
  const [followingList, setFollowingList] = useState<FollowingRes[]>([]);
  const followingListApi = async () => {
    try {
      const response = await axiosInstance.get(`/api/my-page/followings`);
      setFollowingList(response.data.result.followings);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "팔로잉 목록 조회 중 오류가 발생했습니다.";
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
    }
  };

  return {
    followingListApi,
    followingList,
  };
};

// 팔로워 목록 API
export const useFollowerList = () => {
  const { toast } = useToast();
  const [followerList, setFollowerList] = useState<FollowingRes>();
  const followerListApi = async () => {
    try {
      const response = await axiosInstance.get(`/api/my-page/followers`);
      setFollowerList(response.data.result.followers);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "팔로잉 목록 조회 중 오류가 발생했습니다.";
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
    }
  };

  return {
    followerListApi,
    followerList,
  };
};

// 닉네임 중복여부 API
export const useNickNameChk = () => {
  const { toast } = useToast();
  const nickNameChkApi = async (param: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/my-page/nick-name/exist?nickName=` + param
      );
      if (!response.data.result.isExist) {
        return true;
      } else {
        toast({
          description: response.data.result.message,
          duration: 2000,
        });
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "닉네임 중복 체크 중 오류가 발생했습니다.";
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
    }
  };

  return {
    nickNameChkApi,
  };
};

// 닉네임 변경 API
export const useNickNameModify = () => {
  const { toast } = useToast();
  const nickNameModifyApi = async (param: nickNameReq) => {
    try {
      const response = await axiosInstance.post(
        `/api/my-page/nick-name?nickName`,
        param
      );
      if (response.data.result === "updated") {
        toast({
          description: "변경되었습니다.",
          duration: 2000,
        });
        return true;
      } else {
        toast({
          description: response.data.result.message,
          duration: 2000,
        });
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.result?.message ||
          "닉네임 변경 중 오류가 발생했습니다.";
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
    nickNameModifyApi,
  };
};
