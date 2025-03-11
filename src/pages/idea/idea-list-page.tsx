import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import IdeaCard from '@/components/card/IdeaCard';
import { BoardFeature } from '@/features';
import { useAuth } from '@/router/AuthContext';
import { AutoResizeTextarea, Button, IdeaSchema, Input, TagInput, type IdeaData, type TagInputMethods } from '@/shared';
import { ListViewWidget } from '@/widgets';

const IdeaListPage = () => {
  const { isAuthenticated } = useAuth();
  const [tagList, setTagList] = useState<string[]>([]);
  const tagRef = useRef<TagInputMethods>(null);

  const { mutate: addIdea } = BoardFeature.useAddIdeaMutation();
  const { register, handleSubmit, reset } = useForm<IdeaData>({ resolver: zodResolver(IdeaSchema) });

  const ideaAdd = async (values: IdeaData) => {
    const data = {
      subject: values.title,
      contents: values.content,
      tagList,
    };

    await addIdea(data);
    reset();
    tagRef.current?.resetTags();
  };

  return (
    <>
      {isAuthenticated && (
        <form onSubmit={handleSubmit(ideaAdd)} className="flex justify-center w-auto sticky top-0 bg-white">
          <div className="mt-8 mb-8 w-4/5">
            <Input placeholder="제목" className="mb-5" {...register('title')} />
            <TagInput onChange={setTagList} ref={tagRef} />
            <AutoResizeTextarea {...register('content')} />
            <div className="flex justify-end mt-5">
              <Button type="submit">Post</Button>
            </div>
          </div>
        </form>
      )}
      <div className="border border-slate-300 rounded-lg py-1">
        <ListViewWidget.InfiniteListTemplate
          query={BoardFeature.useSelectIdeaListInfiniteQuery(10)}
          renderItem={item => <IdeaCard key={item.id} item={item} />}
        />
      </div>
    </>
  );
};

export default IdeaListPage;
