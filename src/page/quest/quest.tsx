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
import { fetchDailyQuests } from "../../api/quest/getquest";
import { fetchChallenge } from "../../api/quest/getChallenge";
import { fetchEndedQuest } from "../../api/quest/getEndedQuest";

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
  const [dailyQuestData, setDailyQuestData] = useState<any[]>([]);
  const [challengeData, setChallengeData] = useState<any[]>([]);
  const [endedQuestData, setEndedQuestData] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [handleY, setHandleY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDailyQuestsAPI = async () => {
      try {
        const res  = await fetchDailyQuests();
        
        console.log("일일 퀘스트:", res);        
        setDailyQuestData(res);
      } catch (err) {
        setError("일일퀘스트 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchDailyQuestsAPI();
  }, []);

    useEffect(() => {
    const fetchChallengeAPI = async () => {
      try {
        const res = await fetchChallenge();
        console.log("도전 과제:", res);   
        setChallengeData(res);
      } catch (err) {
        setError("도전과제 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchChallengeAPI();
  }, []);

  useEffect(() => {
    const fetchEndedQuestAPI = async () => {
      try {
        const res = await fetchEndedQuest();
        console.log("종료된 퀘스트:", res);   
        setEndedQuestData(res);
      } catch (err) {
        setError("종료된 퀘스트 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchEndedQuestAPI();
  }, []);


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
            onClick={() => setActiveTab("challenge")}
            className={`font-['NeoDunggeunmo'] text-2xl p-2 ${
              activeTab === "challenge" ? "font-bold" : "text-[#989C93]"
            }`}
          >
            도전과제
          </button>
        </div>

        <div className="w-full p-4">
          {/* 일일퀘스트 */}
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
                          <p className="font-['NeoDunggeunmo'] text-xl mt-3 mb-3">운동</p>
                          <Icon className="w-10 h-11" />
                        </div>
                        <p className="w-[1.5px] h-24 mt-6 ml-5 mr-4 bg-[#D9D9D9]" />
                        <div className="flex flex-col items-center">
                          <p className="font-['NeoDunggeunmo'] text-xl mt-2 mb-5">횟수</p>
                          <p className="font-['NeoDunggeunmo'] w-16 h-8 bg-[#D9D9D9] rounded-[5px] flex items-center justify-center text-xl">
                            {`${quest.count} x ${quest.sets}`}
                          </p>
                        </div>
                        <p className="w-[1.5px] h-24 mt-6 ml-4 mr-5 bg-[#D9D9D9]" />
                        <div className="flex flex-col items-center">
                          <p className="font-['NeoDunggeunmo'] text-xl mt-2 mb-5">완료</p>
                          <p className="font-['NeoDunggeunmo'] text-xl">
                            {quest.completed ? "o" : "x"}
                          </p>
                        </div>
                        <p className="w-[1.5px] h-24 mt-6 ml-5 mr-5 bg-[#D9D9D9]" />
                        <div className="flex flex-col items-center">
                          <p className="font-['NeoDunggeunmo'] text-xl mt-4.5 mb-1">보상</p>
                          <div className="flex flex-col">
                            <div className="flex flex-row">
                              <Coin className="w-5 h-5 mr-2 mt-1" />
                              <p className="font-['NeoDunggeunmo'] text-xl">{quest.reward}</p>
                            </div>
                            <div className="flex flex-row">
                              <Star className="w-5 h-5 mr-2 mt-1" />
                              <p className="font-['NeoDunggeunmo'] text-xl">{quest.exp}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <ExerciseBtn className="mt-11" onClick={() => navigate("/select/mode")} />
            </div>
          )}

          {/* 도전 과제 */}
          {activeTab === "challenge" && (
            <div className="flex flex-col items-center">
              {loading && <p>로딩 중...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading &&
                !error &&
                challengeData.map((challenge, index) => {
                  const Icon = iconMap[challenge.name] || null;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className="flex flex-row items-center">
                        <div className="flex flex-col items-center">
                          <p className="font-['NeoDunggeunmo'] text-xl mt-3.5 mb-3.5">운동</p>
                          {Icon && <Icon className="w-10 h-11" />}
                        </div>
                        <p className="w-[1.5px] h-24 mt-6 ml-5 mr-4 bg-[#D9D9D9]" />
                        <div className="flex flex-col items-center">
                          <p className="font-['NeoDunggeunmo'] text-xl mt-2 mb-5">횟수</p>
                          <p className="font-['NeoDunggeunmo'] w-14 h-8 bg-[#D9D9D9] rounded-[5px] flex items-center justify-center text-xl">
                            {challenge.count}
                          </p>
                        </div>
                        <p className="w-[1.5px] h-24 mt-6 ml-4 mr-5 bg-[#D9D9D9]" />
                        <div className="flex flex-col items-center">
                          <p className="font-['NeoDunggeunmo'] text-xl mt-2 mb-5">완료</p>
                          <p className="font-['NeoDunggeunmo'] text-xl">
                            {challenge.completed ? "o" : "x"}
                          </p>
                        </div>
                        <p className="w-[1.5px] h-24 mt-6 ml-5 mr-5 bg-[#D9D9D9]" />
                        <div className="flex flex-col items-center">
                          <p className="font-['NeoDunggeunmo'] text-xl mt-2 mb-5">보상</p>
                          <div className="flex flex-col">
                            <div className="flex flex-row">
                              <Coin className="w-5 h-5 mr-2 mt-1.5" />
                              <p className="font-['NeoDunggeunmo'] text-xl mt-1">{challenge.reward}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <ExerciseBtn className="mt-11" onClick={() => navigate("/select/mode")} />
              <BottomNav />
            </div>
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
          {endedQuestData && endedQuestData.length > 0 ? (
            endedQuestData
              .slice(0, Math.min(endedQuestData.length, Math.floor(handleY / 100)))
              .map((quest, idx) => {
                const Icon = iconMap[quest.name] || null; 
                return (
                  <div key={idx} className="flex flex-col items-center text-black/70">
                    <p className="font-['NeoDunggeunmo'] text-xl mt-2 mb-2">
                      {formatDateWithDay(quest.date)}
                    </p>
                    <div className="flex flex-row items-center">
                      <div className="flex flex-col">
                        <p className="font-['NeoDunggeunmo'] text-xl mt-3 mb-3">운동</p>
                        {Icon ? <Icon className="w-8 h-8" /> : null}
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
                        <p className="font-['NeoDunggeunmo'] text-xl mt-2 mb-3.5">완료</p>
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
                            <Star className="w-4 h-4 mr-2 mt-1" />
                            <p className="font-['NeoDunggeunmo'] text-lg">{quest.exp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <p>종료된 퀘스트가 없습니다.</p>
          )}
        </div>
      </div>
    )}
    </div>
  );
}