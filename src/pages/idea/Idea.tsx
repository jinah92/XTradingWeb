import { useCallback, useEffect, useRef, useState } from 'react';
/* hook */
import { useIdeaList, BoardData, ListReq, useIdeaAdd, BoardAddReq } from '@/hooks/idea/IdeaApi';
import { useFeedList, FeedData, useFeedAdd, FeedAddReq } from '@/hooks/feed/FeedApi';
/* component */
import IdeaCard from '@/components/card/IdeaCard';
import FeedCard from '@/components/card/FeedCard';
import { Input } from '@/components/ui/input';
import LeftNavbar from '@/components/navbar/LeftNavbar';
import { useParams } from 'react-router-dom';
import AutoResizeTextarea from '@/components/ui/autoResizeTextarea';
import TagInput from '@/components/ui/tagInput';
import { useAuth } from '@/router/AuthContext';
import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/button';
import CodeList from '@/components/modal/CodeList';
/* common */
import { openModal, closeModal } from '@/common/Utils';

const Idea = () => {
  const { isAuthenticated } = useAuth();

  /* 조회 로직 */
  const { ideaListApi } = useIdeaList();
  const { feedListApi } = useFeedList();

  const { id } = useParams<{ id: string }>();
  const [ideaList, setIdeaList] = useState<BoardData[]>([]); // 받아온 데이터 저장
  const [feedList, setFeedList] = useState<FeedData[]>([]); // 받아온 데이터 저장
  const [page, setPage] = useState<number>(1); // 현재 페이지 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 더 불러올 데이터가 있는지 확인
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [urlId, setUrlId] = useState<string | undefined>(id);
  const [ideaKeyword, setIdeaKeyword] = useState<string>('');
  const [feedCode, setFeedCode] = useState<string>('');

  // TODO : test로 조회 후 스크롤 내리고 다시 test 조회하면 무한스크롤이 안되는 현상

  // 데이터 요청 함수
  const loadMoreData = useCallback(
    async (id: string | undefined) => {
      try {
        setLoading(true);
        const param: ListReq = {
          page: page,
          pageSize: 10,
        };

        let newIdeaItems: BoardData[] = [];
        let newFeedItems: FeedData[] = [];

        // idea 조회
        if (id === undefined) {
          if (ideaKeyword != '') {
            param.keyword = ideaKeyword;
          }

          // 1Page에서 재조회 시
          if (page === 1) {
            setIdeaList([]);
          }

          newIdeaItems = await ideaListApi(param);
          setIdeaList(prevData => [...prevData, ...newIdeaItems]);

          // 이후 데이터 유무 확인
          if (newIdeaItems.length < 10) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        }
        // feed 조회
        else if (id === 'feed') {
          param.type = 'COIN';

          if (feedCode != '') {
            param.code = feedCode;
          }

          // 1Page에서 재조회 시
          if (page === 1) {
            setFeedList([]);
          }

          newFeedItems = await feedListApi(param);
          setFeedList(prevData => [...prevData, ...newFeedItems]);

          // 이후 데이터 유무 확인
          if (newFeedItems.length < 10) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [page, ideaKeyword, feedCode],
  );

  // IntersectionObserver로 트리거 감지
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        setPage(prevPage => prevPage + 1); // 페이지 증가

        // 트리거 요소에 대한 관찰 중지 (데이터가 로드되면 다시 관찰)
        if (observerRef.current) {
          observerRef.current.unobserve(target.target);
        }
      }
    },
    [loading, hasMore],
  );

  // 트리거 요소가 감지되면 IntersectionObserver가 실행됨
  useEffect(() => {
    const target = document.getElementById('scroll-trigger');

    // IntersectionObserver 설정
    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null, // 뷰포트를 기준으로
      rootMargin: '0px',
      threshold: 1.0, // 100% 보여졌을 때 트리거
    });

    if (target) {
      observerRef.current.observe(target); // 트리거 요소 관찰 시작
    }

    return () => {
      if (observerRef.current && target) {
        observerRef.current.unobserve(target); // 언마운트 시 관찰 해제
      }
    };
  }, [observerCallback]);

  // 검색
  const searchData = () => {
    scrollTop();
    if (page === 1) {
      loadMoreData(id);
    } else {
      setPage(1);
    }
  };

  // Enter Key 이벤트
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      loadMoreData(id);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0, // 스크롤을 위로 설정
      // behavior: 'smooth'  부드럽게 스크롤
    });
  };

  // ID가 변경될 때 실행
  useEffect(() => {
    if (urlId !== id) {
      scrollTop();
      setIdeaList([]);
      setFeedList([]);
      setUrlId(id); // URL ID 업데이트
      setIdeaKeyword('');
      setFeedCode('');

      // Post 입력 값 초기화
      setSubject('');
      setContents('');
      resetTagsInChild();

      if (page !== 1) {
        setPage(1);
        return; // 페이지를 1로 설정한 후 즉시 loadMoreData 호출을 막음
      }
    }

    // 페이지가 1일 때만 데이터를 로드
    if (page === 1 && urlId === id) {
      loadMoreData(id);
    }
  }, [id, urlId, page, feedCode]);

  // 페이지가 변경될 때 실행
  useEffect(() => {
    // 첫 입장 시 이미 page가 1이면 데이터를 로드하지 않음 (위에서 처리됨)
    if (page !== 1) {
      loadMoreData(id);
    }
  }, [page]);

  /* 저장 로직 */
  const { ideaAddApi } = useIdeaAdd();
  const { feedAddApi } = useFeedAdd();

  // issue 저장 변수
  const [subject, setSubject] = useState('');
  const [contents, setContents] = useState('');
  const [tagList, setTagList] = useState<string[] | null>(null);
  const tagInputRef = useRef<{ resetTags: () => void }>(null); // TagInput의 resetTags에 접근할 ref

  // feed 저장 변수
  const [addCode, setAddCode] = useState('');

  const resetTagsInChild = () => {
    if (tagInputRef.current) {
      tagInputRef.current.resetTags(); // TagInput의 태그 리스트와 입력 필드 초기화
    }
  };

  // idea 게시글 생성
  const ideaAdd = async () => {
    const param: BoardAddReq = {
      subject: subject,
      contents: contents,
      tagList: tagList,
    };

    const addResult = await ideaAddApi(param);

    if (addResult) {
      setIdeaList([]); // 기존 조회 내용 제거

      if (page === 1) {
        loadMoreData(id);
      } else {
        setPage(1);
      }

      /* 입력란 초기화 */
      setSubject('');
      setContents('');
      resetTagsInChild();
      setTagList([]);
    }
  };

  // idea 게시글 생성
  const feedAdd = async () => {
    const param: FeedAddReq = {
      code: addCode,
      subject: subject,
      contents: contents,
      tagList: tagList,
    };

    const addResult = await feedAddApi(param);

    if (addResult) {
      setFeedList([]); // 기존 조회 내용 제거

      if (page === 1) {
        loadMoreData(id);
      } else {
        setPage(1);
      }

      /* 입력란 초기화 */
      setAddCode('');
      setSubject('');
      setContents('');
      resetTagsInChild();
      setTagList([]);
    }
  };

  // 검색 키워드 모달
  const [keywordModal, setKeywordModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

  const openKeyword = (type: string) => {
    openModal();
    setModalType(type);
    setKeywordModal(true);
  };
  const closeKeyword = () => {
    closeModal();
    setKeywordModal(false);
  };

  const searchKeywordSelect = (codeValue: string) => {
    scrollTop();
    setFeedCode(codeValue);
    setFeedList([]);
    setPage(1);
    closeKeyword();
  };

  const addKeywordSelect = (codeValue: string) => {
    setAddCode(codeValue);
    closeKeyword();
  };

  return (
    <>
      <div className="flex flex-col items-center sm:mt-10">
        <div className="rounded-lg w-full">
          <div className="flex">
            <LeftNavbar />

            <div className="flex-auto border sm:rounded-2xl overflow-auto h-[calc(100vh-8rem)]">
              {/* idea add */}
              {id === undefined &&
                (isAuthenticated ? (
                  <div className="border-t border-b flex justify-center">
                    <div className="mt-8 mb-8 w-4/5">
                      <Input
                        placeholder="제목"
                        className="mb-5"
                        onChange={e => setSubject(e.target.value)}
                        value={subject}
                      />
                      <TagInput onChange={setTagList} ref={tagInputRef} />
                      <AutoResizeTextarea value={contents} onChange={setContents} />
                      <div className="flex justify-end mt-5">
                        <Button onClick={ideaAdd}>Post</Button>
                      </div>
                    </div>
                  </div>
                ) : null)}

              {/* feed add */}
              {id === 'feed' &&
                (isAuthenticated ? (
                  <div className="border-t border-b flex justify-center">
                    <div className="mt-8 mb-8 w-4/5">
                      <Input
                        placeholder="제목"
                        className="mb-5"
                        onChange={e => setSubject(e.target.value)}
                        value={subject}
                      />
                      <div className="flex mt-8 mb-8">
                        <Input placeholder="종목을 선택해주세요." value={addCode} disabled={true} />
                        <Button onClick={() => openKeyword('add')}>검색</Button>
                      </div>
                      <TagInput onChange={setTagList} ref={tagInputRef} />
                      <AutoResizeTextarea value={contents} onChange={setContents} />
                      <div className="flex justify-end mt-5">
                        <Button onClick={feedAdd}>Post</Button>
                      </div>
                    </div>
                  </div>
                ) : null)}

              {id === undefined &&
                ideaList &&
                (ideaList.length > 0 ? (
                  ideaList.map((item, index) => <IdeaCard key={index} item={item} />)
                ) : (
                  <p>데이터가 없습니다.</p>
                ))}

              {id === 'feed' &&
                feedList &&
                (feedList.length > 0 ? (
                  feedList.map((item, index) => <FeedCard key={index} item={item} />)
                ) : (
                  <p>데이터가 없습니다.</p>
                ))}
              {/* 스크롤이 끝에 다다를 때 이 요소가 감지됨 */}
              <div id="scroll-trigger" style={{ height: '20px', backgroundColor: 'transparent' }} />
            </div>
            <div className="flex-none">
              <div className="px-2">
                {id === undefined ? (
                  <div className="flex">
                    <Input
                      placeholder="search..."
                      value={ideaKeyword}
                      onChange={e => setIdeaKeyword(e.target.value)}
                      onKeyDown={handleEnterPress}
                    />
                    <Button onClick={searchData}>검색</Button>
                  </div>
                ) : id === 'feed' ? (
                  <div className="flex">
                    <Input placeholder="종목을 선택해주세요." value={feedCode} disabled={true} />
                    <Button onClick={() => openKeyword('search')}>검색</Button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={keywordModal} onClose={closeKeyword}>
        <CodeList onSearchSelect={searchKeywordSelect} onAddSelect={addKeywordSelect} type={modalType} />
      </Modal>
    </>
  );
};

export default Idea;
