import styled from 'styled-components';

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.iconGold};
  font-size: 24px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

const StarIcon = styled.span`
  font-size: 24px;
`;

const HalfStarIcon = styled.span`
  font-size: 24px;
  background: linear-gradient(90deg, ${({ theme }) => theme.iconGold} 50%, ${({ theme }) => theme.iconGold}4D 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  className?: string;
}

export function StarRating({ 
  rating, 
  maxStars = 5, 
  className 
}: StarRatingProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const decimal = rating % 1;
    const hasHalfStar = decimal > 0;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`}>★</StarIcon>);
    }
    
    // Half star - show half-filled star if decimal is 0.5, otherwise show outline
    if (hasHalfStar) {
      if (decimal === 0.5) {
        stars.push(<HalfStarIcon key="half">★</HalfStarIcon>);
      } else {
        stars.push(<StarIcon key="half">☆</StarIcon>);
      }
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} style={{ opacity: 0.3 }}>☆</StarIcon>);
    }
    
    return stars;
  };

  return (
    <StarContainer className={className}>
      {renderStars()}
    </StarContainer>
  );
}