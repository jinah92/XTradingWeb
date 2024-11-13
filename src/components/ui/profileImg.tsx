import React, { useEffect, useState } from "react";
import { useTheme } from "@/ThemeProvider";

interface ProfileImageProps {
  src?: string; // 이미지 URL
  alt?: string; // 대체 텍스트
  size?: number; // 이미지 크기
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt = "Profile Image"
}) => {
  const { darkMode } = useTheme();
  const [imgSrc, setImgSrc] = useState<string>();

  useEffect(() => {
    if (src != null && src != "") {
      setImgSrc(src);
      return;
    }
  }, [darkMode, src]);

  return (
    <img
      src={imgSrc} // src가 없을 경우 기본 이미지 사용
      alt={alt}
      style={{
        borderRadius: "50%", // 동그라미 형태로 만들기
        objectFit: "cover", // 이미지 비율 유지
      }}
      className="border dark:border-0 dark:bg-white w-10 h-10"
    />
  );
};

export default ProfileImage;
