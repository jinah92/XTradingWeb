import React, { useState } from 'react';
/* hook */
import { useCommentAdd, CommentAddReq, CommentModifyReq, useCommentModify } from '@/hooks/comment/CommentApi';
/* component */
import { AutoResizeTextarea, Button } from '@shared/ui';

interface ParentComponentProps {
  targetType?: string;
  targetId: string;
  beforeContent?: string;
  type?: string;
  refresh: () => void;
}

export const CommentInput = ({
  targetType,
  targetId,
  beforeContent = '',
  type = 'add',
  refresh,
}: ParentComponentProps) => {
  const [contents, setContents] = useState(beforeContent);
  const { commentAddApi } = useCommentAdd();
  const { commentModifyApi } = useCommentModify();

  /* 댓글 등록 */
  const commentRegist = async () => {
    if (targetType) {
      const param: CommentAddReq = {
        targetId: targetId,
        targetType: targetType,
        contents: contents,
      };
      const result = await commentAddApi(param);

      if (result) {
        /* 재조회 */
        refresh();
        setContents('');
      }
    }
  };

  /* 댓글 수정 */
  const commentModify = async () => {
    const param: CommentModifyReq = {
      commentId: targetId,
      contents: contents,
    };

    const result = await commentModifyApi(param);
    if (result) {
      /* 재조회 */
      refresh();
      setContents('');
    }
  };

  /* 대댓글 등록 */
  const commentReplyAdd = async () => {
    if (targetType) {
      const param: CommentAddReq = {
        targetId: targetId,
        targetType: targetType,
        contents: contents,
      };
      const result = await commentAddApi(param);

      if (result) {
        /* 재조회 */
        refresh();
        setContents('');
      }
    }
  };

  return (
    <>
      <div>
        <AutoResizeTextarea
          value={contents}
          onChange={setContents}
          maxHeight="100px"
          placeholder="Type comment..."
        ></AutoResizeTextarea>
        {
          // 댓글 등록
          type == 'add' ? (
            <Button className="w-full" onClick={commentRegist}>
              등록
            </Button>
          ) : // 대댓글 등록
          type === 'replyAdd' ? (
            <Button className="w-full" onClick={commentReplyAdd}>
              등록
            </Button>
          ) : (
            // 댓글 수정
            <Button className="w-full" onClick={commentModify}>
              수정
            </Button>
          )
        }
      </div>
    </>
  );
};
