import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import BottomNav from "../../components/bottomNav";
import ExerciseBtn from "../../assets/exerciseBtn.svg?react";
import 플랭크 from "../../assets/플랭크.svg?react";
import 팔굽혀펴기 from "../../assets/팔굽혀펴기.svg?react";
import 스쿼트 from "../../assets/스쿼트.svg?react";
import Coin from "../../assets/Coin.svg?react";
import Star from "../../assets/Star.svg?react";

const formatDateWithDay = (dateStr: string) => {
  const date = new Date(dateStr);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = days[date.getDay()];
  return `${year}.${month}.${day} (${weekday})`;
};

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  플랭크,
  팔굽혀펴기,
  스쿼트,
};

export default function Quest() {
  const [activeTab, setActiveTab] = useState("dailyQuest");
  const [selectedAchieve, setSelectedAchieve] = useState<any>(null);
  const [dailyQuestData, setDailyQuestData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [handleY, setHandleY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDailyQuests = async () => {
      try {
        const res = await fetch("http://h4capston.site/api/daily-quests/today");
        if (!res.ok) throw new Error("서버 오류");
        const data = await res.json();
        setDailyQuestData(data);
      } catch (err) {
        setError("퀘스트 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchDailyQuests();
  }, []);

  const pastdailyQuestsData = [
    {
      date: "2025-04-30",
      name: "플랭크",
      icon: 플랭크,
      count: 50,
      sets: 3,
      completed: true,
      reward: 500,
      exp: 30,
    },
    {
      date: "2025-04-29",
      name: "팔굽혀펴기",
      icon: 팔굽혀펴기,
      count: 40,
      sets: 3,
      completed: true,
      reward: 400,
      exp: 10,
    },
  ];

  const achievementsData = [
    {
      name: "윗몸일으키기",
      icon: 윗몸일으키기,
      count: 200,
      completed: false,
      reward: 20,
    },
    {
      name: "팔굽혀펴기",
      icon: 팔굽혀펴기,
      count: 150,
      completed: false,
      reward: 15,
    },
    {
      name: "스쿼트",
      icon: 스쿼트,
      count: 200,
      completed: false,
      reward: 20,
    },
  ];

  const onDragStart = (e: React.MouseEvent) => {
    setDragging(true);
    e.preventDefault();
  };
  const onDragMove = (e: MouseEvent) => {
    if (!dragging || !boxRef.current) return;
    const { bottom } = boxRef.current.getBoundingClientRect();
    const delta = bottom - e.clientY;
    setHandleY(Math.max(0, Math.min(delta, 2 * 170)));
  };
  const onDragEnd = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);
    return () => {
      window.removeEventListener("mousemove", onDragMove);
      window.removeEventListener("mouseup", onDragEnd);
    };
  }, [dragging]);

  return (
    <div className="relative flex flex-col w-full h-full items-center justify-start">
      <Header>
        <Header.Title>퀘스트</Header.Title>
        <Header.BackButton />
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="flex flex-col items-center mt-6">
          {/* 탭 버튼 */}
          <div className="flex mb-2">
            <button
              onClick={() => setActiveTab("dailyQuest")}
              className={`font-['NeoDunggeunmo'] text-2xl p-2 ${
                activeTab === "dailyQuest" ? "font-bold" : "text-[#989C93]"
              }`}
            >
              일일퀘스트
            </button>
            <div className="w-[3px] h-5 mt-3 ml-3 mr-3 bg-[#000000]" />
            <button
              onClick={() => setActiveTab("achievements")}
              className={`font-['NeoDunggeunmo'] text-2xl p-2 ${
                activeTab === "achievements" ? "font-bold" : "text-[#989C93]"
              }`}
            >
              도전과제
            </button>
          </div>

          <div className="w-full p-4">
            {activeTab === "dailyQuest" && (
              <div className="flex flex-col items-center">
                {loading && <p>로딩 중...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading &&
                  !error &&
                  dailyQuestData.map((quest, index) => {
                    const Icon = iconMap[quest.name] || null;
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-2">
                          {formatDateWithDay(quest.date)}
                        </p>

                        <div className="flex flex-row items-center">
                          <div className="flex flex-col items-center">
                            <p className="font-['NeoDunggeunmo'] text-2xl mt-3.5 mb-3.5">운동</p>
                            <Icon className="w-11 h-11" />
                          </div>
                          <p className="w-[1.5px] h-24 mt-6 ml-5 mr-4 bg-[#D9D9D9]" />
                          <div className="flex flex-col items-center">
                            <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-5">횟수</p>
                            <p className="font-['NeoDunggeunmo'] w-20 h-8 bg-[#D9D9D9] rounded-[5px] flex items-center justify-center text-2xl">
                              {`${quest.count} x ${quest.sets}`}
                            </p>
                          </div>
                          <p className="w-[1.5px] h-24 mt-6 ml-4 mr-5 bg-[#D9D9D9]" />
                          <div className="flex flex-col items-center">
                            <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-5">완료 여부</p>
                            <p className="font-['NeoDunggeunmo'] text-2xl">
                              {quest.completed ? "o" : "x"}
                            </p>
                          </div>
                          <p className="w-[1.5px] h-24 mt-6 ml-5 mr-5 bg-[#D9D9D9]" />
                          <div className="flex flex-col items-center">
                            <p className="font-['NeoDunggeunmo'] text-2xl mt-6 mb-1">보상</p>
                            <div className="flex flex-col">
                              <div className="flex flex-row">
                                <Coin className="w-5 h-5 mr-2 mt-1" />
                                <p className="font-['NeoDunggeunmo'] text-2xl">{quest.reward}</p>
                              </div>
                              <div className="flex flex-row">
                                <Star className="w-5 h-5 mr-2 mt-1" />
                                <p className="font-['NeoDunggeunmo'] text-2xl">{quest.exp}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <ExerciseBtn className="mt-11" onClick={() => navigate("/start")} />
              </div>
            )}

            {activeTab === "achievements" && (
              <>
                <BottomNav />
                <div className="flex flex-col items-center">
                  {achievementsData.map((achieve, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedAchieve(achieve)}
                      className={`flex flex-row items-center mb-3 cursor-pointer rounded-xl border-2 ${
                        selectedAchieve?.name === achieve.name ? "border-[#4CAF50]" : "border-transparent"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <p className="font-['NeoDunggeunmo'] text-2xl mt-3.5 mb-3.5">운동</p>
                        <achieve.icon />
                      </div>
                      <p className="w-[1.5px] h-24 mt-6 ml-5 mr-4 bg-[#D9D9D9]" />
                      <div className="flex flex-col items-center">
                        <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-5">횟수</p>
                        <p className="font-['NeoDunggeunmo'] w-20 h-8 bg-[#D9D9D9] rounded-[5px] flex items-center justify-center text-2xl">
                          {achieve.count}
                        </p>
                      </div>
                      <p className="w-[1.5px] h-24 mt-6 ml-4 mr-5 bg-[#D9D9D9]" />
                      <div className="flex flex-col items-center">
                        <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-5">완료 여부</p>
                        <p className="font-['NeoDunggeunmo'] text-2xl">
                          {achieve.completed ? "o" : "x"}
                        </p>
                      </div>
                      <p className="w-[1.5px] h-24 mt-6 ml-5 mr-5 bg-[#D9D9D9]" />
                      <div className="flex flex-col items-center">
                        <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-5">보상</p>
                        <div className="flex flex-row">
                          <Coin className="w-7 h-7 mr-2" />
                          <p className="font-['NeoDunggeunmo'] text-2xl">{achieve.reward}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <ExerciseBtn
                    className="mt-7"
                    onClick={() => {
                      if (!selectedAchieve) {
                        alert("운동을 선택해주세요.");
                        return;
                      }
                      navigate("/start", { state: selectedAchieve });
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </DefaultBody>

        {/* 종료된 퀘스트 영역 */}
      {activeTab === "dailyQuest" && (
        <div
          ref={boxRef}
          onMouseDown={onDragStart}
          className="absolute bottom-0 left-0 w-full bg-[#EEEEEE]/70 rounded-t-xl overflow-hidden"
          style={{
            height: 60 + handleY,
            transition: dragging ? "none" : "height 0.2s",
          }}
        >
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#B1B1B1] rounded cursor-grab" />
          <p className="font-['NeoDunggeunmo'] text-[22px] mt-6 flex justify-center">
            종료된 퀘스트
          </p>
          <div className="pt-2 space-y-4 px-4">
            {pastdailyQuestsData
              .slice(0, Math.min(pastdailyQuestsData.length, Math.floor(handleY / 100)))
              .map((quest, idx) => (
                <div key={idx} className="flex flex-col items-center text-black/70">
                  <p className="font-['NeoDunggeunmo'] text-xl mt-2 mb-2">
                    {formatDateWithDay(quest.date)}
                  </p>
                  <div className="flex flex-row items-center">
                    <div className="flex flex-col">
                      <p className="font-['NeoDunggeunmo'] text-xl mt-3 mb-3.5">운동</p>
                      <quest.icon className="w-8 h-8" />
                    </div>
                    <p className="w-[1.5px] h-20 mt-3 ml-5 mr-5 bg-[#D9D9D9]/50" />
                    <div className="flex flex-col items-center">
                      <p className="font-['NeoDunggeunmo'] text-xl mt-2.5 mb-3">횟수</p>
                      <p className="font-['NeoDunggeunmo'] w-18 h-8 bg-[#D9D9D9] rounded-[5px] flex items-center justify-center text-xl">
                        {`${quest.count} x ${quest.sets}`}
                      </p>
                    </div>
                    <p className="w-[1.5px] h-20 mt-3 ml-5 mr-5 bg-[#D9D9D9]/50" />
                    <div className="flex flex-col items-center">
                      <p className="font-['NeoDunggeunmo'] text-xl mt-2 mb-3.5">완료 여부</p>
                      <p className="font-['NeoDunggeunmo'] text-xl">
                        {quest.completed ? "o" : "x"}
                      </p>
                    </div>
                    <p className="w-[1.5px] h-20 mt-3 ml-5 mr-5 bg-[#D9D9D9]/50" />
                    <div className="flex flex-col items-center">
                      <p className="font-['NeoDunggeunmo'] text-xl mt-5">보상</p>
                          <div className="flex flex-col">
                           <div className="flex flex-row">
                            <Coin className="w-4 h-4 mr-2 mt-1" />
                            <p className="font-['NeoDunggeunmo'] text-lg">{quest.reward}</p>
                          </div>
                          <div className="flex flex-row">
                            <Star className="w-4 h-4 mr-2 mt-1"/>
                            <p className="font-['NeoDunggeunmo'] text-lg">{quest.exp}</p>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

