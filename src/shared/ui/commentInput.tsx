import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { AutoResizeTextarea, Button, CommentSchema, type CommentData } from '@shared';

import { useCommentAdd, type CommentAddReq, type CommentModifyReq, useCommentModify } from '@/hooks/comment/CommentApi';

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
  const { register, handleSubmit, reset } = useForm<CommentData>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: beforeContent,
    },
  });

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { commentAddApi } = useCommentAdd();
  const { commentModifyApi } = useCommentModify();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.value = beforeContent;
    }
  }, []);

  /* 댓글 등록 */
  const commentRegist = async (values: CommentData) => {
    if (targetType) {
      const param: CommentAddReq = {
        targetId: targetId,
        targetType: targetType,
        contents: values.content,
      };
      const result = await commentAddApi(param);

      if (result) {
        /* 재조회 */
        refresh();
        reset();
      }
    }
  };

  /* 댓글 수정 */
  const commentModify = async (values: CommentData) => {
    const param: CommentModifyReq = {
      commentId: targetId,
      contents: values.content,
    };

    const result = await commentModifyApi(param);
    if (result) {
      /* 재조회 */
      refresh();
      reset();
    }
  };

  /* 대댓글 등록 */
  const commentReplyAdd = async (values: CommentData) => {
    if (targetType) {
      const param: CommentAddReq = {
        targetId: targetId,
        targetType: targetType,
        contents: values.content,
      };
      const result = await commentAddApi(param);

      if (result) {
        /* 재조회 */
        refresh();
        reset();
      }
    }
  };

  const onSubmit = (values: CommentData) => {
    if (type === 'add') {
      commentRegist(values);
    } else if (type === 'replyAdd') {
      commentReplyAdd(values);
    } else if (type === 'modify') {
      commentModify(values);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AutoResizeTextarea {...register('content')} maxHeight="100px" placeholder="Type comment..." />
        <Button className="w-full" type="submit">
          {type === 'modify' ? '수정' : '등록'}
        </Button>
      </form>
    </>
  );
};
