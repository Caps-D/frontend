import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import BottomNav from "../../components/bottomNav";
import Search from "../../assets/Search.svg?react";
import FriendAdd from "../../assets/FriendAdd.svg?react";
import { useNavigate  } from "react-router-dom";

const navigate = useNavigate();

export default function Friend(){

    return (
        <div className="flex flex-col w-full h-full items-center justify-start">
            <Header>
                <Header.Title>{`친구`}</Header.Title>
                <Header.BackButton/>
            </Header>

            <DefaultBody hasHeader={1}>
                <div className="flex flex-col items-center">
                    {/* 검색창 */}
                    <div className="relative w-[70%] h-full">
                        <input 
                            type="text"
                            placeholder="친구 닉네임을 검색하세요."
                            className="font-['NeoDunggeunmo'] w-full h-full bg-[#D9D9D9] border border-[#000000] rounded-[30px] p-2.5 pl-10"
                        /> 
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Search className="w-8 h-8"/>
                        </button>
                    </div>

                    {/* 친구추가 */}
                    <FriendAdd className="w-20 h-20" onClick={()=>navigate('')}/>
                    
                </div>
                           
            </DefaultBody>
            <BottomNav>

            </BottomNav>
        </div>
        
    )
}
/* 검색창 */

