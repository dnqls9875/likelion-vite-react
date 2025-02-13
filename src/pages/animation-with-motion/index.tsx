import { useState } from 'react';
import { tm } from '@/utils/tw-merge';
import { Box, Redo } from '@mynaui/icons-react';
import AnimationBox from './components/animation-box';

function AnimationWithMotionPage() {
  // 화면 업데이트를 위한 상태 선언
  const [replayKey, setReplayKey] = useState(0);

  // 상태 업데이트 감지해서 이펙트 처리
  // useEffect(() => {
  //   console.log({ replayKey });
  // }, [replayKey]);

  const handleReplay = () => {
    setReplayKey((r) => r + 1);
  };

  return (
    <section className="flex flex-col items-start gap-7">
      <h2 className="text-2xl font-medium">
        애니메이션 - Motion 라이브러리 활용
      </h2>

      <button
        type="button"
        onClick={handleReplay}
        className={tm(
          'cursor-pointer',
          'flex items-center gap-1.5 px-3.5 py-2 rounded-lg',
          'bg-react text-white text-sm font-semibold uppercase',
          'active:scale-95'
        )}
      >
        <Redo size={18} />
        Replay
      </button>

      <AnimationBox key={replayKey}>
        <Box size={32} />
      </AnimationBox>
    </section>
  );
}

export default AnimationWithMotionPage;
