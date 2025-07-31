import styled from 'styled-components';

export const TileWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TileContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  z-index: 2;
`;

export const ESRBRating = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  z-index: 2;
`;