import { useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import BottomNav from "../../components/bottomNav";
import Search from "../../assets/Search.svg?react";
import Level from "../../assets/Level.svg?react";
import AddFriendBtn from "../../assets/AddFriendBtn.svg?react";
import axios from "axios";

const dummyData = [
  { nickname: "나는 고수다", level: 10 }
];

export default function NewFriend() {
  const [searchText, setSearchText] = useState("");
  const [friendList] = useState(dummyData);
  const [addedFriends, setAddedFriends] = useState<string[]>([]);

  const filteredFriends = friendList.filter(friend =>
    friend.nickname.includes(searchText)
  );

  const handleAddFriend = async (nickname: string) => {
    try {
      const response = await axios.post("https://h4capston.site/api/addFriend", {
        nickname
      });

      if (response.status === 200 || response.status === 201) {
        alert("친구가 성공적으로 추가되었습니다.");
        setAddedFriends(prev => [...prev, nickname]);
      } else {
        alert("친구 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("친구 추가 오류:", error);
      alert("서버 오류로 친구를 추가할 수 없습니다.");
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
          {/* 검색창 */}
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

          {/* 친구목록 */}
          {searchText && (
            <div className="flex flex-col w-full h-full mt-8">
              {filteredFriends.map(friend => (
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

