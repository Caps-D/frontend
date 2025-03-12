import CommonBtn from "../../components/commonBtn";
import { useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import { useNavigate } from "react-router-dom";

function Number() {
  const navigate = useNavigate();
  
  const [number, setNumber] = useState<number>(0);
  const [set, setSet] = useState<number>(0);

  // 증가 함수
  const incrementNumber = () => setNumber(prev => prev + 1);
  const incrementSet = () => setSet(prev => prev + 1);

  // 감소 함수
  const decrementNumber = () => setNumber(prev => (prev > 0 ? prev - 1 : 0));
  const decrementSet = () => setSet(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <Header>
        <Header.Title>{`운동하기`}</Header.Title>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        <div className="w-[100%] mt-[20px] flex items-center justify-center text-[24px] font-normal text-black font-['NeoDunggeunmo']">
          횟수를 선택해주세요.
        </div>

        <div id="mainCont" className="mt-[20%] mb-[30px] flex w-[100%] flex-col items-center justify-center font-['NeoDunggeunmo'] text-black">
          <div id="number" className="w-[228px] text-[32px] flex flex-row items-center">
            <button
              className="w-[40px] h-[40px] text-[64px] flex items-center"
              onClick={decrementNumber}
            >
              -
            </button>
            <span className="mx-[15px] text-[48px]">{number}</span>
            <button
              className="w-[40px] h-[40px] text-[64px] flex items-center mr-[30px]"
              onClick={incrementNumber}
            >
              +
            </button>
            회
          </div>

          <div id="set" className="text-[32px] flex flex-row items-center mt-[30px]">
            <button
              className="w-[40px] h-[40px]  text-[64px] flex items-center"
              onClick={decrementSet}
            >
              -
            </button>
            <span className="mx-[15px] text-[48px]">{set}</span>
            <button
              className="w-[40px] h-[40px] text-[64px] flex items-center mr-[30px]"
              onClick={incrementSet}
            >
              +
            </button>
            세트
          </div>
        </div>
        <div className="flex w-[100%] mt-36  center">       
            <CommonBtn status={1} text="다음" onClick={() => navigate('/start')} />
        </div>
      </DefaultBody>
    </div>
  );
}

export default Number;
