
import CommonBtn from "../../components/commonBtn";
import BottomNav from "../../components/bottomNav";
import { GetRank } from "../../api/rank/getRank";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";

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


    type RankData = {
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

    const dummydata:RankData = {
        level:550,
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

   
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
        <Header>
            <Header.Title>{`랭킹`}</Header.Title>
            <Header.BackButton/>
        </Header>
            <DefaultBody hasHeader={1}>
                
            </DefaultBody>
        <BottomNav activeIndex={1}></BottomNav>
    </div>
  )
}

export default Rank;