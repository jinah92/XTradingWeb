import React, { useState } from "react";
import { commentListRes, useCommentLikeToggle } from "@/hooks/comment/CommentApi";
import ProfileImage from "@/components/ui/profileImg";
import DateDisplay from "@/components/ui/dateDisplay";

interface ParentComponentProps {
  comment: commentListRes;
}

const Comment = ({ comment }:ParentComponentProps) => {

  const { commentLikeToggleApi } = useCommentLikeToggle();

  /* 상태 관리 */
  const [liked, setLiked] = useState(comment.youLiked);
  const [likeCount, setLikeCount] = useState(comment.likeCount);

  console.log(comment);
  /* 좋아요 토글 */
  const likeToggle = async () => {
    const result = await commentLikeToggleApi(comment.commentId);
    if (result) {
      setLiked((prevLiked:boolean) => {
        // liked 상태에 따라 likeCount를 조정
        const newLiked = !prevLiked;
        setLikeCount(() => (newLiked ? likeCount + 1 : likeCount - 1));
        return newLiked;
      });
    }
  };

  return (
    <>
      <div key={comment.commentId}>
          <hr className="mt-5 mb-5"/>
          <div className="flex items-start sm:items-center">
            <ProfileImage src={comment.createdByProfilePicUrl}/>
            <div className="cursor-pointer flex flex-col items-start sm:items-center sm:flex-row sm:text-sm text-xs font-semibold">
              <span className="ml-3">{comment.createdByName}</span>
              <span className="p-1 ml-1 sm:text-sm text-xs text-blue-500">
                {comment.createdByUserGrade}
              </span>
            </div>
            <span className="text-xs ml-1 text-slate-400 font-medium">
              <DateDisplay isoString={comment.cretDatetime}></DateDisplay>
            </span>
          </div>
        <div className="m-4 text-slate-600 dark:text-slate-300 whitespace-pre-line">
            <span>{comment.contents}</span>
        </div>
        <div>
          <div className="flex mt-3 text-xs text-slate-400 font-semibold">
            <div className="flex items-center">
              {liked ? (
                <img
                  src="/images/icons8-like-on.png"
                  alt="like"
                  className="w-5 mr-1 cursor-pointer"
                  onClick={likeToggle}
                />
              ) : (
                <img
                  src="/images/icons8-like-off.png"
                  alt="like"
                  className="w-5 mr-1 cursor-pointer"
                  onClick={likeToggle}
                />
              )}
              <span>{likeCount}</span> 
            </div>
          </div>
          {/* <p>답글: {comment.replyList.length}개</p> */}
           {/* 대댓글 표시 영역 */}
          <div className="ml-8 mt-4">
            {comment.replyList.map((reply, index) => (
              <div key={index} className="flex items-start mt-5 mb-5">
                <div className="flex-shrink-0">
                  <ProfileImage src={reply.createdByProfilePicUrl}/>
                </div>
                <div className="ml-3">
                  <div className="flex text-sm font-semibold">
                    <span className="text-gray-800">{reply.createdByName}</span>
                    <span className="text-xs ml-1 text-slate-400 font-medium">
                      <DateDisplay isoString={reply.cretDatetime} />
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-line">
                    {reply.contents}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Comment;