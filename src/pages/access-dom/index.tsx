import { useEffect, useRef, useState } from 'react';
import { Search } from '@mynaui/icons-react';
import { tm } from '@/utils/tw-merge';
import TiltBox from './components/tilt-box';

function AccessDOMPage() {
  const [isParse, setIsParse] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 1000);
  }, []);

  // 마크업(markup) 생성
  return (
    <section>
      <h2 className="text-2xl text-react font-medium">
        <abbr
          title="Document Object Model"
          className="cursor-help no-underline"
        >
          {isParse ? 'Document Object Model' : 'DOM'}
        </abbr>{' '}
        접근/조작
      </h2>
      <button
        type="button"
        onClick={() => {
          setIsParse((p) => !p);
        }}
      >
        DOM 용어 풀이
      </button>

      <form className="my-10 flex">
        <div>
          <label htmlFor="like-a-book" className="sr-only">
            선호 도서
          </label>
          <input
            ref={searchInputRef}
            id="like-a-book"
            type="search"
            placeholder="좋아하는 도서는?"
            className="bg-react text-white px-3 py-2"
          />
        </div>
        <button
          type="submit"
          aria-label="검색"
          className={tm(
            'cursor-pointer',
            'py-2 size-10 grid place-items-center',
            'bg-cyan-700 text-white '
          )}
        >
          <Search />
        </button>
      </form>

      <div className="flex flex-wrap">
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <TiltBox key={index}>{index + 1}</TiltBox>
          ))}
      </div>
    </section>
  );
}

export default AccessDOMPage;
