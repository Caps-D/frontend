import Header from '../../components/header'
import Gold from '../../assets/Gold.svg?react'
import Woman1 from '../../assets/Woman1.svg?react'
import PurchaseBtn from '../../assets/PurchaseBtn.svg?react'
import CancelBtn from '../../assets/CancelBtn.svg?react'
import Bottom1 from '../../assets/pants1.svg?react'
import Bottom2 from '../../assets/pants2.svg?react'
import Bottom3 from '../../assets/pants3.svg?react'
import Bottom4 from '../../assets/pants4.svg?react'
import Bottom5 from '../../assets/pants5.svg?react'
import Bottom6 from '../../assets/pants6.svg?react'
import Coin from '../../assets/Coin.svg?react'
import Bicon1 from '../../assets/Bottom1.svg?react'
import Bicon2 from '../../assets/Bottom2.svg?react'
import Bicon3 from '../../assets/Bottom3.svg?react'
import Bicon4 from '../../assets/Bottom4.svg?react'
import Bicon5 from '../../assets/Bottom5.svg?react'
import Bicon6 from '../../assets/Bottom6.svg?react'

import { useEffect, useState } from 'react'
import { GetShop } from '../../api/shop/getShop'
import { GetShopCoin } from '../../api/shop/getShopCoin'
import { PostBuy } from '../../api/shop/postBuy' // 구매 API 임포트
import './shop.css'

const bottomComponents: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  bottom1: Bottom1,
  bottom2: Bottom2,
  bottom3: Bottom3,
  bottom4: Bottom4,
  bottom5: Bottom5,
  bottom6: Bottom6,
}

const bottomIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  bottom1: Bicon1,
  bottom2: Bicon2,
  bottom3: Bicon3,
  bottom4: Bicon4,
  bottom5: Bicon5,
  bottom6: Bicon6,
}

type BottomItem = {
  id: number
  name: string
  type: string
  price: number
}

export default function Shop() {
  const [bottoms, setBottoms] = useState<BottomItem[]>([])
  const [selectedBottom, setSelectedBottom] = useState<string | null>(null)
  const [userCoins, setUserCoins] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [items, coins] = await Promise.all([GetShop(), GetShopCoin()])
        const bottoms = items.filter(item => item.type === 'bottom')
        setBottoms(bottoms)
        setUserCoins(coins)
      } catch (err) {
        console.error('상점 데이터 로딩 실패', err)
      }
    }

    fetchData()
  }, [])

  const handlePurchaseBtn = async () => {
    if (!selectedBottom) {
      alert('아이템을 선택해주세요.')
      return
    }
    const selected = bottoms.find(b => b.name === selectedBottom)
    if (!selected) return

    if (userCoins < selected.price) {
      alert('코인이 부족합니다.')
      return
    }

    try {
      setLoading(true)
      const res = await PostBuy(selected.id) // itemId를 인자로 넘김
      if (res.success) {
        setUserCoins(res.remainingCoins) // 서버에서 받은 코인 잔액 업데이트
        alert(res.message)
        setSelectedBottom(null) // 구매 후 선택 초기화
      } else {
        alert(res.error || '구매 실패')
      }
    } catch (err) {
      console.error('구매 실패', err)
    } finally {
      setLoading(false)
    }
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
        <Header.Title>상점</Header.Title>
        <Header.BackButton />
      </Header>

      <div className="mt-24 mb-9 ml-72 relative w-fit h-fit">
        <Gold className="w-full h-full" />
        <p className="absolute top-2 left-12 font-['NeoDunggeunmo'] text-xl font-semibold">{userCoins}</p>
      </div>

      <div className="relative w-[48.53%] h-[36.2%]">
        <Woman1 className="w-full h-full" />
        {selectedBottom && bottomComponents[selectedBottom] && (() => {
          const SelectedComp = bottomComponents[selectedBottom]
          return <SelectedComp className="absolute top-0 left-1 w-full z-1 h-full object-contain pointer-events-none" />
        })()}
      </div>

      <div className="flex flex-row w-full h-[5.83%] items-center justify-center mt-8 gap-3.5">
        <PurchaseBtn
          className="w-[29%] h-full pr-5"
          onClick={handlePurchaseBtn}
        />
        <CancelBtn className="w-[22.13%] h-full" onClick={handleCancelBtn} />
      </div>

      <div className="flex flex-col shop w-full h-[29.1%] mt-auto">
        <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-6">
          {bottoms.slice(0, 3).map(bottom => {
            const Comp = bottomIcons[bottom.name]
            return (
              <button
                key={bottom.id}
                className={`shop-inner w-[24.53%] h-full items-center ${selectedBottom === bottom.name ? 'active' : ''}`}
                onClick={() => handleSelectBottom(bottom.name)}
              >
                <Comp className="w-[80%] h-[85%] mt-2" />
                <div className="flex flex-row items-center justify-center mt-1 text-sm font-semibold">
                  <Coin className="w-5 h-5 mr-1" />
                  <p className="font-['NeoDunggeunmo'] text-lg">{bottom.price}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex flex-row w-full h-[50%] justify-center gap-8 mt-3 mb-6">
          {bottoms.slice(3).map(bottom => {
            const Comp = bottomIcons[bottom.name]
            return (
              <button
                key={bottom.id}
                className={`shop-inner w-[24.53%] h-full items-center ${selectedBottom === bottom.name ? 'active' : ''}`}
                onClick={() => handleSelectBottom(bottom.name)}
              >
                <Comp className="w-[80%] h-[85%] mt-2" />
                <div className="flex flex-row items-center justify-center mt-1 text-sm font-semibold">
                  <Coin className="flex w-5 h-5 mr-1" />
                  <p className="font-['NeoDunggeunmo'] text-lg">{bottom.price}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
