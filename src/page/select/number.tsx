
import CommonBtn from "../../components/commonBtn";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";



function Number () {

   
   
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
        <Header>
            <Header.Title>{`운동하기`}</Header.Title>
            <Header.BackButton/>
        </Header>
        <DefaultBody hasHeader={1}>
            <div>모드를 선택해주세요.</div>

            <div id="buttonCont">
                <button>
                    일반 모드
                    <div>일일퀘스트를 빠르게 완료해보세요!</div>
                </button>

                <button>
                    사용자 모드
                    <div>원하는 운동과 횟수를 지정할 수 있어요!</div>
                </button>
            </div>

        <CommonBtn status={1} text="다음"></CommonBtn>
        </DefaultBody>
    </div>
  )
}

export default Number;