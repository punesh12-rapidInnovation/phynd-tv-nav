import { useFocusable, type FocusableComponentLayout, type FocusDetails, type KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation';
import { CardBox } from '../../components/ui/CardBox';
import { CardOverlay } from '../../components/ui/CardOverlay';
import { StarRating } from '../../components/ui/StarRating';
import { ESRBRating, TileContent, TileWrapper } from './GameTile.styles';

export interface GameTileProps {
  index: number;
  name: string;
  imageUrl?: string;
  starRating?: number;
  esrbRating?: string;
  width?: string;
  height?: string;
  onEnterPress?: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

export function GameTile({
  index,
  name,
  imageUrl,
  starRating = 0,
  esrbRating = 'E',
  width = '428px',
  height = '240px',
  onEnterPress,
  onFocus,
}: GameTileProps) {

 

  const { ref, focused } = useFocusable({
    focusKey: `${name}-${index}`,
    onEnterPress,
    onFocus,
    extraProps: {
      name,
      starRating,
      esrbRating,
      imageUrl,
      index
    }
  });

  return (
    <TileWrapper ref={ref}>
      <CardBox
        focused={focused}
        imageUrl={imageUrl}
        width={width}
        height={height}
        borderRadius="7px"
      >
        <CardOverlay focused={focused} borderRadius="7px" />
        <TileContent>
          <StarRating rating={starRating} />
          <ESRBRating>{esrbRating}</ESRBRating>
        </TileContent>
      </CardBox>
    </TileWrapper>
  );
}