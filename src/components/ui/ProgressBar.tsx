import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

interface ProgressBarWrapperProps {
  $focused: boolean;
}

interface ProgressBarProgressProps {
  $percent: number;
  $focused: boolean;
}

const ProgressBarWrapper = styled.div<ProgressBarWrapperProps>`
  position: absolute;
  bottom: 95px;
  right: 100px;
  width: 540px;
  height: 24px;
  background-color: gray;
  border-radius: 21px;
  border-color: white;
  border-style: solid;
  border-width: ${({ $focused }) => ($focused ? '6px' : 0)};
  box-sizing: border-box;
`;

const ProgressBarProgress = styled.div<ProgressBarProgressProps>`
  width: ${({ $percent }) => `${$percent}%`};
  height: 100%;
  background-color: ${({ $focused }) =>
    $focused ? 'deepskyblue' : 'dodgerblue'};
  border-radius: 21px;
`;

const defaultPercent = 10;
const seekPercent = 10;
const delayedTime = 100;
const DIRECTION_RIGHT = 'right';

export function ProgressBar() {
  const [percent, setPercent] = useState(defaultPercent);
  const timerRef = useRef<number | null>(null);
  
  const { ref, focused } = useFocusable({
    onArrowPress: (direction: string) => {
      if (direction === DIRECTION_RIGHT && timerRef.current === null) {
        timerRef.current = window.setInterval(() => {
          setPercent((prevPercent) =>
            prevPercent >= 100 ? prevPercent : prevPercent + seekPercent
          );
        }, delayedTime);
        return true;
      }
      return true;
    },
    onArrowRelease: (direction: string) => {
      if (direction === DIRECTION_RIGHT && timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  });

  useEffect(() => {
    if (!focused) {
      setPercent(defaultPercent);
    }
  }, [focused]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    },
    []
  );

  return (
    <ProgressBarWrapper ref={ref} $focused={focused}>
      <ProgressBarProgress $percent={percent} $focused={focused} />
    </ProgressBarWrapper>
  );
}