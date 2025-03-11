import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import FeedCard from '@/components/card/FeedCard';
import CodeList from '@/components/modal/CodeList';
import Modal from '@/components/modal/Modal';
import { BoardFeature } from '@/features';
import { useAuth } from '@/router/AuthContext';
import {
  AutoResizeTextarea,
  Button,
  closeModal,
  FeedSchema,
  Input,
  openModal,
  TagInput,
  type FeedData,
  type TagInputMethods,
} from '@/shared';
import { ListViewWidget } from '@/widgets';

const FeedListPage = () => {
  const { isAuthenticated } = useAuth();
  const [tagList, setTagList] = useState<string[]>([]);
  const tagRef = useRef<TagInputMethods>(null);
  const [keywordModal, setKeywordModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [code, setCode] = useState('');

  const { mutate: addFeed } = BoardFeature.useAddFeedMutation();
  const { register, handleSubmit, reset } = useForm<FeedData>({ resolver: zodResolver(FeedSchema) });

  const onSubmit = async ({ title, content }: FeedData) => {
    const data = {
      code,
      subject: title,
      contents: content,
      tagList,
    };

    await addFeed(data);
    reset();
    setCode('');
    tagRef.current?.resetTags();
  };

  const closeKeyword = () => {
    closeModal();
    setKeywordModal(false);
  };

  const searchKeywordSelect = (codeValue: string) => {
    setCode(codeValue);
    closeKeyword();
  };

  const addKeywordSelect = (codeValue: string) => {
    setCode(codeValue);
    closeKeyword();
  };

  const openKeyword = (type: string) => {
    openModal();
    setModalType(type);
    setKeywordModal(true);
  };

  return (
    <>
      {isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
          <div className="mt-8 mb-8 w-4/5">
            <Input placeholder="제목" className="mb-5" {...register('title')} />
            <div className="flex mt-8 mb-8">
              <Input placeholder="종목을 선택해주세요" value={code} disabled />
              <Button type="button" onClick={() => openKeyword('search')}>
                종목 검색
              </Button>
            </div>
            <TagInput ref={tagRef} onChange={setTagList} />
            <AutoResizeTextarea {...register('content')} />
            <div className="flex justify-end mt-5">
              <Button type="submit">Post</Button>
            </div>
          </div>
        </form>
      )}
      <div className="border border-slate-300 rounded-lg py-1">
        <ListViewWidget.InfiniteListTemplate
          query={BoardFeature.useSelectFeedListInfiniteQuery(10)}
          renderItem={item => <FeedCard key={item.id} item={item} />}
        />
      </div>
      <Modal isOpen={keywordModal} onClose={closeKeyword}>
        <CodeList onSearchSelect={searchKeywordSelect} onAddSelect={addKeywordSelect} type={modalType} />
      </Modal>
    </>
  );
};

export default FeedListPage;
