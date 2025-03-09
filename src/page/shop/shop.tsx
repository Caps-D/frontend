import 상점 from '../../assets/Shop.svg?react'
import Arrow from '../../assets/Arrow.svg?react'
import Gold from '../../assets/Gold.svg?react'
import Woman1 from '../../assets/Woman1.svg?react'
import PurchaseBtn from '../../assets/PurchaseBtn.svg?react'
import CancelBtn from '../../assets/CancelBtn.svg?react'
import Outer1 from '../../assets/Outer1.svg?react'
import Outer2 from '../../assets/Outer2.svg?react'
import Outer3 from '../../assets/Outer3.svg?react'
import Outer4 from '../../assets/Outer4.svg?react'
import Outer5 from '../../assets/Outer5.svg?react'
import Outer6 from '../../assets/Outer6.svg?react'
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
            {/* 상단바 */}
            <div className="flex flex-row w-full mt-14 gap-14">
                <Arrow className="ml-6" onClick={handleArrowBtn}/>
                <상점 className="ml-32"/>
            </div>

            <Gold className="mt-0.5 mb-9 ml-72"></Gold>

            {/* 캐릭터 */}
            <div className="w-[48.53%] h-[36.2%]">
                <Woman1 className="w-full h-full"/>
            </div>   

            {/* 버튼 */}
            <div className="flex flex-row w-full h-[5.83%] items-center justify-center mt-10 gap-3.5">
                <PurchaseBtn className="w-[29%] h-full pr-5" onClick={handleDressupBtn}/>
                <CancelBtn className="w-[22.13%] h-full" onClick={handleCancelBtn}/>
            </div>      

            {/* 상점 */}
            <div className="flex flex-col shop w-full h-[29.1%] mt-auto ">
                {/* 옷걸이 */}
                <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-6">
                    <button className="shop-inner w-[24.53%] h-full">
                        <Outer1 className="w-full h-[85%]"/>
                    </button>
                    <button className="shop-inner w-[24.53%] h-full">
                        <Outer2 className="w-full h-[85%]"/>
                    </button>
                    <button className="shop-inner w-[24.53%] h-full">
                        <Outer3 className="w-full h-[85%]"/>
                    </button>
                </div>
                <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-3 mb-6">
                    <button className="shop-inner w-[24.53%] h-full">
                        <Outer4 className="w-full h-[85%]"/>
                    </button>
                    <button className="shop-inner w-[24.53%] h-full">
                        <Outer5 className="w-full h-[85%]"/>
                    </button>
                    <button className="shop-inner w-[24.53%] h-full">
                        <Outer6 className="w-full h-[85%]"/>
                    </button>
                </div>

            </div>
        </div>   
    )
}



