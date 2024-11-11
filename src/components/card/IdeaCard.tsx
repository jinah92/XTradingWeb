import React, { useState } from "react";
/* hook */
import { BoardData, BoardDetail } from "@/hooks/idea/IdeaApi";
import { useIdeaLikeToggle } from "@/hooks/idea/IdeaApi";
/* components */
import { Card } from "@/components/ui/card";
import ProfileImage from "@/components/ui/profileImg";
import EllipsisText from "@/components/ui/ellipsisText";
import DateDisplay from "@/components/ui/dateDisplay";
import Modal from "@/components/modal/Modal";
import IdeaDetail from "@/components/modal/IdeaDetail";
/* common */
import { openModal, closeModal } from "@/common/Utils";

interface CardItemProps {
  item: BoardData;
}

const IdeaCard: React.FC<CardItemProps> = ({ item }) => {
  const { ideaLikeToggleApi } = useIdeaLikeToggle();
  const [subject, setSubject] = useState(item.subject);
  const [contents, setContents] = useState(item.contents);
  const [tagList, setTagList] = useState(item.tagList);
  const [youBlock, setYouBlock] = useState(item.youBlock);
  const [liked, setLiked] = useState(item.youLike);
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const [viewTF, setViewTF] = useState(true);

  const likeToggle = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const result = await ideaLikeToggleApi(item.boardId);

    if (result) {
      setLiked((prevLiked:boolean) => {
        // liked 상태에 따라 likeCount를 조정
        const newLiked = !prevLiked;
        setLikeCount(() => (newLiked ? likeCount + 1 : likeCount - 1));
        return newLiked;
      });
    }
  };

  // 게시글 상세 모달
  const [detailModal, setDetailModal] = useState<boolean>(false);

  const openDetail = () => {
    openModal();
    setDetailModal(true);
  }
  const closeDetail = () => {
    closeModal();
    setDetailModal(false);
  }

  /* 상세 모달에서 변경사항 업데이트 (like) */
  const detailLikeToggle = (likedData: boolean, likeCountData: number) => {
    setLiked(likedData);
    setLikeCount(likeCountData);
  }

  /* 상세 모달에서 변경사항 업데이트 (이슈 정보) */
  const detailIssueData = (issueData:BoardDetail) => {
    setSubject(issueData.subject);
    setContents(issueData.contents);
    setTagList(issueData.tagList);
  }


  // 아이디어 게시글 삭제
  const ideaContentDel = () => {
    setViewTF(false);
  }

  return (
    <>
      {viewTF ? (
        <Card className="dark:border-slate-300 w-full rounded-none border-t-0 border-l-0 border-r-0 shadow-none bg-transparent" onClick={openDetail}>
          <div className="flex flex-col dark:bg-darkMode dark:text-white">
            <div className="p-4 flex flex-col justify-between text-left">
              <div className="mb-5 font-semibold flex items-center justify-between">
                <div className="flex items-center">
                  <div className="cursor-pointer flex items-center">
                    <ProfileImage />
                    <span className="ml-3">{item.cretName}</span>
                  </div>
                  <span className="p-1 ml-1 text-sm text-blue-500">
                    {item.cretUserGrade}
                  </span>
                  <span className="text-xs ml-1 text-slate-400 font-medium">
                    <DateDisplay isoString={item.cretDatetime}></DateDisplay>
                  </span>
                </div>
              </div>
              <div className="cursor-pointer sm:mr-10 sm:ml-10">
                <div className="font-semibold mb-7 tracking-wide">
                  {subject}
                </div>
                <div className="mb-7 text-slate-500 dark:text-slate-300">
                  <EllipsisText text={contents} maxLines={10}></EllipsisText>
                </div>
              </div>
              <div className="text-yellow-500 font-semibold flex flex-wrap">
                {tagList.length > 0 &&
                  tagList.map((tag, index) => (
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
                  <span>{item.viewCount}</span>
                </div>
                <div className="mr-3 flex items-center">
                  <img
                    src="/images/icons8-comment.png"
                    alt="commentCount"
                    className="w-5 mr-1"
                  />
                  <span>{item.commentCount}</span>
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
            </div>
          </div>
        </Card>
      ) : null}
      

      <Modal isOpen={detailModal} onClose={closeDetail}>
        <IdeaDetail boardId={item.boardId} onClose={closeDetail} onViewTF={ideaContentDel} onLikeToggle={detailLikeToggle} onIssueData={detailIssueData}/>
      </Modal>
    </>
  );
};

export default IdeaCard;
