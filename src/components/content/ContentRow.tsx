import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable, type FocusableComponentLayout, type FocusDetails, type KeyPressDetails } from '../../index';
import { Asset, type AssetProps } from '../ui/Asset';

const ContentRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const ContentRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
  padding-left: 60px;
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 60px;
`;

const ContentRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
`;

interface ContentRowProps {
  title: string;
  assets: Array<{ title: string; color: string }>;
  onAssetPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function ContentRow({
  title: rowTitle,
  assets,
  onAssetPress,
  onFocus
}: ContentRowProps) {
  const { ref, focusKey } = useFocusable({
    onFocus,
    saveLastFocusedChild: false,
    preferredChildFocusKey: `${rowTitle}-0`
  });

  const scrollingRef = useRef<HTMLDivElement>(null);

  const onAssetFocus = useCallback(
    ({ x }: { x: number }) => {
      scrollingRef.current?.scrollTo({
        left: x,
        behavior: 'smooth'
      });
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentRowWrapper ref={ref}>
        <ContentRowTitle>{rowTitle}</ContentRowTitle>
        <ContentRowScrollingWrapper ref={scrollingRef}>
          <ContentRowScrollingContent>
            {assets.map(({ title, color }, index) => (
              <Asset
                index={index}
                title={title}
                key={`${rowTitle}-${index}`}
                color={color}
                onEnterPress={onAssetPress}
                onFocus={onAssetFocus}
              />
            ))}
          </ContentRowScrollingContent>
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}