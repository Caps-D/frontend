import CommonBtn from "../../components/commonBtn";
import { useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import { useNavigate } from "react-router-dom";

function Mode() {
  const navigate = useNavigate();
  
  // 선택된 모드를 관리할 상태 추가
  const [selectedMode, setSelectedMode] = useState<string>(""); // "normal" 또는 "user"

  // 모드 선택 시 상태 업데이트 함수
  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <Header>
        <Header.Title>{`운동하기`}</Header.Title>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="w-[100%] mt-[20px] flex items-center justify-center text-[24px] font-normal text-black font-['NeoDunggeunmo']">
          모드를 선택해주세요.
        </div>

        <div id="buttonCont" className="flex mt-[30px] w-[100%] flex-col items-center justify-center">
          <button
            className={`w-[70.93%] h-[40.61%] text-[200%] font-normal leading-[36px] text-white font-['NeoDunggeunmo'] ${selectedMode === "normal" ? "bg-[#FF801E]" : "bg-[#989C93]"}`}
            onClick={() => handleModeSelect("normal")}
          >
            <div className="mt-[30px]">일반 모드</div>
            <div className="text-[12px] mt-2">일일퀘스트를 빠르게 완료해보세요!</div>
          </button>

          <button
            className={`mt-[50px] w-[70.93%] h-[40.61%] text-[200%] font-normal leading-[36px] text-white font-['NeoDunggeunmo'] ${selectedMode === "user" ? "bg-[#FF801E]" : "bg-[#989C93]"}`}
            onClick={() => handleModeSelect("user")}
          >
            <div className="mt-[30px]">사용자 모드</div>
            <div className="text-[12px] mt-2">원하는 운동과 횟수를 지정할 수 있어요!</div>
          </button>
        </div>

        <CommonBtn status={1} text="다음" onClick={() => navigate('/select/exercise')} />
      </DefaultBody>
    </div>
  );
}

export default Mode;
