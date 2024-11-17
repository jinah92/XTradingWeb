import React, { useRef, useState } from "react";
/* hook */
import {
  BoardDetail,
  useIdeaModify,
  BoardModifyReq,
} from "@/hooks/idea/IdeaApi";
/* component */
import { Input } from "@/components/ui/input";
import TagInput from "@/components/ui/tagInput";
import AutoResizeTextarea from "@/components/ui/autoResizeTextarea";
import { Button } from "@/components/ui/button";

type Props = {
  data: BoardDetail;
  ideaMethod: () => void;
};

const IssueModify = ({ data, ideaMethod }: Props) => {
  // issue 저장 변수
  const [subject, setSubject] = useState(data.subject);
  const [contents, setContents] = useState(data.contents);
  const [tagList, setTagList] = useState<string[]>(data.tagList);
  const tagInputRef = useRef<{ resetTags: () => void }>(null); // TagInput의 resetTags에 접근할 ref

  const { ideaModifyApi } = useIdeaModify();

  const ideaModify = async () => {
    const param: BoardModifyReq = {
      boardId: data.boardId,
      subject: subject,
      contents: contents,
      tagList: tagList,
    };

    const addResult = await ideaModifyApi(param);

    if (addResult) {
      ideaMethod();
    }
  };

  return (
    <>
      <div className="border-t border-b flex justify-center">
        <div className="mt-8 mb-8 w-4/5">
          <Input
            placeholder="제목"
            className="mb-5"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
          />
          <TagInput
            onChange={setTagList}
            ref={tagInputRef}
            tagList={data.tagList}
          />
          <AutoResizeTextarea value={contents} onChange={setContents} />
          <div className="flex justify-end mt-5">
            <Button onClick={ideaModify}>수정</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default IssueModify;
