


function Main () {

    type mainData = {
        level: number;
        coin: number;
        targetExercise: string;
        targetcount:number;
        targetSet:number;
        targetCheck:number;
        character:{
            gender:string;
            top:string|null;
            pants:string|null;
            state:number|null;
        }
    }

    const dummydata:mainData = {
        level:530,
        coin:650,
        targetExercise:"윗몸일으키기",
        targetcount:30,
        targetSet:5,
        targetCheck:3,
        character:{
            gender:"female",
            top:null,
            pants:null,
            state:2,
        }
    }

    const shortenedLevel = Math.floor(dummydata.level / 100); 

    const generateCheckMarks = (targetSet: number, targetCheck: number) => {
        let result = '';
        for (let i = 0; i < targetSet; i++) {
          result += i < targetCheck ? 'V ' : 'O ';
        }
        return result.trim();
      }
    
      const checkMarks = generateCheckMarks(dummydata.targetSet, dummydata.targetCheck);
    
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
        {/*상단바*/}
        <div id='topCont' className="w-full h-[10%] flex-row">
            <div id='levelBar' className="w-[35.2%] h-[66.5%]">
               
            <svg xmlns="http://www.w3.org/2000/svg" className="relative w-[40.15%] h-full" viewBox="0 0 53 54">
            {/* 이미지 */}
            <image href="/images/Star 1.svg" className="w-[53px] h-[54px]" />

            {/* 텍스트 (이미지 위로 올리기) */}
            <text 
            x="50%" 
            y="50%" 
            text-anchor="middle" 
            dy="0.3em" 
            className="font-['NeoDunggeunmo'] font-normal text-[22px] leading-[20px] text-white">
            {shortenedLevel}
            </text>
            </svg>


            </div>


            <div id='coin'></div>


            <button id='rank' className="w-[13.33%] h-[4.18%]">
                <img src="/images/rankBtn.svg"></img>
            </button>


            <button id='shop'  className="w-[13.33%] h-[4.18%] ml-[10px]">
                <img src="/images/shopBtn.svg"></img>
            </button>
        </div>

        {/*목표*/}
        <div id='targetCont'>
            <div id='title'>오늘의 목표</div>
            <div id='target'>{dummydata.targetExercise} {dummydata.targetcount}회 X {dummydata.targetSet}세트</div>
            <div id='check'>
            {checkMarks}
            </div>
        </div>

        {/*캐릭터*/}
        <div id='character' className="w-[48.53%] h-[36.2%]">
            <img src={`/images/여자 기본${dummydata.character.state}.svg`}></img>
        </div>


    </div>
  )
}

export default Main;