import CommonBtn from "../../components/commonBtn";
import { useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import { useNavigate } from "react-router-dom";
import { useMode } from "../../context/ExerciseContext"; // Context Hook import

function Result() {
  const navigate = useNavigate();

  // State to track active buttons
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Context에서 상태와 setState 가져오기
  const { state, setState } = useMode();
  const total = 60;
  const quest = 2;

  const count = state.exerciseCount * state.exerciseSet;

  // '다음' 버튼 클릭 시 동작
  const handleNextClick = () => {
    if (!activeButton) {
      alert("운동을 선택해주세요.");
    } else {
      // mode에 따라 navigate 경로 다르게 설정
      if (state.mode === '사용자모드') {
        navigate('/select/number');
      } else if (state.mode === '일반모드') {
        navigate('/start');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <Header>
        <Header.Title>{`운동결과`}</Header.Title>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
     
        <div className="flex justify-center w-full flex-col mt-[10%] ml-[32px]">
            <img  src={`/images/${state.exerciseType}.svg`}
                className="w-[154px] mt-[5%]"></img>
            <p className="mt-[20px] font-[NeoDunggeunmo] font-normal text-[22px] leading-[20px] text-black">{state.exerciseType}</p>

        <div className="flex flex-row items-baseline mt-[20px]">
            <p className="font-[NeoDunggeunmo] font-normal text-[36px] leading-[36px] text-[#FF801E]">{count}개</p>
            <p className=" font-[NeoDunggeunmo] font-normal ml-[5px] text-[22px] leading-[20px] text-black"> 성공하셨어요!</p>
       </div> 

        <div className=" font-[NeoDunggeunmo] font-normal mt-[40px] text-[22px] leading-[20px] text-black">
            <p>오늘 운동한 총 횟수 : {total}회</p>
            <p className="mt-[20px]">일일퀘스트 완료까지...{quest}세트</p>
        </div> 
        
        </div>

        <div className="flex w-[100%] center">
          <button className="fixed bottom-[80px] w-[90%] max-w-[460px] h-[50px] rounded-[30px] font-['NeoDunggeunmo'] text-[20px] bg-[#989C93] text-white ">공유하기</button>
        </div>
        <div className="flex w-[100%] mt-19 center">
          <CommonBtn status={1} text="메인으로" onClick={handleNextClick} />
        </div> 
      
      </DefaultBody>
    </div>
  );
}

export default Result;
