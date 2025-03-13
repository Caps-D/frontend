import Header from '../../components/header'
import Gold from '../../assets/Gold.svg?react'
import Woman1 from '../../assets/Woman1.svg?react'
import PurchaseBtn from '../../assets/PurchaseBtn.svg?react'
import CancelBtn from '../../assets/CancelBtn.svg?react'
import Bottom1 from '../../assets/Bottom1.svg?react'
import Bottom2 from '../../assets/Bottom2.svg?react'
import Bottom3 from '../../assets/Bottom3.svg?react'
import Bottom4 from '../../assets/Bottom4.svg?react'
import Bottom5 from '../../assets/Bottom5.svg?react'
import Bottom6 from '../../assets/Bottom6.svg?react'
import Coin from '../../assets/Coin.svg?react'

import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './shop.css'

export default function Shop() {
    const navigate = useNavigate();

    const handleArrowBtn = () => {
        navigate('/closet')
    }

    const handleDressupBtn = () => {
        
    }

    const handleCancelBtn = () => {
        
    }

    return (
        <div className="flex flex-col w-full h-full items-center justify-start">

            <Header>
                <Header.Title>{`상점`}</Header.Title>
                <Header.BackButton/>
            </Header>

            {/* 골드 */}
            <div className="mt-24 mb-9 ml-72">
                <Gold/>
            </div>
           
            {/* 캐릭터 */}
            <div className="w-[48.53%] h-[36.2%]">
                <Woman1 className="w-full h-full"/>
            </div>   

            {/* 버튼 */}

            <div className="flex flex-row w-full h-[5.83%] items-center justify-center mt-8 gap-3.5">
                <PurchaseBtn className="w-[29%] h-full pr-5" onClick={handleDressupBtn}/>
                <CancelBtn className="w-[22.13%] h-full" onClick={handleCancelBtn}/>
            </div>      

            {/* 상점 */}
            <div className="flex flex-col shop w-full h-[29.1%] mt-auto ">
                {/* 옷걸이 */}
                <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-6">
                    <button className="shop-inner w-[24.53%] h-full items-center ">
                        <Bottom1 className="w-[80%] h-[85%]"/>
                        <Coin className="w-6 h-6 mb-1 mr-auto ml-7"></Coin>
                    </button>
                    <button className="shop-inner w-[24.53%] h-full items-center ">
                        <Bottom2 className="w-[80%] h-[85%]"/>
                        <Coin className="w-6 h-6 mb-1 mr-auto ml-7"></Coin>
                    </button>
                    <button className="shop-inner w-[24.53%] h-full items-center">
                        <Bottom3 className="w-[80%] h-[85%]"/>
                        <Coin className="w-6 h-6 mb-1 mr-auto ml-7"></Coin>
                    </button>
                </div>
                <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-3 mb-6">
                    <button className="shop-inner w-[24.53%] h-full items-center">
                        <Bottom4 className="w-[80%] h-[85%]"/>
                        <Coin className="w-6 h-6 mb-1 mr-auto ml-7"></Coin>
                    </button>
                    <button className="shop-inner w-[24.53%] h-full items-center">
                        <Bottom5 className="w-[80%] h-[85%]"/>
                        <Coin className="w-6 h-6 mb-1 mr-auto ml-7"></Coin>
                    </button>
                    <button className="shop-inner w-[24.53%] h-full items-center">
                        <Bottom6 className="w-[80%] h-[85%]"/>
                        <Coin className="w-6 h-6 mb-1 mr-auto ml-7"></Coin>
                    </button>
                </div>

            </div>
        </div>   
    )
}



