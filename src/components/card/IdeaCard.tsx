import React, { useState } from 'react';

import { Card, DateDisplay, EllipsisText } from '@shared';
import { openModal, closeModal } from '@shared/lib';

import Modal from '@/components/modal/Modal';
import { useIdeaLikeToggle } from '@/hooks/idea/IdeaApi';
import IdeaDetail from '@/pages/idea/IdeaDetail';

import type { IdeaViewModel } from '@/entities/board';
import type { BoardDetail } from '@/hooks/idea/IdeaApi';

interface CardItemProps {
  item: IdeaViewModel;
}

const IdeaCard: React.FC<CardItemProps> = ({ item: idea }: CardItemProps) => {
  const { ideaLikeToggleApi } = useIdeaLikeToggle();
  const [subject, setSubject] = useState(idea.data.title);
  const [contents, setContents] = useState(idea.data.content);
  const [tagList, setTagList] = useState(idea.data.tags.map(tag => tag.tagName));
  const [liked, setLiked] = useState(idea.isLike);
  const [likeCount, setLikeCount] = useState(idea.data.likeCount);
  const [viewTF, setViewTF] = useState(true);

  const likeToggle = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const result = await ideaLikeToggleApi(idea.id);

    if (result) {
      setLiked((prevLiked: boolean) => {
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
  };
  const closeDetail = () => {
    closeModal();
    setDetailModal(false);
  };

  /* 상세 모달에서 변경사항 업데이트 (like) */
  const detailLikeToggle = (likedData: boolean, likeCountData: number) => {
    setLiked(likedData);
    setLikeCount(likeCountData);
  };

  // /* 상세 모달에서 변경사항 업데이트 (이슈 정보) */
  const detailIssueData = (issueData: BoardDetail) => {
    setSubject(issueData.subject);
    setContents(issueData.contents);
    setTagList(issueData.tagList);
  };

  // // 아이디어 게시글 차단, 삭제하여 리스트 제외해야할 때
  const ideaViewTF = () => {
    setViewTF(false);
  };

  return (
    <>
      {viewTF && !idea?.isBlock && (
        <Card
          className="dark:border-slate-300 rounded-none border-t-0 border-l-0 border-r-0 shadow-none bg-transparent break-words"
          onClick={openDetail}
        >
          <div className="flex flex-col dark:bg-darkMode dark:text-white break-words">
            <div className="p-4 flex flex-col justify-between text-left">
              <div className="mb-5 font-semibold flex items-center justify-between">
                <div className="flex items-center">
                  <div className="cursor-pointer flex items-center">
                    <span className="ml-3">{idea?.data?.userName}</span>
                  </div>
                  <span className="p-1 ml-1 text-sm text-blue-500">{idea?.data?.userGrade}</span>
                  <span className="text-xs ml-1 text-slate-400 font-medium">
                    {idea?.toTimeAgoDate()}
                    {/* <DateDisplay isoString={idea?.toTimeAgoDate()}></DateDisplay> */}
                  </span>
                </div>
              </div>
              <div className="cursor-pointer sm:mr-10 sm:ml-10 max-w-screen-sm">
                <div className="font-semibold mb-7 tracking-wide">{idea?.data?.title}</div>
                <div className="mb-7 text-slate-500 dark:text-slate-300">
                  <EllipsisText text={idea?.data?.content} maxLines={10}></EllipsisText>
                </div>
              </div>
              <div className="text-yellow-500 font-semibold flex flex-wrap">
                {idea?.data?.tags.map(({ tagId, tagName }) => (
                  <div className="rounded-lg p-1 mr-3 text-sm" key={tagId}>
                    {tagName}
                  </div>
                ))}
              </div>
              <div className="flex mt-3 text-xs text-slate-400 font-semibold">
                <div className="mr-3 flex items-center">
                  <img src="/images/icons8-view.png" alt="viewCount" className="w-5 mr-1" />
                  <span>{idea?.data?.viewCount}</span>
                </div>
                <div className="mr-3 flex items-center">
                  <img src="/images/icons8-comment.png" alt="commentCount" className="w-5 mr-1" />
                  <span>{idea?.data?.commentCount}</span>
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
      )}

      <Modal isOpen={detailModal} onClose={closeDetail}>
        <IdeaDetail
          boardId={idea.id}
          onClose={closeDetail}
          onViewTF={ideaViewTF}
          onLikeToggle={detailLikeToggle}
          onIssueData={detailIssueData}
        />
      </Modal>
    </>
  );
};

export default IdeaCard;
