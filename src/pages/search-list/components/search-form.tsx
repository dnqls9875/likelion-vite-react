import { useEffect, useId, useRef, useState } from 'react';
import { tm } from '@/utils/tw-merge';
import { deleteQueryParam, setQueryParam } from '../utils/query-param';

// 브라우저에서 쿼리 스트링(문자값) 디코딩하여 가져오는 함수
const getQueryString = () => decodeURIComponent(location.search);

// string으로 구성된 배열을 문자 값으로 변환하는 함수
const convertQueryString = (queryArray: string[]) =>
  queryArray.filter(Boolean).join(' ').trim();

interface SearchFormProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

function SearchForm({ query, setQuery }: SearchFormProps) {
  const [queryString, setQueryString] = useState(getQueryString);
  const searchInputId = useId();

  // [파생된 상태]
  const words = query
    .split(' ')
    .filter(Boolean)
    .map((word) => word.toLowerCase().trim());
  const isEnabledSearch = words.length > 0;

  const checkPeace = words.includes('평화');
  const checkRedColor = words.includes('빨간색');
  const checkConcentration = words.includes('집중력');

  // [이벤트 핸들러]
  const handleCheck = (tag: string, nextIsChecked: boolean) => {
    const newWords = nextIsChecked
      ? [...words, tag]
      : words.filter((word) => word !== tag);
    const nextQuery = convertQueryString(newWords);
    setQuery(nextQuery);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleSearch = () => {
    if (words.length > 0) {
      setQueryParam(convertQueryString(words));
      setQueryString(getQueryString);
    } else {
      deleteQueryParam();
    }
  };

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const clearId = setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }, 900);

    return () => {
      clearTimeout(clearId);
    };
  });

  return (
    <>
      <output className="bg-react text-white px-4 py-2 rounded-full text-xs font-mono">
        {queryString}
      </output>

      <form className={tm('mb-10')} action={handleSearch}>
        <label htmlFor={searchInputId} className="sr-only">
          카드 검색
        </label>
        <div className={tm('flex gap-1')}>
          <input
            ref={searchRef}
            type="search"
            name="query"
            id={searchInputId}
            value={query}
            onChange={handleQuery}
            className={tm(
              'rounded-sm px-2.5 py-1',
              'bg-white text-react font-medium'
            )}
          />
          <button
            type="submit"
            aria-disabled={!isEnabledSearch}
            className={tm(
              'cursor-pointer opacity-80',
              'grid place-content-center',
              'bg-react text-white',
              'px-4 py-2 rounded-sm',
              'hover:opacity-100',
              'aria-disabled:cursor-not-allowed'
            )}
          >
            검색
          </button>
        </div>
        <div className="flex gap-4 my-3 *:select-none">
          <label className="inline-flex gap-1 items-center">
            <input
              type="checkbox"
              checked={checkPeace}
              onChange={(e) => handleCheck('평화', e.currentTarget.checked)}
              className="size-4 accent-react"
            />{' '}
            평화
          </label>
          <label className="inline-flex gap-1 items-center">
            <input
              type="checkbox"
              checked={checkRedColor}
              onChange={(e) => handleCheck('빨간색', e.currentTarget.checked)}
              className="size-4 accent-react"
            />{' '}
            빨간색
          </label>
          <label className="inline-flex gap-1 items-center">
            <input
              type="checkbox"
              checked={checkConcentration}
              onChange={(e) => handleCheck('집중력', e.currentTarget.checked)}
              className="size-4 accent-react"
            />{' '}
            집중력
          </label>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
