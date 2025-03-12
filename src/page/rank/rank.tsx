
import CommonBtn from "../../components/commonBtn";
import BottomNav from "../../components/bottomNav";
import { GetRank } from "../../api/rank/getRank";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";

interface Rank{
    rank: number;     // 순위
    nickname: string;  // 닉네임
    exerciseCount: number;  // 운동횟수
}

function Rank () {

    const [ RankData, setRankData] = useState<any>([]);


    useEffect(() => {
        const getRankData = async () => {
            console.log('실행')
            try {
                const RankData = await GetRank();
                console.log(RankData.data);
                setRankData(RankData.data || []);
            } catch (error) {
                console.log("메인 정보를 불러오지 못했습니다.", error);
                setRankData([]);
            }
        };
        getRankData();
    },[]);


  

    const dummyData:Rank[] = [
        { rank: 1, nickname: '철수', exerciseCount: 50 },
        { rank: 2, nickname: '영희', exerciseCount: 40 },
        { rank: 3, nickname: '민수', exerciseCount: 30 },
        { rank: 4, nickname: '지수', exerciseCount: 20 },
        { rank: 5, nickname: '현수', exerciseCount: 10 },
      ];
    
      const getRankStyle = (rank: number) => {
        switch (rank) {
          case 1:
            return "text-[38px] text-shadow-md font-bold leading-[36px] text-[#FFB81E] border-[#000000] font-['NeoDunggeunmo']";  // 1등 금색
          case 2:
            return "text-[38px]  text-shadow-md font-bold leading-[36px] text-[#989C93] border-[#FF9F55] font-['NeoDunggeunmo']";   // 2등 은색
          case 3:
            return "text-[38px]  text-shadow-md font-bold leading-[36px] text-[#90704B] border-[#FF9F55] font-['NeoDunggeunmo']";  // 3등 동색
          default:
            return "text-[36px]  text-shadow-md font-normal leading-[36px] text-[#000000] border-[#FF9F55] font-['NeoDunggeunmo']";      // 나머지 기본 색상
        }
      };
   
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
        <Header>
            <Header.Title>{`랭킹`}</Header.Title>
            <Header.BackButton/>
        </Header>
        <DefaultBody hasHeader={1}>
        <table className="flex w-[100%] flex-col ml-7">
        <thead>
          <tr className="flex w-[90%] ml-[-10px] mb-[30px] justify-between text-[20px] font-normal leading-[20px] text-black font-['NeoDunggeunmo']">
            <th>순위</th>
            <th className="ml-[20px] ">닉네임</th>
            <th>운동횟수</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((data) => (
            <tr key={data.rank} className="flex justify-between w-[80%] mb-[10px]" >
              <td className={`${getRankStyle(data.rank)} text-center flex`}>{data.rank}</td>
              <td className="flex font-normal text-[24px] text-black font-['NeoDunggeunmo']">{data.nickname}</td>
              <td className="flex font-normal text-[24px] text-black font-['NeoDunggeunmo']">{data.exerciseCount}</td>
            </tr>
          ))}
        </tbody>
      </table> 
        </DefaultBody>
        <BottomNav activeIndex={1}></BottomNav>
    </div>
  )
}

export default Rank;