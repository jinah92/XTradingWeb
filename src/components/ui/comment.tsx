import React, { useState } from "react";
/* hook */
import { CommentListRes, useCommentLikeToggle, useCommentDelete } from "@/hooks/comment/CommentApi";
/* component */
import ProfileImage from "@/components/ui/profileImg";
import DateDisplay from "@/components/ui/dateDisplay";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CommentInput from "@/components/ui/commentInput";

interface ParentComponentProps {
  comment: CommentListRes;
  refresh?: () => void;
}

const Comment = ({ comment, refresh = () => {} }:ParentComponentProps) => {

  const { commentLikeToggleApi } = useCommentLikeToggle();
  const { commentDeleteApi } = useCommentDelete();

  /* 상태 관리 */
  const [viewType, setViewType] = useState('search'); // 댓글 화면 (조회/수정)
  const [replyViewType, setReplyViewType] = useState('search'); // 대댓글 화면 (조회/수정)
  const [replyForm, setReplyForm] = useState(false); // 대댓글 작성 폼 생성 여부

  /* 좋아요 토글 */
  const likeToggle = async (id:string) => {
    const result = await commentLikeToggleApi(id);
    if (result) {
      await refresh();
    }
  };

  /* 댓글 수정화면 호출 */
  const commentModify = () => {
    setViewType('modify');
  }

  // 댓글 조회 화면 호출
  const commentSearch = async () => {
    await refresh();
    setViewType('search');
    setReplyViewType('search');
    setReplyForm(false);
  }

  const replyCommentModify = () => {
    setReplyViewType('modify');
  }

  /* 댓글 삭제 */
  const commentDelete = async (id:string) => {
    await commentDeleteApi(id);
    refresh();
  }

  const setReplyFormToggle = () => {
    setReplyForm(prevState => !prevState);
  }

  return (
    <>
      <hr className="mt-5 mb-5"/>
      {viewType == "search" ? (
        <div key={comment.commentId}>
          <div className="flex justify-between">
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
            <div>
              {comment.youCreate ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path 
                      d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" 
                      fill="currentColor" 
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={commentModify}>수정하기</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => commentDelete(comment.commentId)}>삭제하기</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </div>
          </div>
          <div className="m-4 text-slate-600 dark:text-slate-300 whitespace-pre-line">
              <span>{comment.contents}</span>
          </div>
          <div>
            <div className="flex mt-3 text-xs text-slate-400 font-semibold justify-between">
              <div className="flex items-center">
                <div className="mr-3 flex items-center">
                  <img
                    src="/images/icons8-comment.png"
                    alt="commentCount"
                    className="w-5 mr-1"
                  />
                  <span>{comment.replyList.length}</span>
                </div>
                {comment.youLiked ? (
                  <img
                    src="/images/icons8-like-on.png"
                    alt="like"
                    className="w-5 mr-1 cursor-pointer"
                    onClick={() => likeToggle(comment.commentId)}
                  />
                ) : (
                  <img
                    src="/images/icons8-like-off.png"
                    alt="like"
                    className="w-5 mr-1 cursor-pointer"
                    onClick={() => likeToggle(comment.commentId)}
                  />
                )}
                <span>{comment.likeCount}</span> 
              </div>
              <span className="text-black dark:text-white" onClick={setReplyFormToggle}>대댓글 작성</span>
            </div>
            {replyForm ? (
              <div className="mt-5">
                <CommentInput targetId={comment.commentId} targetType="COMMENT" type="replyAdd" refresh={commentSearch}></CommentInput>
              </div>
            ) : (null)}
            {/* 대댓글 표시 영역 */}
            <div className="ml-8 mt-4">
              {comment.replyList.map((reply, index) => (
                replyViewType == "search" ? (
                  <div key={index} className="mt-5">
                    <div className="flex justify-between">
                      <div className="flex items-start sm:items-center">
                        <ProfileImage src={reply.createdByProfilePicUrl}/>
                        <div className="cursor-pointer flex flex-col items-start sm:items-center sm:flex-row sm:text-sm text-xs font-semibold">
                          <span className="ml-3">{reply.createdByName}</span>
                          <span className="p-1 ml-1 sm:text-sm text-xs text-blue-500">
                            {reply.createdByUserGrade}
                          </span>
                        </div>
                        <span className="text-xs ml-1 text-slate-400 font-medium">
                          <DateDisplay isoString={reply.cretDatetime}></DateDisplay>
                        </span>
                      </div>
                      <div>
                        {reply.youCreate ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                              <path 
                                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" 
                                fill="currentColor" 
                                fillRule="evenodd"
                                clipRule="evenodd"
                              />
                            </svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={replyCommentModify}>수정하기</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => commentDelete(reply.commentId)}>삭제하기</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : null}
                      </div>
                    </div>
                    <div className="m-4 text-slate-600 dark:text-slate-300 whitespace-pre-line">
                      <span>{reply.contents}</span>
                    </div>
                    <div>
                      <div className="flex mt-3 text-xs text-slate-400 font-semibold justify-between">
                        <div className="flex items-center">
                          {reply.youLiked ? (
                            <img
                              src="/images/icons8-like-on.png"
                              alt="like"
                              className="w-5 mr-1 cursor-pointer"
                              onClick={() => likeToggle(reply.commentId)}
                            />
                          ) : (
                            <img
                              src="/images/icons8-like-off.png"
                              alt="like"
                              className="w-5 mr-1 cursor-pointer"
                              onClick={() => likeToggle(reply.commentId)}
                            />
                          )}
                          <span>{reply.likeCount}</span> 
                        </div>
                      </div>
                    </div>
                  </div>
                ):(
                  <CommentInput targetId={reply.commentId} type="replytModify" beforeContent={reply.contents} refresh={commentSearch}></CommentInput>
                )
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
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
          </div>
          <div className="mt-5">
            <CommentInput targetId={comment.commentId} refresh={commentSearch} beforeContent={comment.contents} type="modify" ></CommentInput>
          </div>
        </>
      )}
    </>
  );
};
export default Comment;