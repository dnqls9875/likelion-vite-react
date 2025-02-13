import { useEffect, useRef } from 'react';
import { tm } from '@/utils/tw-merge';
import { animate } from 'motion';

function AnimationBox({
  className,
  ...restProps
}: React.ComponentProps<'div'>) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxElement = boxRef.current;

    if (boxElement) {
      animate(
        // 애니메이션 대상
        boxElement,
        // 애니메이션 속성 (CSS 속성, JavaScript 객체 또는 배열 데이터, SVG, ...)
        {
          // x: 240 /* 24px 만큼 이동 */,
          rotate: -360 /* -360deg 만큼 회전 */,
          scale: 0.8,
        },
        // 애니메이션 옵션
        {
          type: 'spring',
          // repeat: 2,
          // repeatDelay: 0.2,
        }
      );
    }
  }, []);

  return (
    <div
      ref={boxRef}
      className={tm(
        'flex justify-center items-center',
        'size-30',
        'bg-react text-white text-lg font-medium',
        'rounded-lg',
        className
      )}
      {...restProps}
    />
  );
}

export default AnimationBox;
