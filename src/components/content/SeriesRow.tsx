import React from 'react';
import { ContentRow } from './ContentRow';
import { type KeyPressDetails, type FocusableComponentLayout, type FocusDetails } from '../../index';

const seriesAssets = [
  { title: 'Drama Series 1', color: '#E17055' },
  { title: 'Comedy Series 2', color: '#00B894' },
  { title: 'Mystery Series 3', color: '#6C5CE7' },
  { title: 'Adventure Series 4', color: '#FDCB6E' },
  { title: 'Fantasy Series 5', color: '#E84393' },
  { title: 'Crime Series 6', color: '#00CEC9' },
  { title: 'Historical Series 7', color: '#A29BFE' },
];

interface SeriesRowProps {
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function SeriesRow({ onAssetPress, onFocus }: SeriesRowProps) {
  return (
    <ContentRow
      title="Series"
      assets={seriesAssets}
      onAssetPress={onAssetPress}
      onFocus={onFocus}
    />
  );
}