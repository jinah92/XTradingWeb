import React, { useState } from 'react';

import { Avatar, Card, DateDisplay, EllipsisText, ProfileImage } from '@shared';

import { openModal, closeModal } from '@/common/Utils';
import Modal from '@/components/modal/Modal';
import { useFeedLikeToggle } from '@/hooks/feed/FeedApi';
import FeedDetail from '@/pages/idea/FeedDetail';

import type { FeedData } from '@/hooks/feed/types';

interface CardItemProps {
  item: FeedData;
}

const IdeaCard: React.FC<CardItemProps> = ({ item }) => {
  const { feedLikeToggleApi } = useFeedLikeToggle();
  const [liked, setLiked] = useState(item.youLike);
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const [viewTF, setViewTF] = useState(true);

  const likeToggle = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const result = await feedLikeToggleApi(item.feedId);

    if (result) {
      setLiked(prevLiked => {
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

  /* 상세 모달에서 좋아요 변경사항 업데이트 */
  const detailLikeToggle = (likedData: boolean, likeCountData: number) => {
    setLiked(likedData);
    setLikeCount(likeCountData);
  };

  // 피드 게시글 차단, 삭제하여 리스트 제외해야할 때
  const feedViewTF = () => {
    setViewTF(false);
  };

  return (
    <>
      {viewTF && !item.youBlock ? (
        <Card
          className="dark:border-slate-300 rounded-none border-t-0 border-l-0 border-r-0 shadow-none bg-transparent"
          onClick={openDetail}
        >
          <div className="flex flex-col dark:bg-darkMode dark:text-white">
            <div className="p-4 flex flex-col justify-between text-left">
              <div className="mb-5 font-semibold flex items-center justify-between">
                <div className="flex items-center">
                  <div className="cursor-pointer flex items-center">
                    {item.createdByProfilePicUrl ? (
                      <ProfileImage src={item.createdByProfilePicUrl} />
                    ) : (
                      <Avatar id={item.cretId} />
                    )}
                    <span className="ml-3">{item.createdByName}</span>
                  </div>
                  <span className="p-1 ml-1 text-sm text-blue-500">{item.createdByUserGrade}</span>
                  <span className="text-xs ml-1 text-slate-400 font-medium">
                    <DateDisplay isoString={item.createdDatetime}></DateDisplay>
                  </span>
                </div>
              </div>
              <div className="cursor-pointer sm:mr-10 sm:ml-10">
                <div className="font-semibold mb-7 tracking-wide">{item.subject}</div>
                <div className="mb-7 text-slate-500 dark:text-slate-300">
                  <EllipsisText text={item.contents} maxLines={10}></EllipsisText>
                </div>
              </div>
              <div className="mb-7">
                <div className="cursor-pointer flex items-center">
                  <span className="sm:ml-10 font-semibold text-sm border rounded-lg p-1 border-slate-900">
                    {item.coinCode}
                  </span>
                </div>
              </div>
              <div className="text-yellow-500 font-semibold flex">
                {item.tagList.length > 0 &&
                  item.tagList.map((tag, index) => (
                    <div className="rounded-lg p-1 mr-3 text-sm" key={index}>
                      #{tag}
                    </div>
                  ))}
              </div>
              <div className="flex mt-3 text-xs text-slate-400 font-semibold">
                <div className="mr-3 flex items-center">
                  <img src="/images/icons8-view.png" alt="viewCount" className="w-5 mr-1" />
                  <span>{item.viewCount}</span>
                </div>
                <div className="mr-3 flex items-center">
                  <img src="/images/icons8-comment.png" alt="commentCount" className="w-5 mr-1" />
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
        <FeedDetail feedId={item.feedId} onClose={closeDetail} onViewTF={feedViewTF} onLikeToggle={detailLikeToggle} />
      </Modal>
    </>
  );
};

export default IdeaCard;
