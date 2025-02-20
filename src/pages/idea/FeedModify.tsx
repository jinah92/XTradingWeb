import React, { useRef, useState } from 'react';
/* hook */
import { FeedDetail, useFeedModify, FeedModifyReq } from '@/hooks/feed/FeedApi';
/* component */
import { AutoResizeTextarea, Button, Input, TagInput } from '@shared/ui';

type Props = {
  data: FeedDetail;
  feedMethod: () => void;
};

const IssueModify = ({ data, feedMethod }: Props) => {
  // feed 저장 변수
  const [subject, setSubject] = useState(data.subject);
  const [contents, setContents] = useState(data.contents);
  const [tagList, setTagList] = useState<string[]>(data.tagList);
  const [addCode, setAddCode] = useState(data.coinInfo.code);
  const tagInputRef = useRef<{ resetTags: () => void }>(null); // TagInput의 resetTags에 접근할 ref

  const { feedModifyApi } = useFeedModify();

  const feedModify = async () => {
    const param: FeedModifyReq = {
      feedId: data.feedId,
      code: addCode,
      subject: subject,
      contents: contents,
      tagList: tagList,
    };

    const addResult = await feedModifyApi(param);

    if (addResult) {
      feedMethod();
    }
  };

  return (
    <>
      <div className="border-t border-b flex justify-center">
        <div className="mt-8 mb-8 w-4/5">
          <Input placeholder="제목" className="mb-5" onChange={e => setSubject(e.target.value)} value={subject} />
          <div className="flex mt-8 mb-8">
            <Input placeholder="종목을 선택해주세요." value={addCode} disabled={true} />
            {/* <Button onClick={() => openKeyword('add')}>검색</Button> */}
          </div>
          <TagInput onChange={setTagList} ref={tagInputRef} />
          <AutoResizeTextarea value={contents} onChange={setContents} />
          <div className="flex justify-end mt-5">
            <Button onClick={feedModify}>수정</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default IssueModify;
