import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import BottomNav from "../../components/bottomNav";
import Search from "../../assets/Search.svg?react";
import FriendAdd from "../../assets/FriendAdd.svg?react";
import Level from "../../assets/Level.svg?react";
import DeleteBtn from "../../assets/DeleteBtn.svg?react"
import DeleteFriendBtn from "../../assets/DeleteFriendBtn.svg?react";
import { useNavigate  } from "react-router-dom";



export default function Friend(){
    const navigate = useNavigate();
    const handleDeleteBtn = () => {
       <DeleteFriendBtn></DeleteFriendBtn>
    }

    return (
        <div className="flex flex-col w-full h-full items-center justify-start">
            <Header>
                <Header.Title>{`친구`}</Header.Title>
                <Header.BackButton/>
            </Header>

            <DefaultBody hasHeader={1}>
                <div className="flex flex-col items-center">
                    {/* 검색창 */}
                    <div className="flex flex-row w-[70%] h-[40%]">
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
                    <div className="mr-auto mt-4 ml-4 mb-3">
                        <FriendAdd className="w-12 h-12" onClick={()=>navigate('/friend/new')}/>
                    </div>
                   
                    {/* 친구목록 */}
                    <div className="flex flex-col w-full h-full">
                        <div className="w-[95%] h-0 border border-[#D9D9D9]"></div>

                        <div className="flex flex-row p-3">
                            <div className="flex mr-auto text-2xl text-shadow-md font-normal font-['NeoDunggeunmo']"> 박현준
                                <Level className="ml-2"></Level>
                            </div>
                            <div className="flex ml-auto mr-4 items-center justify-center">
                                <DeleteBtn onClick={handleDeleteBtn}></DeleteBtn> 
                            </div>
                           
                        </div>  
                        <div className="w-[95%] h-0 border border-[#D9D9D9]"></div>

                        <div className="flex flex-row p-3">
                            <div className="flex mr-auto text-2xl text-shadow-md font-normal font-['NeoDunggeunmo']"> 신창희
                                <Level className="ml-2"></Level>
                            </div>
                            <div className="flex ml-auto mr-4 items-center justify-center">
                                <DeleteBtn></DeleteBtn> 
                            </div>
                           
                        </div> 
                        <div className="w-[95%] h-0 border border-[#D9D9D9]"></div>

                        <div className="flex flex-row p-3">
                            <div className="flex mr-auto text-2xl text-shadow-md font-normal font-['NeoDunggeunmo']"> 정혜원
                                <Level className="ml-2"></Level>
                            </div>
                            <div className="flex ml-auto mr-4 items-center justify-center">
                                <DeleteBtn></DeleteBtn> 
                            </div>
                           
                        </div> 
                        <div className="w-[95%] h-0 border border-[#D9D9D9]"></div>

                        <div className="flex flex-row p-3">
                            <div className="flex mr-auto text-2xl text-shadow-md font-normal font-['NeoDunggeunmo']"> 조예령
                                <Level className="ml-2"></Level>
                            </div>
                            <div className="flex ml-auto mr-4 items-center justify-center">
                                <DeleteBtn></DeleteBtn> 
                            </div>
                           
                        </div> 
                        <div className="w-[95%] h-0 border border-[#D9D9D9]"></div>
                    </div>
                </div>
            </DefaultBody>
            <BottomNav/>
        </div>
        
    )
}

