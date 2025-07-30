import styled from 'styled-components';
import { useFocusable } from '../../index';

const NavbarContainer = styled.div`
  width: 100%;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  position: relative;
  z-index: 100;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-right: 15px;
`;

const AppName = styled.div`
  color: white;
  font-size: 28px;
  font-weight: 600;
  font-family: 'Segoe UI', sans-serif;
`;

const ProfileSection = styled.div<{ $focused: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 25px;
  background: ${({ $focused }) => $focused ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: ${({ $focused }) => $focused ? '2px solid white' : '2px solid transparent'};
  transition: all 0.3s ease;
  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f093fb, #f5576c);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.2;
`;

const ProfileStatus = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-family: 'Segoe UI', sans-serif;
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