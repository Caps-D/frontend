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

export default function Friend() {

  interface Friend {
  nickname: string;
  level: number;
}

  const [friends, setFriends] = useState<Friend[]>([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedForDelete, setSelectedForDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch friends data from API
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("https://h4capston.site/api/friends");
        if (!response.ok) {
          throw new Error("Failed to fetch friends");
        }
        const data = await response.json();
        setFriends(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const handleDelete = (nickname: string) => {
    setFriends(prev => prev.filter(friend => friend.nickname !== nickname));
  };

  const filteredFriends = friends.filter(friend =>
    friend.nickname.includes(searchText)
  );

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
              className="font-['NeoDunggeunmo'] text-lg w-full h-full bg-[#D9D9D9] border border-[#000000] rounded-[30px] p-3 pl-10"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8" />
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
          ) : (
            <div className="flex flex-col w-full h-full">
              {filteredFriends.map(friend => {
                const isDeleting = selectedForDelete === friend.nickname;

                return (
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
                        {isDeleting ? (
                          <DeleteFriendBtn 
                            onClick={() => {
                              const confirmDelete = confirm("정말 삭제하시겠습니까?");
                              if (confirmDelete) {
                                handleDelete(friend.nickname);
                                setSelectedForDelete(null);
                              } else {
                                setSelectedForDelete(null);
                              }
                            }}
                          />
                        ) : (
                          <DeleteBtn onClick={() => setSelectedForDelete(friend.nickname)} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="w-[95%] h-0 border border-[#D9D9D9]"></div>
            </div>
          )}
        </div>
      </DefaultBody>
      <BottomNav />
    </div>
  );
}
