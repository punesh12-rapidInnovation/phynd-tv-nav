import React from 'react';
import { ContentRow } from './ContentRow';
import { type KeyPressDetails, type FocusableComponentLayout, type FocusDetails } from '../../index';

const recommendedAssets = [
  { title: 'Recommended Asset 1', color: '#714ADD' },
  { title: 'Recommended Asset 2', color: '#AB8DFF' },
  { title: 'Recommended Asset 3', color: '#512EB0' },
  { title: 'Recommended Asset 4', color: '#714ADD' },
  { title: 'Recommended Asset 5', color: '#AB8DFF' },
];

interface RecommendedRowProps {
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function RecommendedRow({ onAssetPress, onFocus }: RecommendedRowProps) {
  return (
    <ContentRow
      title="Recommended"
      assets={recommendedAssets}
      onAssetPress={onAssetPress}
      onFocus={onFocus}
    />
  );
}