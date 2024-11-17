import React from 'react';
import * as jdenticon from 'jdenticon';

interface props {
  id:string,
  size?: number
}

const Avatar = ({ id, size = 38 }:props) => {
  const hash = id; // 사용자 ID나 고유 값을 입력으로 사용
  const svg = jdenticon.toSvg(hash, size); // SVG 문자열 생성
  
  return (  
  <div className="flex items-center justify-center rounded-full overflow-hidden bg-gray-100 dark:bg-gray-900">
    <div
      className="w-full h-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  </div>
  )
};

export default Avatar;