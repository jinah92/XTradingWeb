import React, { useEffect, useState } from "react";
/* hook */
import { useFeedDetail, useFeedDelete } from "@/hooks/feed/FeedApi";
import { FollowReq, useFollow } from "@/hooks/mypage/MypageApi";
/* component */
import ProfileImage from "@/components/ui/profileImg";
import LoadingSpinner from "@/components/LoadingSpinner";
import DateDisplay from "@/components/ui/dateDisplay";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ParentComponentProps {
  feedId : string;
  onClose : () => void;
  onViewTF: () => void;
}

const IdeaDetail = ({feedId, onClose, onViewTF}: ParentComponentProps) => {

  const { detailData, feedDetailApi } = useFeedDetail();
  // const { ideaLikeToggleApi } = useIdeaLikeToggle();
  const { feedDeleteApi } = useFeedDelete();
  const { followApi } = useFollow();

  // const likeToggle = async () => {
  //   const result = await ideaLikeToggleApi(feedId);

  // };

  const followAction = () => {
    if(detailData) {
      const param: FollowReq = {
        targetId: detailData?.cretInfo.userId,
      };
      followApi(param);
    }
  };

  useEffect(() => {
    feedDetailApi(feedId);
  }, [])

  // 피드 삭제
  const feedDelete = async() => {
    if(detailData) {
      await feedDeleteApi(detailData?.feedId);
      onClose();
      onViewTF();
    }
  }

  if (detailData === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex w-full flex-col justify-center space-y-6">
        <div className="flex flex-col dark:bg-darkMode dark:text-white">
          <div className="p-4 flex flex-col justify-between text-left">
            <div className="mb-5 font-semibold flex items-center justify-between">
              <div className="flex items-center">
                <div className="cursor-pointer flex items-center">
                  <ProfileImage />
                  <span className="ml-3">{detailData.cretInfo.name}</span>
                </div>
                <span className="p-1 ml-1 text-sm text-blue-500">
                  {detailData.cretInfo.userGrade}
                </span>
                <span className="text-xs ml-1 text-slate-400 font-medium">
                  <DateDisplay isoString={detailData.createdDatetime}></DateDisplay>
                </span>
              </div>
              <div>
                <button
                  className="bg-yellow-400 rounded-lg font-semibold p-1.5 text-xs text-black mr-5"
                  onClick={followAction}
                >
                  follow
                </button>
                {detailData.youCreate ? (
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
                        <DropdownMenuItem>수정하기</DropdownMenuItem>
                        <DropdownMenuItem onClick={feedDelete}>삭제하기</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
              </div>
            </div>
            <div className="sm:mr-10 sm:ml-10">
              <div className="font-semibold mb-7 tracking-wide">
                {detailData.subject}
              </div>
              <div className="mb-7 text-slate-600 dark:text-slate-300">
                {detailData.contents}
              </div>
            </div>
            <div className="text-yellow-500 font-semibold flex">
              {detailData.tagList.length > 0 &&
                detailData.tagList.map((tag, index) => (
                  <div className="rounded-lg p-1 mr-3 text-sm" key={index}>
                    #{tag}
                  </div>
                ))}
            </div>
            <div className="flex mt-3 text-xs text-slate-400 font-semibold">
              <div className="mr-3 flex items-center">
                <img
                  src="/images/icons8-view.png"
                  alt="viewCount"
                  className="w-5 mr-1"
                />
                <span>{detailData.viewCount}</span>
              </div>
              <div className="mr-3 flex items-center">
                <img
                  src="/images/icons8-comment.png"
                  alt="commentCount"
                  className="w-5 mr-1"
                />
                <span>{detailData.commentCount}</span>
              </div>
              <div className="flex items-center">
                {detailData.youLike ? (
                  <img
                    src="/images/icons8-like-on.png"
                    alt="like"
                    className="w-5 mr-1 cursor-pointer"
                    // onClick={() => likeToggle()}
                  />
                ) : (
                  <img
                    src="/images/icons8-like-off.png"
                    alt="like"
                    className="w-5 mr-1 cursor-pointer"
                    // onClick={() => likeToggle()}
                  />
                )}
                <span>{detailData.likeCount}</span> 
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default IdeaDetail;
