import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { useToast } from "@/hooks/use-toast";

interface TagInputProps {
  placeholder?: string;
  onChange: (tags: string[]) => void;
  tagList?: string[];
}

const TagInput = forwardRef(({ placeholder = '태그', onChange, tagList = [] }: TagInputProps, ref) => {
  const [tags, setTags] = useState<string[]>(tagList || []);
  const [inputValue, setInputValue] = useState<string>('');
  const { toast } = useToast();

  useImperativeHandle(ref, () => ({
    resetTags: () => {
      setTags([]);
      setInputValue('');
    },
  }));

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      const trimmedValue = inputValue.trim();

      if(trimmedValue.length > 10) {
        toast({description: '10자 이내로 입력하세요.', duration: 2000});
        setInputValue('');
        return;
      }

      if (!tags.includes(trimmedValue)) {
        const newTags = [...tags, trimmedValue];
        setTags(newTags);
        setInputValue('');
        onChange(newTags);
      } else {
        toast({description: `"${trimmedValue}"는 이미 존재하는 태그입니다.`, duration: 2000});
        setInputValue('');
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags);
  };


  return (
    <div className='mb-3 text-sm'>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={addTag}
        className="mb-3 h-9 outline-none flex-grow px-3 py-1 w-full rounded-md border border-input dark:border-slate-300 bg-transparent dark:text-white"
      />
      <div className="flex items-center flex-wrap p-2">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-slate-900 text-white px-2 py-1 rounded-lg mr-2 mb-2">
            {tag}
            <button type="button" onClick={() => removeTag(index)} className="ml-2 text-white focus:outline-none">
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TagInput;
