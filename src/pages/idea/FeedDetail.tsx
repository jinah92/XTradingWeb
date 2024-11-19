import React, { useEffect, useState } from "react";
/* hook */
import {
  useFeedDetail,
  useFeedDelete,
  useFeedLikeToggle,
  useFeedBlockToggle,
} from "@/hooks/feed/FeedApi";
import { useFeedCommentList } from "@/hooks/comment/CommentApi";
import { FollowReq, useFollow, useUnfollow } from "@/hooks/mypage/MyPageApi";
import { useUserBlockToggle } from "@/hooks/member/MemberApi";
import { reportFormReq } from "@/hooks/report/ReportApi";
/* component */
import ProfileImage from "@/components/ui/profileImg";
import LoadingSpinner from "@/components/LoadingSpinner";
import DateDisplay from "@/components/ui/dateDisplay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommentInput from "@/components/ui/commentInput";
import Comment from "@/components/ui/comment";
import Avatar from "@/components/ui/avartar";
/* page */
import ReportForm from "@/pages/idea/ReportForm";
import FeedModify from "@/pages/idea/FeedModify";

interface ParentComponentProps {
  feedId: string;
  onClose: () => void;
  onViewTF: () => void;
  onLikeToggle: (liked: boolean, likeCount: number) => void;
}

const IdeaDetail = ({
  feedId,
  onClose,
  onViewTF,
  onLikeToggle,
}: ParentComponentProps) => {
  const { detailData, feedDetailApi } = useFeedDetail();
  const { feedLikeToggleApi } = useFeedLikeToggle();
  const { feedDeleteApi } = useFeedDelete();
  const { followApi } = useFollow();
  const { unfollowApi } = useUnfollow();
  const { commentList, commentListApi } = useFeedCommentList();
  const { feedBlockToggleApi } = useFeedBlockToggle();
  const { userBlockToggle } = useUserBlockToggle();

  /* 상태 관리 */
  const [followTF, setFollowTF] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [viewType, setViewType] = useState("search");

  const [reportData, setReportData] = useState<reportFormReq>();

  /* 좋아요 토글 */
  const likeToggle = async () => {
    const result = await feedLikeToggleApi(feedId);
    if (result) {
      setLiked((prevLiked: boolean) => {
        // liked 상태에 따라 likeCount를 조정
        const newLiked = !prevLiked;
        setLikeCount(() => (newLiked ? likeCount + 1 : likeCount - 1));
        return newLiked;
      });
    }
  };

  const followAction = async () => {
    if (detailData) {
      const param: FollowReq = {
        targetId: detailData.cretInfo.userId,
      };
      const result = await followApi(param);
      if (result) {
        setFollowTF(true);
      }
    }
  };

  const unfollowAction = async () => {
    if (detailData) {
      const param: FollowReq = {
        targetId: detailData.cretInfo.userId,
      };
      const result = await unfollowApi(param);
      if (result) {
        setFollowTF(false);
      }
    }
  };

  // 피드 수정 화면 호출
  const feedModify = () => {
    setViewType("modify");
  };

  // 유저 신고 화면 호출
  const userReport = () => {
    if (detailData) {
      setReportData({
        cretName: detailData.cretInfo.name,
        targetId: detailData.feedId,
        targetType: "FEED",
        title: detailData.subject,
      });
      setViewType("report");
    }
  };

  // 피드 조회 화면 호출
  const feedSearch = async () => {
    await feedDetailApi(feedId);
    await commentListApi(feedId);
    setViewType("search");
  };

  // 피드 삭제
  const feedDelete = async () => {
    await feedDeleteApi(feedId);
    onClose();
    onViewTF();
  };

  // 피드 차단
  const feedBlock = async () => {
    await feedBlockToggleApi(feedId);
    onClose();
    onViewTF();
  };

  // 사용자 차단
  const userBlock = async () => {
    if (detailData) {
      await userBlockToggle(detailData.cretInfo.userId);
      onClose();
      onViewTF();
    }
  };

  /* like 값 변경 시 리스트에 적용 */
  useEffect(() => {
    if (detailData) {
      onLikeToggle(liked, likeCount);
    }
  }, [liked]);

  useEffect(() => {
    feedDetailApi(feedId);
    commentListApi(feedId);
  }, []);

  // 상태 관리를 위해 조회 값 넣기
  useEffect(() => {
    if (detailData) {
      setFollowTF(detailData?.cretInfo.youAreFollowing);
      setLikeCount(detailData.likeCount);
      setLiked(detailData.youLike);
    }
  }, [detailData]);

  if (detailData === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {viewType === "search" && (
        <div className="flex w-full flex-col sm:justify-center justify-normal space-y-6 h-screen sm:h-auto pt-3 pb-3">
          <div className="flex flex-col dark:bg-darkMode dark:text-white">
            <div className="p-4 flex flex-col justify-between text-left">
              <div className="mb-5 font-semibold flex items-start sm:items-center justify-between">
                <div className="cursor-pointer flex items-center">
                  {detailData.cretInfo.profileImg ? (
                    <ProfileImage src={detailData.cretInfo.profileImg} />
                  ) : (
                    <Avatar id={detailData.cretInfo.userId} />
                  )}

                  <div className="cursor-pointer flex flex-col items-start sm:items-center sm:flex-row sm:text-sm text-xs">
                    <span className="ml-3">{detailData.cretInfo.name}</span>
                    <span className="p-1 ml-1 sm:text-sm text-xs text-blue-500">
                      {detailData.cretInfo.userGrade}
                    </span>
                  </div>
                  <span className="text-xs ml-1 text-slate-400 font-medium">
                    <DateDisplay
                      isoString={detailData.createdDatetime}
                    ></DateDisplay>
                  </span>
                </div>
                <div>
                  {followTF ? (
                    <button
                      className="bg-yellow-400 rounded-lg font-semibold p-1.5 text-xs text-black mr-5"
                      onClick={unfollowAction}
                    >
                      &#10004; follow
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-400 rounded-lg font-semibold p-1.5 text-xs text-black mr-5"
                      onClick={followAction}
                    >
                      follow
                    </button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                      >
                        <path
                          d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {detailData.youCreate ? (
                        <>
                          <DropdownMenuItem onClick={feedModify}>
                            수정하기
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={feedDelete}>
                            삭제하기
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem onClick={userReport}>
                            신고하기
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={feedBlock}>
                            컨텐츠 차단하기
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={userBlock}>
                            유저 차단하기
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              <div className="mb-7">
                <div className="cursor-pointer flex items-center">
                  <span className="sm:ml-10 font-semibold text-sm border rounded-lg p-1 border-slate-900">
                    {detailData.coinInfo.code}
                  </span>
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
              <div className="mt-5">
                <CommentInput
                  targetId={detailData.feedId}
                  targetType="FEED"
                  refresh={feedSearch}
                ></CommentInput>

                <div>
                  {commentList.map((comment) => (
                    <Comment
                      key={comment.commentId}
                      comment={comment}
                      refresh={feedSearch}
                    ></Comment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {viewType === "modify" && (
        <FeedModify data={detailData} feedMethod={feedSearch} />
      )}
      {viewType === "report" && (
        <ReportForm data={reportData} closeMethod={feedSearch} />
      )}
    </>
  );
};

export default IdeaDetail;
