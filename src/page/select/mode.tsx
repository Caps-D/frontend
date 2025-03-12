
import CommonBtn from "../../components/commonBtn";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";



function Mode () {

   
   
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
        <Header>
            <Header.Title>{`운동하기`}</Header.Title>
            <Header.BackButton/>
        </Header>
        <DefaultBody hasHeader={1}>
            <div className="w-[100%] mt-[20px] flex items-center justify-center text-[24px] font-normal  text-black font-['NeoDunggeunmo']">모드를 선택해주세요.</div>

            <div id="buttonCont" className="mt-[30px] mb-[30px] flex w-[100%] flex-col items-center justify-center ">
                <button className="w-[266px] h-[143px] bg-[#FF801E] text-[36px] font-normal leading-[36px] text-white font-['NeoDunggeunmo']">
                    <div className="mt-[30px]">일반 모드</div>
                    <div className="text-[12px] mt-4 ">일일퀘스트를 빠르게 완료해보세요!</div>
                </button>

                <button className="mt-[50px] w-[266px] h-[143px] bg-[#989C93] text-[36px] font-normal leading-[36px] text-white font-['NeoDunggeunmo']">
                    <div className="mt-[30px]">사용자 모드</div>
                    <div className="text-[12px] mt-4 ">원하는 운동과 횟수를 지정할 수 있어요!</div>
                </button>
            </div>

        <CommonBtn status={1} text="다음"></CommonBtn>
        </DefaultBody>
    </div>
  )
}

export default Mode;