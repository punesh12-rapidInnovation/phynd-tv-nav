import styled from 'styled-components';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { semanticBorderRadius } from '../../styles/theme/borderRadius';

const NavbarContainer = styled.div`
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.surfaceSecondaryOpacity100};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  position: relative;
  z-index: 100;
  border-bottom: 1px solid ${({ theme }) => theme.surfaceSecondaryOpacity60};
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.iconTertiary};
  border-radius: ${semanticBorderRadius.component.card};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.textPrimary};
  margin-right: 15px;
`;

const AppName = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 28px;
  font-weight: 600;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const ProfileSection = styled.div<{ $focused: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: ${semanticBorderRadius.interactive.large};
  background: ${({ $focused, theme }) =>
    $focused ? theme.surfaceSecondaryOpacity60 : theme.surfaceSecondaryOpacity40};
  border: ${({ $focused, theme }) =>
    $focused ? `2px solid ${theme.outlineStrokeFocusWhite}` : '2px solid transparent'};
  transition: all 0.3s ease;
  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: ${semanticBorderRadius.component.avatar};
  background: ${({ theme }) => theme.iconTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.textPrimary};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 16px;
  font-weight: 600;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.2;
`;

const ProfileStatus = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 12px;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

interface TopNavbarProps {
  userName?: string;
  userInitials?: string;
  onProfileClick?: () => void;
}

export function TopNavbar({ 
  userName = "John Doe", 
  userInitials = "JD",
  onProfileClick 
}: TopNavbarProps) {
  const { ref, focused } = useFocusable({
    onEnterPress: () => {
      if (onProfileClick) {
        onProfileClick();
      }
    }
  });

  return (
    <NavbarContainer>
      <LogoSection>
        <Logo>TV</Logo>
        <AppName>StreamHub</AppName>
      </LogoSection>
      
      <ProfileSection ref={ref} $focused={focused} onClick={onProfileClick}>
        <ProfileImage>{userInitials}</ProfileImage>
        <ProfileInfo>
          <ProfileName>{userName}</ProfileName>
          <ProfileStatus>Premium Member</ProfileStatus>
        </ProfileInfo>
      </ProfileSection>
    </NavbarContainer>
  );
}