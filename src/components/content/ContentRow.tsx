import { FocusContext, useFocusable, type FocusableComponentLayout, type FocusDetails } from '@noriginmedia/norigin-spatial-navigation';
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';


const ContentRowWrapper = styled.div`
  margin-bottom: 37px;
`;

const ContentRowTitle = styled.div`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: 'Segoe UI';
`;

const ContentRowScrollingWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const ContentRowScrollingContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

interface ContentRowProps {
  title: string;
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
  enableNavigation?: boolean;
}

export function ContentRow({
  title: rowTitle,
  items,
  renderItem,
  onFocus,
  enableNavigation = false
}: ContentRowProps) {
  const { ref, focusKey } = useFocusable({
    onFocus,
    saveLastFocusedChild: false,
    preferredChildFocusKey: `${rowTitle}-0`,
    autoRestoreFocus: true
  });

  const scrollingRef = useRef<HTMLDivElement>(null);

  const onItemFocus = useCallback(
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
            {items?.map((item, index) => {
              // Clone the rendered item and inject the onFocus callback
              const renderedItem = renderItem(item, index);
              if (React.isValidElement(renderedItem)) {
                return React.cloneElement(renderedItem, {
                  key: `${rowTitle}-${index}`,
                  onFocus: onItemFocus
                } as any);
              }
              return (
                <React.Fragment key={`${rowTitle}-${index}`}>
                  {renderedItem}
                </React.Fragment>
              );
            })}
          </ContentRowScrollingContent>
        </ContentRowScrollingWrapper>
      </ContentRowWrapper>
    </FocusContext.Provider>
  );
}