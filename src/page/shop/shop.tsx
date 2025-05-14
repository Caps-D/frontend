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

import { useState } from 'react'
import './shop.css'

// 옷 정보 (이미지는 제외)
const bottoms = [
  { id: 'bottom1', price: 30 },
  { id: 'bottom2', price: 45 },
  { id: 'bottom3', price: 25 },
  { id: 'bottom4', price: 40 },
  { id: 'bottom5', price: 35 },
  { id: 'bottom6', price: 50 },
]

const bottomComponents: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  bottom1: Bottom1,
  bottom2: Bottom2,
  bottom3: Bottom3,
  bottom4: Bottom4,
  bottom5: Bottom5,
  bottom6: Bottom6,
}

export default function Shop() {
  const [selectedBottom, setSelectedBottom] = useState<string | null>(null)
  const [userCoins, setUserCoins] = useState<number>(1000)

  const handlePurchaseBtn = () => {
    if (!selectedBottom) {
      alert("아이템을 선택해주세요.")
      return
    }

    const selected = bottoms.find(b => b.id === selectedBottom)
    if (!selected) return

    if (userCoins < selected.price) {
      alert("코인이 부족합니다.")
      return
    }

    setUserCoins(prev => prev - selected.price)
    alert(`${selected.id} 구매 완료!`)
  }

  const handleCancelBtn = () => {
    setSelectedBottom(null)
  }

  const handleSelectBottom = (bottomId: string) => {
    setSelectedBottom(bottomId)
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <Header>
        <Header.Title>{`상점`}</Header.Title>
        <Header.BackButton />
      </Header>

      {/* 보유 코인 표시 */}
        <div className="mt-24 mb-9 ml-72 relative w-fit h-fit">
            <Gold className="w-full h-full" />
             <p className="absolute top-2 left-11.5 font-['NeoDunggeunmo'] text-xl font-semibold">
            {userCoins}
            </p>
        </div>

      {/* 캐릭터 */}
      <div className="relative w-[48.53%] h-[36.2%]">
        <Woman1 className="w-full h-full" />
        {selectedBottom && (
          (() => {
            const SelectedComp = bottomComponents[selectedBottom]
            return <SelectedComp className="absolute top-[170px] left-[87px] w-[31%] h-[57%]" />
          })()
        )}
      </div>

      {/* 버튼 */}
      <div className="flex flex-row w-full h-[5.83%] items-center justify-center mt-8 gap-3.5">
        <PurchaseBtn className="w-[29%] h-full pr-5" onClick={handlePurchaseBtn} />
        <CancelBtn className="w-[22.13%] h-full" onClick={handleCancelBtn} />
      </div>

      {/* 상품 목록 */}
      <div className="flex flex-col shop w-full h-[29.1%] mt-auto">
        <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-6">
          {bottoms.slice(0, 3).map(bottom => {
            const Comp = bottomComponents[bottom.id]
            return (
              <button
                key={bottom.id}
                className={`shop-inner w-[24.53%] h-full items-center ${selectedBottom === bottom.id ? 'active' : ''}`}
                onClick={() => handleSelectBottom(bottom.id)}
              >
                <Comp className="w-[80%] h-[85%] mt-2" />
                <div className="flex flex-row items-center justify-center mt-1 text-sm font-semibold">
                  <Coin className="w-5 h-5 mr-1" />
                  <p className="font-['NeoDunggeunmo'] text-lg "> {bottom.price} </p> 
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-3 mb-6">
          {bottoms.slice(3).map(bottom => {
            const Comp = bottomComponents[bottom.id]
            return (
              <button
                key={bottom.id}
                className={`shop-inner w-[24.53%] h-full items-center ${selectedBottom === bottom.id ? 'active' : ''}`}
                onClick={() => handleSelectBottom(bottom.id)}
              >
                <Comp className="w-[80%] h-[85%] mt-2" />
                <div className="flex flex-row items-center justify-center mt-1 text-sm font-semibold">
                  <Coin className="flex w-5 h-5 mr-1" />
                  <p className="font-['NeoDunggeunmo'] text-lg"> {bottom.price} </p> 
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
