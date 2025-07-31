import React from 'react';
import { ContentRow } from './ContentRow';
import { Asset } from '../ui/Asset';
import { type KeyPressDetails, type FocusableComponentLayout, type FocusDetails } from '@noriginmedia/norigin-spatial-navigation';

const moviesAssets = [
  { title: 'Action Movie 1', color: '#FF6B6B' },
  { title: 'Comedy Movie 2', color: '#4ECDC4' },
  { title: 'Drama Movie 3', color: '#45B7D1' },
  { title: 'Thriller Movie 4', color: '#96CEB4' },
  { title: 'Romance Movie 5', color: '#FFEAA7' },
  { title: 'Sci-Fi Movie 6', color: '#DDA0DD' },
];

interface MoviesRowProps {
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function MoviesRow({ onAssetPress, onFocus }: MoviesRowProps) {
  return (
    <ContentRow
      title="Movies"
      items={moviesAssets}
      renderItem={(item, index) => (
        <Asset
          index={index}
          title={item.title}
          color={item.color}
          onEnterPress={onAssetPress}
          onFocus={() => {}} // Empty function for individual card focus
          enableNavigation={true}
        />
      )}
      onFocus={onFocus}
    />
  );
}