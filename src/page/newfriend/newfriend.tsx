import { useState, useEffect } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import BottomNav from "../../components/bottomNav";
import Search from "../../assets/Search.svg?react";
import Level from "../../assets/Level.svg?react";
import AddFriendBtn from "../../assets/AddFriendBtn.svg?react";
import { PostSearchUser } from "../../api/friend/postSearchUser"; // ✅ 닉네임 검색 API
import { PostAddFriend } from "../../api/newfriend/postAddFriend"; // ✅ 친구 추가 API

interface Friend {
  nickname: string;
  level: number;
}

export default function NewFriend() {
  const [searchText, setSearchText] = useState("");
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);
  const [addedFriends, setAddedFriends] = useState<string[]>([]);

  // ✅ 검색어 입력 시 서버에 검색 요청
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchText.trim()) {
        setFilteredFriends([]);
        return;
      }

      try {
        const res = await PostSearchUser(searchText);
        setFilteredFriends(res.data); // [{ nickname, level }]
      } catch (err) {
        console.error("검색 실패", err);
        setFilteredFriends([]);
      }
    };

    fetchSearchResults();
  }, [searchText]);

  // ✅ 친구 추가 함수
  const handleAddFriend = async (nickname: string) => {
    try {
      const res = await PostAddFriend(nickname);
      alert(`${nickname} 님이 친구로 추가되었습니다.`);
      setAddedFriends((prev) => [...prev, nickname]);
    } catch (error) {
      alert("친구 추가 실패: 이미 추가된 사용자이거나 오류가 발생했습니다.");
      console.error("친구 추가 오류:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <Header>
        <Header.Title>{`새로운 친구`}</Header.Title>
        <Header.BackButton />
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="flex flex-col items-center">
          {/* 🔍 검색창 */}
          <div className="flex flex-row w-[70%] relative">
            <input
              type="text"
              placeholder="친구 닉네임을 검색하세요."
              className="font-['NeoDunggeunmo'] text-lg w-full h-full bg-[#D9D9D9] border border-[#000000] rounded-[30px] p-3 pl-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8" />
          </div>

          {/* 👥 검색 결과 리스트 */}
          {filteredFriends.length > 0 && (
            <div className="flex flex-col w-full h-full mt-8">
              {filteredFriends.map((friend) => (
                <div key={friend.nickname}>
                  <div className="w-[95%] h-0 border border-[#D9D9D9]"></div>
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
                      {!addedFriends.includes(friend.nickname) && (
                        <AddFriendBtn
                          onClick={() => {
                            const confirmAdd = confirm("정말 추가하시겠습니까?");
                            if (confirmAdd) {
                              handleAddFriend(friend.nickname);
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-[95%] h-0 border border-[#D9D9D9]"></div>
            </div>
          )}
        </div>
      </DefaultBody>
      <BottomNav />
    </div>
  );
}
