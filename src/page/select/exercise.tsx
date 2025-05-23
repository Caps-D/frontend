import CommonBtn from "../../components/commonBtn";
import { useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import { useNavigate } from "react-router-dom";
import { useMode } from "../../context/ExerciseContext"; // Context Hook import

function Exercise() {
  const navigate = useNavigate();

  // State to track active buttons
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Context에서 상태와 setState 가져오기
  const { state, setState } = useMode();

  // Function to handle button click, explicitly typing 'button' as a string
  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    // 선택된 운동을 context에 저장
    setState((prevState) => ({
      ...prevState,
      exerciseType: button, // exerciseType 업데이트
    }));
    console.log('운동 업데이트:', button);
  };

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
        <Header.Title>{`운동하기`}</Header.Title>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="w-[100%] mt-[20px] flex items-center justify-center text-[24px] font-normal text-black font-['NeoDunggeunmo']">
          운동을 선택해주세요.
        </div>

        <div id="buttonCont" className="mt-[20%] mb-[30px] h-[50%] flex w-[100%] flex-col items-center justify-center ">
          <div className="flex flex-row">
            <button
              className={`flex items-center mr-[10px] flex-col w-[144px] h-[147px] ${activeButton === '플랭크' ? 'bg-[#FF801E] text-white' : 'bg-[#D9D9D9] text-[#FF801E]'} text-[36px] font-normal leading-[36px] font-['NeoDunggeunmo']`}
              onClick={() => handleButtonClick('플랭크')}
            >
              <img
                src={`/images/플랭크${activeButton === '플랭크' ? '_active' : ''}.svg`}
                className="w-[134px] mt-[20px]"
              />
              <div className="text-[15px]">플랭크</div>
            </button>

            <button
              className={`flex items-center flex-col w-[144px] h-[147px] ${activeButton === '팔굽혀펴기' ? 'bg-[#FF801E] text-white' : 'bg-[#D9D9D9] text-[#FF801E]'} text-[36px] font-normal leading-[36px] font-['NeoDunggeunmo']`}
              onClick={() => handleButtonClick('팔굽혀펴기')}
            >
              <img
                src={`/images/팔굽혀펴기${activeButton === '팔굽혀펴기' ? '_active' : ''}.svg`}
                className="w-[134px] mt-[40px] mb-[12px]"
              />
              <div className="text-[15px]">팔굽혀펴기</div>
            </button>
          </div>

          <div className="flex flex-row mt-[10px]">
            <button
              className={`flex items-center mr-[10px] flex-col w-[144px] h-[147px] ${activeButton === '스쿼트' ? 'bg-[#FF801E] text-white' : 'bg-[#D9D9D9] text-[#FF801E]'} text-[36px] font-normal leading-[36px] font-['NeoDunggeunmo']`}
              onClick={() => handleButtonClick('스쿼트')}
            >
              <img
                src={`/images/스쿼트${activeButton === '스쿼트' ? '_active' : ''}.svg`}
                className="w-[80px] mt-[5px]"
              />
              <div className="text-[15px]">스쿼트</div>
            </button>

            <button className="flex items-center w-[144px] h-[147px] bg-[#D9D9D9] text-[16px] font-normal leading-[36px] text-black font-['NeoDunggeunmo']">
              to be Continued
              ...
            </button>
          </div>
        </div>
        <div className="flex w-[100%] mt-19 center">
          <CommonBtn status={1} text="다음" onClick={handleNextClick} />
        </div>
      </DefaultBody>
    </div>
  );
}

export default Exercise;
