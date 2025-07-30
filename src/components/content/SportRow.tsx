import React from 'react';
import { ContentRow } from './ContentRow';
import { type KeyPressDetails, type FocusableComponentLayout, type FocusDetails } from '../../index';

const sportAssets = [
  { title: 'Football Match 1', color: '#00B894' },
  { title: 'Basketball Game 2', color: '#E17055' },
  { title: 'Tennis Tournament 3', color: '#0984E3' },
  { title: 'Baseball Game 4', color: '#FDCB6E' },
  { title: 'Soccer World Cup 5', color: '#00CEC9' },
  { title: 'Olympics Highlights 6', color: '#6C5CE7' },
  { title: 'Golf Championship 7', color: '#A29BFE' },
  { title: 'Swimming Competition 8', color: '#FD79A8' },
  { title: 'Boxing Match 9', color: '#FF7675' },
];

interface SportRowProps {
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function SportRow({ onAssetPress, onFocus }: SportRowProps) {
  return (
    <ContentRow
      title="Sport"
      assets={sportAssets}
      onAssetPress={onAssetPress}
      onFocus={onFocus}
    />
  );
}