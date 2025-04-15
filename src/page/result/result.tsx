import CommonBtn from "../../components/commonBtn";
import { useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import { useNavigate } from "react-router-dom";
import { useMode } from "../../context/ExerciseContext"; // Context Hook import
import { useRef } from "react";
import html2canvas from "html2canvas";
import ShareModal from "../../components/ShareModal"; // 경로 맞게

function Result() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  // State to track active buttons
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  // Context에서 상태와 setState 가져오기
  const { state, setState } = useMode();
  const total = 60;
  const quest = 2;

  const count = state.exerciseCount * state.exerciseSet;
  const handleShare = (platform: string) => {
    if (!imageUrl) return;
    if (platform === "kakao") {
      alert("카카오톡 공유는 별도 구현 필요!");
      // window.Kakao.Link.sendDefault(...) 등 실제 구현 필요
    } else if (platform === "naver") {
      alert("네이버 블로그는 이미지 직접 공유가 불가합니다. 이미지를 저장 후 업로드 해주세요.");
    } else if (platform === "instagram") {
      alert("인스타그램은 웹에서 직접 이미지 공유가 불가합니다. 이미지를 저장 후 앱에서 업로드 해주세요.");
    }
  };

  const handleShareClick = async () => {
    if (!resultRef.current) return;
  
    // 1. 결과 카드 캡처
    const canvas = await html2canvas(resultRef.current, { useCORS: true, scale: 2 });
    const baseImage = canvas;
  
    // 2. 로고 이미지 불러오기
    const logo = new window.Image();
    logo.src = "/images/logo.svg"; // 로고 경로
    logo.crossOrigin = "anonymous";
  
    logo.onload = () => {
      // 3. 새 캔버스 생성 (원본과 동일 크기)
      const newCanvas = document.createElement("canvas");
      newCanvas.width = baseImage.width;
      newCanvas.height = baseImage.height;
      const ctx = newCanvas.getContext("2d");
  
      if (ctx) {
        // 4. 결과 이미지 그리기
        ctx.drawImage(baseImage, 0, 0);
  
        // 5. 로고 그리기 (오른쪽 위에 20px 여백, 크기 80x32 예시)
        const logoWidth = 240;
        const logoHeight = 150;
        ctx.drawImage(
          logo,
          newCanvas.width - logoWidth - 20, // 오른쪽 20px 여백
          20, // 위쪽 20px 여백
          logoWidth,
          logoHeight
        );
  
        // 6. 최종 이미지 URL로 저장
        const finalImg = newCanvas.toDataURL("image/png");
        setImageUrl(finalImg);
        setIsModalOpen(true);
      }
    };
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <Header>
        <Header.Title>{`운동결과`}</Header.Title>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
     
        <div 
            ref={resultRef}
            className="flex justify-center w-full flex-col pt-[10%] pl-[32px]">
            <img  src={`/images/${state.exerciseType}.svg`}
                className="w-[154px] mt-[5%]"></img>
            <p className="mt-[20px] font-[NeoDunggeunmo] font-normal text-[22px] leading-[20px] text-black">{state.exerciseType}</p>

        <div className="flex flex-row items-baseline mt-[20px]">
            <p className="font-[NeoDunggeunmo] font-normal text-[36px] leading-[36px] text-[#FF801E]">{count}개</p>
            <p className=" font-[NeoDunggeunmo] font-normal ml-[5px] text-[22px] leading-[20px] text-black"> 성공하셨어요!</p>
       </div> 

        <div className=" font-[NeoDunggeunmo] font-normal mt-[40px] text-[22px] leading-[20px] text-black">
            <p>오늘 운동한 총 횟수 : {total}회</p>
            <p className="mt-[20px] mb-[60px]">일일퀘스트 완료까지...{quest}세트</p>
        </div> 
        </div>
      

        <div className="flex w-[100%] center">
          <button className="fixed bottom-[80px] w-[90%] max-w-[460px] h-[50px] rounded-[30px] font-['NeoDunggeunmo'] text-[20px] bg-[#989C93] text-white "  onClick={handleShareClick}>공유하기</button>
        </div> 
         
        <div className="flex w-[100%] mt-19 center">
          <CommonBtn status={1} text="메인으로" onClick={()=>navigate('/main')} />
        </div> 
      
      </DefaultBody>

      <ShareModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  imageUrl={imageUrl}
  onShare={handleShare}
/>

    </div>

    
  );
}

export default Result;
