import React, { useState } from "react";
/* hook */
import { useCommentAdd, commentAddReq } from "@/hooks/comment/CommentApi";
/* component */
import AutoResizeTextarea from "@/components/ui/autoResizeTextarea";
import { Button } from "@/components/ui/button";

interface ParentComponentProps {
  targetType : string;
  targetId: string;
  refresh: () => void;
}

const CommentInput = ({ targetType, targetId, refresh }:ParentComponentProps) => {

  const [contents, setContents] = useState("");
  const { commentAddApi } = useCommentAdd();

  /* 댓글 등록 */
  const commentRegist = async () => {
    const param:commentAddReq = {
      targetId: targetId,
      targetType: targetType,
      contents: contents
    }
    await commentAddApi(param);
    /* 재조회 */
    refresh();
  }


  return (
    <>
      <div>
        <AutoResizeTextarea value={contents} onChange={setContents} maxHeight="100px" placeholder="Type comment..."></AutoResizeTextarea>
        <Button onClick={commentRegist}>등록</Button>
      </div>
    </>
  );
}
export default CommentInput;