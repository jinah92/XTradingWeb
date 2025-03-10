import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { AutoResizeTextarea, Button, FeedSchema, Input, TagInput, type FeedData } from '@shared';

import { useFeedModify, type FeedDetail, type FeedModifyReq } from '@/hooks/feed/FeedApi';

type Props = {
  data: FeedDetail;
  feedMethod: () => void;
};

const IssueModify = ({ data, feedMethod }: Props) => {
  const code = data.coinInfo.code;
  const { register, handleSubmit } = useForm<FeedData>({
    resolver: zodResolver(FeedSchema),
    defaultValues: {
      title: data.subject,
      content: data.contents,
    },
  });

  // feed 저장 변수
  const [tagList, setTagList] = useState<string[]>(data.tagList);

  const tagInputRef = useRef<{ resetTags: () => void }>(null); // TagInput의 resetTags에 접근할 ref

  const { feedModifyApi } = useFeedModify();

  const feedModify = async (values: FeedData) => {
    const param: FeedModifyReq = {
      feedId: data.feedId,
      code,
      subject: values.title,
      contents: values.content,
      tagList: tagList,
    };

    const addResult = await feedModifyApi(param);

    if (addResult) {
      feedMethod();
    }
  };

  return (
    <form onSubmit={handleSubmit(feedModify)} className="border-t border-b flex justify-center">
      <div className="mt-8 mb-8 w-4/5">
        <Input placeholder="제목" className="mb-5" {...register('title')} />
        <div className="flex mt-8 mb-8">
          <Input placeholder="종목을 선택해주세요." value={code} disabled />
          {/* <Button onClick={() => openKeyword('add')}>검색</Button> */}
        </div>
        <TagInput onChange={setTagList} ref={tagInputRef} />
        <AutoResizeTextarea {...register('content')} />
        <div className="flex justify-end mt-5">
          <Button type="submit">수정</Button>
        </div>
      </div>
    </form>
  );
};
export default IssueModify;
