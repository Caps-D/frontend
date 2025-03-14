import Header from '../../components/header'
import DefaultBody from '../../components/defaultBody'
import Woman1 from '../../assets/Woman1.svg?react'
import DressBtn from '../../assets/DressBtn.svg?react'
import CancelBtn from '../../assets/CancelBtn.svg?react'
import Outer1 from '../../assets/Outer1.svg?react'
import Outer2 from '../../assets/Outer2.svg?react'
import Outer3 from '../../assets/Outer3.svg?react'
import Outer4 from '../../assets/Outer4.svg?react'
import Outer5 from '../../assets/Outer5.svg?react'
import Outer6 from '../../assets/Outer6.svg?react'
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './closet.css'

export default function Closet() {
    const navigate = useNavigate();

    const [showClothes, setshowClothes] = useState<string | null> (null);

    const handleArrowBtn = () => {
        navigate('/shop')
    }

    const handleDressupBtn = () => {
        
    }

    const handleCancelBtn = () => {
        
    }


    const handleClothesBtn = (outerId: string) => {
        setshowClothes(prev => (prev === outerId ? null : outerId))
    }

    return (
        <div className="flex flex-col w-full h-full items-center justify-start">
            <Header>
                <Header.Title>{`옷장`}</Header.Title>
                <Header.BackButton/>
            </Header>

            {/* 캐릭터 */}
            <div className="mt-44 w-[48.53%] h-[36.2%]">
                <Woman1 className="w-full h-full"/>
            </div>   

            {/* 버튼 */}

            <div className="flex flex-row w-full h-[5.83%] items-center justify-center mt-8 gap-3.5">

                <DressBtn className="w-[29%] h-full pr-5" onClick={handleDressupBtn}/>
                <CancelBtn className="w-[22.13%] h-full" onClick={handleCancelBtn}/>
            </div>      

            {/* 옷장 */}
            <div className="flex flex-col closet w-fulㄴl h-[29.1%] mt-auto">

                {/* 옷걸이 */}
                <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-6">
                    <button className="closet-inner w-[24.53%] h-full" onClick={handleClothesBtn}>
                        <Outer1 className="w-full h-[85%]"/>
                    </button>
                    <button className="closet-inner w-[24.53%] h-full">
                        <Outer2 className="w-full h-[85%]"/>
                    </button>
                    <button className="closet-inner w-[24.53%] h-full">
                        <Outer3 className="w-full h-[85%]"/>
                    </button>
                </div>            

                <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-3 mb-6">
                    <button className="closet-inner w-[24.53%] h-full">
                        <Outer4 className="w-full h-[85%]"/>
                    </button>
                    <button className="closet-inner w-[24.53%] h-full">
                        <Outer5 className="w-full h-[85%]"/>
                    </button>
                    <button className="closet-inner w-[24.53%] h-full">
                        <Outer6 className="w-full h-[85%]"/>
                    </button>
                </div>
            </div>            

        </div>   
    )
}



