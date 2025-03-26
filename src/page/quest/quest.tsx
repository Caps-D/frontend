import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import ExerciseBtn from "../../assets/exerciseBtn.svg?react";
import 윗몸일으키기 from "../../assets/윗몸일으키기.svg?react";
import 팔굽혀펴기 from "../../assets/팔굽혀펴기.svg?react";
import 스쿼트 from "../../assets/스쿼트.svg?react";
import Coin from "../../assets/Coin.svg?react";
import { useNavigate  } from "react-router-dom";
import { useState } from 'react';

export default function Quest() {
  // 상태를 string으로 설정, 기본값은 'dailyQuest'
  const [activeTab, setActiveTab] = useState<string>('dailyQuest'); 
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <Header>
        <Header.Title>{`퀘스트`}</Header.Title>
        <Header.BackButton />
      </Header>

      <DefaultBody hasHeader={1}>
        <div className="flex flex-col items-center mt-6">
          {/* 탭 버튼 */}
          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab('dailyQuest')} 
              className={`font-['NeoDunggeunmo'] text-2xl p-2 ${activeTab === 'dailyQuest' ? 'font-bold' : 'text-[#989C93]'}`}
            >
              일일퀘스트
            </button>
            <div className="w-[3px] h-5 mt-3 ml-3 mr-3 bg-[#000000]"></div>
            <button
              onClick={() => setActiveTab('achievements')} 
              className={`font-['NeoDunggeunmo'] text-2xl p-2 ${activeTab === 'achievements' ? 'font-bold' : 'text-[#989C93]'}`}
            >
              도전과제
            </button>
          </div>

          {/* 탭 내용 */}
          <div className="w-full p-4">
            {activeTab === 'dailyQuest' && (
              <div className="flex flex-col items-center">
                <p className="font-['NeoDunggeunmo'] text-2xl"> 2025. 3. 27 (목)</p>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-2">운동 </p> 
                    <윗몸일으키기/>
                  </div>
                  <p className="w-[1.5px] h-20 mt-3 ml-5 mr-5 bg-[#D9D9D9]"></p>
                  <div className="flex flex-col items-center">
                    <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-2">횟수</p> 
                    <p className="w-18 h-8 bg-[#D9D9D9] rounded-[5px]"></p>
                  </div>
                  <p className="w-[1.5px] h-20 mt-3 ml-5 mr-5 bg-[#D9D9D9]"></p>
                  <div className="flex flex-col items-center">
                    <p className="font-['NeoDunggeunmo'] text-2xl mt-2.5 mb-2">완료 여부</p> 
                    <p className="font-['NeoDunggeunmo'] text-2xl ">X</p> 
                  </div>
                  <p className="w-[1.5px] h-20 mt-3 ml-5 mr-5 bg-[#D9D9D9]"></p>
                  <div className="flex flex-col items-center">
                    <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-2 ">보상</p> 
                    <div className="flex flex-row">
                      <Coin className="w-7 h-7 mr-2"/>
                       <p className="font-['NeoDunggeunmo'] text-2xl">600</p>
                    </div>
                  </div>
                </div>
                <ExerciseBtn className="mt-10" onClick={()=>navigate('/start')}/>
              </div>
            )}
            {activeTab === 'achievements' && (
              <div className="flex flex-col items-center">
              <p className="font-['NeoDunggeunmo'] text-2xl"> 2025. 3. 27 (목)</p>
              <div className="flex flex-row items-center">
                <div className="flex flex-col">
                  <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-2">운동 </p> 
                  <윗몸일으키기 className="mb-8"/>
                  <팔굽혀펴기 className="mb-8"/>
                  <스쿼트 className="mb-8"/>
                </div>
                <p className="w-[1.5px] h-60 mt-3 ml-5 mr-5 bg-[#D9D9D9]"></p>
                <div className="flex flex-col items-center">
                  <p className="font-['NeoDunggeunmo'] text-2xl mt-2 mb-2.5">횟수</p> 
                  <p className="w-18 h-8 bg-[#D9D9D9] rounded-[5px] mb-8"></p>
                  <p className="w-18 h-8 bg-[#D9D9D9] rounded-[5px] mb-8"></p>
                  <p className="w-18 h-8 bg-[#D9D9D9] rounded-[5px] mb-8"></p>
                </div>
                <p className="w-[1.5px] h-60 mt-3 ml-5 mr-5 bg-[#D9D9D9]"></p>
                <div className="flex flex-col items-center">
                  <p className="font-['NeoDunggeunmo'] text-2xl mt-2.5 mb-3.5">완료 여부</p> 
                  <p className="font-['NeoDunggeunmo'] text-2xl mb-8">X</p> 
                  <p className="font-['NeoDunggeunmo'] text-2xl mb-8">X</p> 
                  <p className="font-['NeoDunggeunmo'] text-2xl mb-7">X</p> 
                </div>
                <p className="w-[1.5px] h-60 mt-3 ml-5 mr-5 bg-[#D9D9D9]"></p>
                <div className="flex flex-col items-center">
                  <p className="font-['NeoDunggeunmo'] text-2xl mt-3.5 mb-3 ">보상</p> 
                  <div className="flex flex-row">
                    <Coin className="w-7 h-7 mr-2"/>
                     <p className="font-['NeoDunggeunmo'] text-2xl mb-8">20</p>
                  </div>
                  <div className="flex flex-row">
                    <Coin className="w-7 h-7 mr-2"/>
                     <p className="font-['NeoDunggeunmo'] text-2xl mb-8">15</p>
                  </div>
                  <div className="flex flex-row">
                    <Coin className="w-7 h-7 mr-2"/>
                     <p className="font-['NeoDunggeunmo'] text-2xl mb-8">20</p>
                  </div>
                </div>
              </div>
              <ExerciseBtn className="mt-10" onClick={()=>navigate('/start')}/>
            </div>
            )}
          </div>
        </div>
      </DefaultBody>
    </div>
  );
}
