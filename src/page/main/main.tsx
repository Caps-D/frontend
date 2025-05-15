
import CommonBtn from "../../components/commonBtn";
import BottomNav from "../../components/bottomNav";
import { GetMain } from "../../api/main/getMain";
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import DefaultBody from "../../components/defaultBody";
import { useMode } from "../../context/ExerciseContext"; // Context Hook import

function Main () {

    const { state, setState } = useMode();

    const [ mainData, setMainData] = useState<mainData>({
        level: 0,
        coin: 0,
        targetExercise: '스쿼트',
        targetcount:0,
        targetSet:0,
        targetCheck:0,
        character:{
            gender:'female',
            top:'',
            pants:'',
            state:1,
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const getChatRoomData = async () => {
            console.log('실행')
            try {
                const mainData = await GetMain();
                console.log(mainData.data);
                setMainData(mainData.data || []);
                setState((prevState) => ({
      ...prevState,
      exerciseCount:mainData.targetcount,
      exerciseSet:mainData.targetSet,
      exerciseType:mainData.targetExercise
    }));
            } catch (error) {
                console.log("메인 정보를 불러오지 못했습니다.", error);
                
            }
        };
        getChatRoomData();
    },[]);


    type mainData = {
        level: number;
        coin: number;
        targetExercise: string;
        targetcount:number;
        targetSet:number;
        targetCheck:number;
        character:{
            gender:string|null;
            top:string|null;
            pants:string|null;
            state:number|null;
        }
    }

  

    const shortenedLevel = Math.floor(mainData.level / 100); 

    const generateCheckMarks = (targetSet: number, targetCheck: number) => {
        let result = '';
        for (let i = 0; i < targetSet; i++) {
          if (i < targetCheck) {
            result += `<span class="text-[#FF801E] ">v</span> `; // 완료된 체크 
          } else {
            result += `<span class="text-black ">o</span> `; // 미완료된 체크 
          }
        }
        return result.trim();
      }
      
    
      const checkMarks = generateCheckMarks(mainData.targetSet, mainData.targetCheck);
      const lv_progress = mainData.level % 100 + 5;


      
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
       <DefaultBody hasHeader={0}>
        {/*상단바*/}
        <div id='topCont' className="w-full  h-[10%] flex min-h-[50px] items-center justify-around mt-3">
            <div id='levelBar' className="flex w-[35.2%] h-[66.5%] min-h-[50px]  max-h-[60px]">
               
            <svg xmlns="http://www.w3.org/2000/svg" className="relative w-[40.15%] h-full text-white z-2 min-h-[50px] min-w-[50px]" viewBox="0 0 53 54" >
            {/* 이미지 */}
            <image href="/images/Star 1.svg" className="w-[53px] h-[54px] text-white min-h-[50px]" />

            {/* 텍스트 (이미지 위로 올리기) */}
            <text 
            x="50%" 
            y="50%" 
            text-anchor="middle" 
            dy="0.4em" 
            fill="white"
            className="font-['NeoDunggeunmo'] font-normal text-[22px] leading-[20px] text-white ">
            {shortenedLevel}
            </text>
            </svg>
            <div id="bar" className="relative w-[118px] h-full ml-[-11px] mt-[2px] min-w-[50px]">
  
                 <div id="bar_bg" className="absolute w-full h-[50.5%] bg-[#D9D9D9] rounded-[30px] mt-[17px] ml-[-15px] z-[0] "></div>

 
                <div id="bar_progress" className="absolute h-[50.5%] bg-[#1B6FFF] rounded-[30px] mt-[17px] ml-[-15px] z-[1]" style={{ width: `${lv_progress}%`}}></div>
            </div>

            </div>


            <div id='coin' className="flex w-[97px] h-[66.5%] min-h-[50px] ml-[-10px] max-h-[60px]">
                <img src="/images/coin.svg" className="w-[44px] h-[42px] mt-[10px] z-1"></img>
                <div id="coin_bar" className="w-[82px] h-[50.5%] bg-[#D9D9D9] rounded-[30px] mt-[17px] ml-[-15px] z-[0] flex items-center flex-col justify-center">
                <text 
                    text-anchor="middle" 
                    dy="0.4em" 
                    fill="black"
                    className="font-['NeoDunggeunmo'] font-normal text-[22px] leading-[20px] ml-[6px]">
                    {mainData.coin}
                </text>
                </div>
            </div>


            <button id='rank' className="w-[13.33%] h-[4.18%]min-h-[50px] min-w-[50px] ml-4 mt-[8px]" onClick={()=>navigate('/rank')}>
                <img src="/images/rankBtn.svg"></img>
            </button>


            <button id='shop'  className="w-[13.33%] h-[4.18%] ml-[10px] min-h-[50px] min-w-[50px] mt-[8px] " onClick={()=>navigate('/shop')}>
                <img src="/images/shopBtn.svg"></img>
            </button>

        </div>

        {/*목표*/}
        <div id='targetCont' className="flex flex-col justify-start items-center w-full mt-[45px] mb-[5%]">
            <div id='title' className="font-['NeoDunggeunmo'] font-normal text-[27px] leading-[24px]">오늘의 목표</div>
            <div id='target'className="font-['NeoDunggeunmo'] font-normal text-[17px] leading-[13px] mt-[16px]">
                {mainData.targetExercise} {mainData.targetcount}회 X {mainData.targetSet}세트
            </div>
            <div id='check' className="font-['NeoDunggeunmo'] font-normal text-[70px] leading-[34px] mt-[16px] tracking-[-9px]" dangerouslySetInnerHTML={{ __html: checkMarks }}
         >
            
            </div>
        </div>

        {/*캐릭터*/}
    <div className="flex w-full h-[40%] justify-center items-center">
  <div
    id="character"
    className="relative flex w-[48%] h-full mt-[10px] items-center justify-center"
    style={{ aspectRatio: '1/1' }}
  >
    {/* 캐릭터 이미지 */}
    <img
      src={`/images/${mainData.character.gender} 기본${mainData.character.state}.svg`}
      className="absolute top-0 left-0 w-full h-full object-contain"
      alt="캐릭터"
    />
    {/* 옷 이미지 (위에 덮어씌움) */}
    {mainData.character.top && (
      <img
        src={`/src/assets/${mainData.character.top}.svg`}
        className="absolute top-0 w-full z-1 h-full object-contain pointer-events-none"
        alt="상의"
      />
    )}

    {mainData.character.pants && (
      <img
        src={`/src/assets/${mainData.character.pants}.svg`}
        className="absolute top-0 z-0 w-full h-full object-contain pointer-events-none"
        alt="하의"
      />
    )}
  </div>
</div>

        <CommonBtn status={1} text="운동 시작하기" onClick={()=>navigate('/select/mode')} hasNav={true}></CommonBtn>
        <BottomNav activeIndex={1}></BottomNav>
        
        </DefaultBody>
    </div>
  )
}

export default Main;