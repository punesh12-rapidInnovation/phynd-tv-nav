import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable, type KeyPressDetails } from '../../index';
import { ProgressBar } from '../ui/ProgressBar';
import { RecommendedRow } from './RecommendedRow';
import { MoviesRow } from './MoviesRow';
import { SeriesRow } from './SeriesRow';
import { TVChannelsRow } from './TVChannelsRow';
import { SportRow } from './SportRow';
import { type AssetProps } from '../ui/Asset';

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  color: white;
  font-size: 48px;
  font-weight: 600;
  font-family: 'Segoe UI';
  text-align: center;
  margin-top: 52px;
  margin-bottom: 37px;
`;

const SelectedItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface SelectedItemBoxProps {
  color: string;
}

const SelectedItemBox = styled.div<SelectedItemBoxProps>`
  height: 282px;
  width: 1074px;
  background-color: ${({ color }) => color};
  margin-bottom: 37px;
  border-radius: 7px;
`;

const SelectedItemTitle = styled.div`
  position: absolute;
  bottom: 75px;
  left: 100px;
  color: white;
  font-size: 27px;
  font-weight: 400;
  font-family: 'Segoe UI';
`;

const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

interface ContentProps {
  title?: string;
}

export function Content({
  title = "Norigin Spatial Navigation"
}: ContentProps) {
  const { ref, focusKey } = useFocusable();

  const [selectedAsset, setSelectedAsset] = useState<AssetProps | null>(null);

  const onAssetPress = useCallback((asset: object) => {
    setSelectedAsset(asset as AssetProps);
  }, []);

  const onRowFocus = useCallback(
    ({ y }: { y: number }) => {
      (ref.current as HTMLDivElement)?.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <ContentWrapper>
        {/* <ContentTitle>{title}</ContentTitle> */}
        {/* <SelectedItemWrapper>
          <SelectedItemBox
            color={selectedAsset ? selectedAsset.color : '#565b6b'}
          />
          <SelectedItemTitle>
            {selectedAsset
              ? selectedAsset.title
              : 'Press "Enter" to select an asset'}
          </SelectedItemTitle>
          <ProgressBar />
        </SelectedItemWrapper> */}
        <ScrollingRows ref={ref}>
          <div>
            <RecommendedRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <MoviesRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <SeriesRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <TVChannelsRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
            <SportRow onAssetPress={onAssetPress} onFocus={onRowFocus} />
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}