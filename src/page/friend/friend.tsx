import { useState, useEffect } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import BottomNav from "../../components/bottomNav";
import Search from "../../assets/Search.svg?react";
import FriendAdd from "../../assets/FriendAdd.svg?react";
import Level from "../../assets/Level.svg?react";
import DeleteBtn from "../../assets/DeleteBtn.svg?react";
import DeleteFriendBtn from "../../assets/DeleteFriendBtn.svg?react";
import { useNavigate } from "react-router-dom";
import { GetFriends } from "../../api/friend/getFriends";
import { PostSearchUser } from "../../api/friend/postSearchUser";
import { deleteFriend } from "../../api/friend/deleteFriend"; // 친구 삭제 API 함수 import
import { useLocation } from "react-router-dom";

export default function Friend() {
  interface Friend {
    nickname: string;
    level: number;
  }

  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchResults, setSearchResults] = useState<Friend[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedForDelete, setSelectedForDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await GetFriends();
        console.log("GetFriends 응답:", response);
        setFriends(Array.isArray(response) ? response : []);
      } catch (err: any) {
        setError(err.message);
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [location]);

  // 친구 삭제 함수 (API 연동)
  const handleDelete = async (nickname: string) => {
    const confirmDelete = confirm(`${nickname}님을 정말 삭제하시겠습니까?`);
    if (!confirmDelete) {
      setSelectedForDelete(null);
      return;
    }

    try {
      await deleteFriend(nickname);
      // 삭제 성공 시 친구 목록에서 제외
      setFriends(prev => prev.filter(friend => friend.nickname !== nickname));
      alert(`${nickname}님이 친구 목록에서 삭제되었습니다.`);
    } catch (error) {
      alert("친구 삭제에 실패했습니다. 다시 시도해주세요.");
      console.error("친구 삭제 실패:", error);
    } finally {
      setSelectedForDelete(null);
    }
  };

  const handleSearch = async () => {
    if (!searchText) return;
    setSearching(true);
    try {
      const response = await PostSearchUser(searchText);
      const resultData = Array.isArray(response?.data?.users) ? response.data.users : [];
      setSearchResults(resultData);
    } catch (error) {
      console.error("검색 실패:", error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const filteredFriends = searchText
    ? friends.filter(friend => friend.nickname.includes(searchText))
    : friends;

  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <Header>
        <Header.Title>{`친구`}</Header.Title>
        <Header.BackButton />
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="flex flex-col items-center">
          {/* 검색창 */}
          <div className="flex flex-row w-[70%] h-[50%] relative">
            <input
              type="text"
              placeholder="친구 닉네임을 검색하세요."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              className="font-['NeoDunggeunmo'] text-lg w-full h-full bg-[#D9D9D9] border border-[#000000] rounded-[30px] p-3 pl-10"
            />
            <Search
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 cursor-pointer"
              onClick={handleSearch}
            />
          </div>

          {/* 친구추가 버튼 */}
          <div className="mr-auto mt-4 ml-4 mb-3">
            <FriendAdd className="w-12 h-12" onClick={() => navigate('/friend/new')} />
          </div>

          {/* 친구 목록 */}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : filteredFriends.length === 0 ? (
            <div className="font-['NeoDunggeunmo']">
              {searchText ? "검색 결과가 없습니다" : "친구 목록이 비어있습니다"}
            </div>
          ) : (
            <div className="flex flex-col w-full h-full">
              {filteredFriends.map(friend => {
                const isDeleting = selectedForDelete === friend.nickname;

                return (
                  <div key={friend.nickname}>
                    <div className="w-[95%] h-0 border-[0.5px] border-[#D9D9D9]"></div>
                    <div className="flex flex-row p-3">
                      <div className="flex mr-auto text-2xl text-shadow-md font-normal font-['NeoDunggeunmo']">
                        {friend.nickname}
                        <div className="relative ml-2 w-8 h-8">
                          <Level className="w-full h-full" />
                          <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-normal mt-1.5">
                            {friend.level}
                          </span>
                        </div>
                      </div>
                      <div className="flex ml-auto mr-4 items-center justify-center">
                        {isDeleting ? (
                          <DeleteFriendBtn
                            onClick={() => handleDelete(friend.nickname)}
                          />
                        ) : (
                          <DeleteBtn onClick={() => setSelectedForDelete(friend.nickname)} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="w-[95%] h-0 border-[0.5px] border-[#D9D9D9]"></div>
            </div>
          )}

          {/* 검색 결과 (친구 목록이 아닌 유저 검색 결과) */}
          {searching ? (
            <div className="mt-4 text-lg font-['NeoDunggeunmo']">검색 중...</div>
          ) : searchResults.length > 0 && (
            <div className="mt-6 w-full px-4">
              <div className="text-lg font-['NeoDunggeunmo'] mb-2">검색 결과</div>
              {searchResults.map(user => (
                <div
                  key={user.nickname}
                  className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded mb-2"
                >
                  <div className="flex items-center text-lg font-['NeoDunggeunmo']">
                    {user.nickname}
                    <div className="relative ml-2 w-8 h-8">
                      <Level className="w-full h-full" />
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-normal mt-1.5">
                        {user.level}
                      </span>
                    </div>
                  </div>
                  {/* 친구 추가 버튼 자리 */}
                </div>
              ))}
            </div>
          )}
        </div>
      </DefaultBody>
      <BottomNav />
    </div>
  );
}
