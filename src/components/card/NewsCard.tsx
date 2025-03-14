import React from 'react';

import { Card } from '@shared';

import type { MkNewsViewModel, CointelegrpahNewsViewModel } from '@/entities/news';

interface NewsCardProps {
  item: MkNewsViewModel | CointelegrpahNewsViewModel;
}

const NewsCard = ({ item: { title, sumbnail, description, link } }: NewsCardProps) => {
  const fallbackImage = '/images/no-image.png';

  return (
    <Card
      className="mb-5 transition-transform duration-300 hover:scale-101 dark:border-slate-300 cursor-pointer text-ellipsis"
      onClick={() => window.open(link)}
    >
      <div className="flex flex-col sm:flex-row dark:bg-darkMode dark:text-white rounded-xl">
        <div className="flex w-full sm:w-48 justify-center">
          <div className="w-full sm:w-52 h-32 overflow-hidden">
            <img className="object-fill w-full h-full rounded-xl" src={sumbnail || fallbackImage} alt={title} />
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between">
          <p className="text-lg font-semibold mb-2 text-left">{title}</p>
          <p
            className="text-gray-700 dark:text-white text-left text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
