import React, { useRef, useState, type TextareaHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { AutoResizeTextarea, Button, IdeaSchema, Input, TagInput, type FeedData, type IdeaData } from '@shared';

import { type BoardDetail, useIdeaModify, type BoardModifyReq } from '@/hooks/idea/IdeaApi';

type Props = {
  data: BoardDetail;
  ideaMethod: () => void;
};

const IssueModify = ({ data, ideaMethod }: Props) => {
  const { register, handleSubmit } = useForm<IdeaData>({
    resolver: zodResolver(IdeaSchema),
    defaultValues: {
      title: data.subject,
      content: data.contents,
    },
  });

  // issue 저장 변수
  const [tagList, setTagList] = useState<string[]>(data.tagList);
  const tagInputRef = useRef<{ resetTags: () => void }>(null); // TagInput의 resetTags에 접근할 ref

  const { ideaModifyApi } = useIdeaModify();

  const ideaModify = async (values: IdeaData) => {
    const param: BoardModifyReq = {
      boardId: data.boardId,
      subject: values.title,
      contents: values.content,
      tagList: tagList,
    };

    const addResult = await ideaModifyApi(param);

    if (addResult) {
      ideaMethod();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(ideaModify)} className="border-t border-b flex justify-center">
        <div className="mt-8 mb-8 w-4/5">
          <Input placeholder="제목" className="mb-5" {...register('title')} />
          <TagInput onChange={setTagList} ref={tagInputRef} tagList={data.tagList} />
          <AutoResizeTextarea {...register('content')} />
          <div className="flex justify-end mt-5">
            <Button type="submit">수정</Button>
          </div>
        </div>
      </form>
    </>
  );
};
export default IssueModify;
