import { useState, type ChangeEvent } from 'react';

import { Button, Input } from '@/shared';

export const IdeaSearchBar = () => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDownPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      /* TODO 
            load data query
        */
    }
  };

  const searchData = () => {};

  return (
    <div className="flex">
      <Input placeholder="search..." value={keyword} onChange={handleChange} onKeyDown={handleKeyDownPress} />
      <Button onClick={searchData}>검색</Button>
    </div>
  );
};
