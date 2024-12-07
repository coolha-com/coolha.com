'use client'
import { useState } from 'react';
import { ExplorePublicationsOrderByType, PublicationMetadataMainFocusType } from '@lens-protocol/react-web';

/* export function useOrderBy() {
  const [orderBy, setOrderBy] = useState<ExplorePublicationsOrderByType>(ExplorePublicationsOrderByType.LensCurated);

  const handleOrderByChange = (type: ExplorePublicationsOrderByType) => {
    setOrderBy(type);
  };

  return { orderBy, handleOrderByChange };
} */

export const orderOptions = [
    { title: '推荐', key: ExplorePublicationsOrderByType.LensCurated },
    { title: '最新', key: ExplorePublicationsOrderByType.Latest },
    { title: '热议', key: ExplorePublicationsOrderByType.TopCommented },
    { title: '有趣', key: ExplorePublicationsOrderByType.TopMirrored },
    { title: '热门', key: ExplorePublicationsOrderByType.TopReacted },
    { title: '趋势', key: ExplorePublicationsOrderByType.TopCollectedOpenAction },
    { title: '分享', key: ExplorePublicationsOrderByType.TopQuoted },
];
