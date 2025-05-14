import Header from '../../components/header'
import Woman1 from '../../assets/Woman1.svg?react'
import DressBtn from '../../assets/DressBtn.svg?react'
import CancelBtn from '../../assets/CancelBtn.svg?react'
import Outer1 from '../../assets/Outer1.svg?react'
import Outer2 from '../../assets/Outer2.svg?react'
import Outer3 from '../../assets/Outer3.svg?react'
import Outer4 from '../../assets/Outer4.svg?react'
import Outer5 from '../../assets/Outer5.svg?react'
import Outer6 from '../../assets/Outer6.svg?react'
import { useState } from 'react'
import './closet.css'

export default function Closet() {
    const [showClothes, setShowClothes] = useState<string | null>(null)

    const handleDressupBtn = () => {
        if (showClothes) {
            alert(`${showClothes} 착용 완료!`)
            // 이후 navigate 또는 저장 로직 추가 가능
            // 예: navigate('/next-page')
        } else {
            alert("옷을 선택해주세요.")
        }
    }

    const handleCancelBtn = () => {
        setShowClothes(null)
    }

    const handleClothesBtn = (outerId: string) => {
        if (showClothes !== outerId) {
            setShowClothes(outerId)
        }
    }

    return (
        <div className="flex flex-col w-full h-full items-center justify-start">
            <Header>
                <Header.Title>{`옷장`}</Header.Title>
                <Header.BackButton />
            </Header>

            {/* 캐릭터 영역 */}
            <div className="relative mt-44 w-[48.53%] h-[36.2%]">
                <Woman1 className="w-full h-full" />
                {showClothes === 'outer1' && <Outer1 className="absolute top-[95px] left-[66px] w-[48.53%] h-[72%]" />}
                {showClothes === 'outer2' && <Outer2 className="absolute top-[95px] left-[66px] w-[48.53%] h-[72%]" />}
                {showClothes === 'outer3' && <Outer3 className="absolute top-[95px] left-[66px] w-[48.53%] h-[72%]" />}
                {showClothes === 'outer4' && <Outer4 className="absolute top-[95px] left-[66px] w-[48.53%] h-[72%]" />}
                {showClothes === 'outer5' && <Outer5 className="absolute top-[95px] left-[66px] w-[48.53%] h-[72%]" />}
                {showClothes === 'outer6' && <Outer6 className="absolute top-[95px] left-[66px] w-[48.53%] h-[72%]" />}
            </div>

            {/* 버튼 */}
            <div className="flex flex-row w-full h-[5.83%] items-center justify-center mt-8 gap-3.5">
                <DressBtn className="w-[29%] h-full pr-5" onClick={handleDressupBtn} />
                <CancelBtn className="w-[22.13%] h-full" onClick={handleCancelBtn} />
            </div>

            {/* 옷장 */}
            <div className="flex flex-col closet w-full h-[29.1%] mt-auto">
                {/* 윗줄 */}
                <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-6">
                    <button
                        className={`closet-inner w-[24.53%] h-full ${showClothes === 'outer1' ? 'active' : ''}`}
                        onClick={() => handleClothesBtn('outer1')}
                    >
                        <Outer1 className="w-full h-[82%]" />
                    </button>
                    <button
                        className={`closet-inner w-[24.53%] h-full ${showClothes === 'outer2' ? 'active' : ''}`}
                        onClick={() => handleClothesBtn('outer2')}
                    >
                        <Outer2 className="w-full h-[82%]" />
                    </button>
                    <button
                        className={`closet-inner w-[24.53%] h-full ${showClothes === 'outer3' ? 'active' : ''}`}
                        onClick={() => handleClothesBtn('outer3')}
                    >
                        <Outer3 className="w-full h-[82%]" />
                    </button>
                </div>

                {/* 아랫줄 */}
                <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-3 mb-6">
                    <button
                        className={`closet-inner w-[24.53%] h-full ${showClothes === 'outer4' ? 'active' : ''}`}
                        onClick={() => handleClothesBtn('outer4')}
                    >
                        <Outer4 className="w-full h-[82%]" />
                    </button>
                    <button
                        className={`closet-inner w-[24.53%] h-full ${showClothes === 'outer5' ? 'active' : ''}`}
                        onClick={() => handleClothesBtn('outer5')}
                    >
                        <Outer5 className="w-full h-[82%]" />
                    </button>
                    <button
                        className={`closet-inner w-[24.53%] h-full ${showClothes === 'outer6' ? 'active' : ''}`}
                        onClick={() => handleClothesBtn('outer6')}
                    >
                        <Outer6 className="w-full h-[82%]" />
                    </button>
                </div>
            </div>
        </div>
    )
}
