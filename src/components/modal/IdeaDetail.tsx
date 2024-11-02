import React, { useEffect, useState } from "react";
import { useIdeaDetail, useIdeaLikeToggle } from "@/hooks/idea/ideaApi";
import ProfileImage from "../ui/profileImg";
import LoadingSpinner from "../LoadingSpinner";
import DateDisplay from "../ui/dateDisplay";
import { FollowReq, useFollow } from "../../hooks/mypage/mypageApi";

interface ParentComponentProps {
  boardId : string
}

const IdeaDetail = ({boardId}: ParentComponentProps) => {

  const { detailData, ideaDetailApi } = useIdeaDetail();
  const { ideaLikeToggleApi } = useIdeaLikeToggle();
  const { followApi } = useFollow();

  const likeToggle = async () => {
    const result = await ideaLikeToggleApi(boardId);

  };

  const followAction = () => {
    const param: FollowReq = {
      // targetId: item.cretId,
    };
    followApi(param);
  };

  useEffect(() => {
    ideaDetailApi(boardId);
  }, [])

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
                  <DateDisplay isoString={detailData.cretDateTime}></DateDisplay>
                </span>
              </div>
              <button
                className="bg-yellow-400 rounded-lg font-semibold p-1.5 text-xs text-black"
                onClick={followAction}
              >
                follow
              </button>
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
                    onClick={() => likeToggle()}
                  />
                ) : (
                  <img
                    src="/images/icons8-like-off.png"
                    alt="like"
                    className="w-5 mr-1 cursor-pointer"
                    onClick={() => likeToggle()}
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
