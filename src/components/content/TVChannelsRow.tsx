import React from 'react';
import { ContentRow } from './ContentRow';
import { Asset } from '../ui/Asset';
import { type KeyPressDetails, type FocusableComponentLayout, type FocusDetails } from '@noriginmedia/norigin-spatial-navigation';

const tvChannelsAssets = [
  { title: 'News Channel 1', color: '#FF7675' },
  { title: 'Sports Channel 2', color: '#74B9FF' },
  { title: 'Discovery Channel 3', color: '#00B894' },
  { title: 'Music Channel 4', color: '#FDCB6E' },
  { title: 'Kids Channel 5', color: '#E17055' },
  { title: 'Documentary Channel 6', color: '#6C5CE7' },
  { title: 'Lifestyle Channel 7', color: '#FD79A8' },
  { title: 'Food Channel 8', color: '#00CEC9' },
];

interface TVChannelsRowProps {
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function TVChannelsRow({ onAssetPress, onFocus }: TVChannelsRowProps) {
  return (
    <ContentRow
      title="TV Channels"
      items={tvChannelsAssets}
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