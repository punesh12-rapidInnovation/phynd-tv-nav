import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { ContentRow } from '../components/content/ContentRow';
import { Asset } from '../components/ui/Asset';

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;


const ScrollingRows = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
`;

const accountSettings = [
  { title: 'Profile Settings', color: '#3498DB' },
  { title: 'Privacy Settings', color: '#E74C3C' },
  { title: 'Parental Controls', color: '#F39C12' },
  { title: 'Account Info', color: '#27AE60' },
  { title: 'Subscription', color: '#8E44AD' },
  { title: 'Payment Methods', color: '#E67E22' },
];

const displaySettings = [
  { title: 'Video Quality', color: '#2ECC71' },
  { title: 'Audio Settings', color: '#3498DB' },
  { title: 'Subtitles', color: '#E74C3C' },
  { title: 'Display Mode', color: '#F39C12' },
  { title: 'Screen Size', color: '#9B59B6' },
  { title: 'Brightness', color: '#1ABC9C' },
];

const systemSettings = [
  { title: 'Network Settings', color: '#34495E' },
  { title: 'Storage Management', color: '#95A5A6' },
  { title: 'System Updates', color: '#E67E22' },
  { title: 'Device Info', color: '#2C3E50' },
  { title: 'Reset Options', color: '#C0392B' },
  { title: 'About', color: '#7F8C8D' },
];

export function SettingsPage() {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusable: true,
    autoRestoreFocus: true,
    trackChildren: true
  });

  // Focus the page when it mounts
  React.useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  const onAssetPress = useCallback((asset: object) => {
    // Handle asset press
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
        <ScrollingRows ref={ref}>
          <div>
            <ContentRow
              title="Account Settings"
              items={accountSettings}
              renderItem={(item, index) => (
                <Asset
                  index={index}
                  title={item.title}
                  color={item.color}
                  onEnterPress={onAssetPress}
                  onFocus={() => {}}
                  enableNavigation={true}
                />
              )}
              onFocus={onRowFocus}
            />
            <ContentRow
              title="Display & Audio"
              items={displaySettings}
              renderItem={(item, index) => (
                <Asset
                  index={index}
                  title={item.title}
                  color={item.color}
                  onEnterPress={onAssetPress}
                  onFocus={() => {}}
                  enableNavigation={true}
                />
              )}
              onFocus={onRowFocus}
            />
            <ContentRow
              title="System Settings"
              items={systemSettings}
              renderItem={(item, index) => (
                <Asset
                  index={index}
                  title={item.title}
                  color={item.color}
                  onEnterPress={onAssetPress}
                  onFocus={() => {}}
                  enableNavigation={true}
                />
              )}
              onFocus={onRowFocus}
            />
          </div>
        </ScrollingRows>
      </ContentWrapper>
    </FocusContext.Provider>
  );
}