import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NewsCard from '@/components/card/NewsCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useNewsRss } from '@/features/news';

import type { NewsType } from '@/entities/news/types';

const News = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: NewsType }>();
  const { data, isLoading } = useNewsRss(id);

  useEffect(() => {
    if (id === undefined) {
      navigate('/news/mk');
    }
  }, [id]);

  return (
    <div className="flex flex-col">
      {isLoading && <LoadingSpinner />}
      {data?.map(item => <NewsCard item={item} />)}
    </div>
  );
};

export default News;
