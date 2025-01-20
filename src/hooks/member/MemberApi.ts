import axiosInstance from '@/configs/axios/axiosConfig';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

// 사용자 차단 토글 API
export const useUserBlockToggle = () => {
  const { toast } = useToast();
  const userBlockToggle = async (userId: string) => {
    try {
      await axiosInstance.post(`/api/members/toggle-block`, { userId: userId });

      toast({
        description: '차단 되었습니다.',
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
    userBlockToggle,
  };
};
