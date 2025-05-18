import Header from '../../components/header'
import Woman1 from '../../assets/Woman1.svg?react'
import DressBtn from '../../assets/DressBtn.svg?react'
import CancelBtn from '../../assets/CancelBtn.svg?react'
import Outer1 from '../../assets/top1.svg?react'
import Outer2 from '../../assets/top2.svg?react'
import Outer3 from '../../assets/top3.svg?react'
import Outer4 from '../../assets/top4.svg?react'
import Outer5 from '../../assets/top5.svg?react'
import Outer6 from '../../assets/top6.svg?react'

import { useState, useEffect } from 'react'
import { GetCloset } from '../../api/closet/getCloset'
import { PostWear } from '../../api/closet/postWear'
import './closet.css'

const outerItems = [
  { id: 1, name: "outer1", Component: Outer1 },
  { id: 2, name: "outer2", Component: Outer2 },
  { id: 3, name: "outer3", Component: Outer3 },
  { id: 4, name: "outer4", Component: Outer4 },
  { id: 5, name: "outer5", Component: Outer5 },
  { id: 6, name: "outer6", Component: Outer6 },
];

export default function Closet() {
  const [showClothesTop, setShowClothesTop] = useState<string | null>(null);
  const [showClothesBottom, setShowClothesBottom] = useState<string | null>(null);
  const [isWearing, setIsWearing] = useState(false);
  const [clothesData, setClothesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClosetData = async () => {
      try {
        const response = await GetCloset();
        setClothesData(response.data.items);
      } catch (error) {
        alert('옷장 데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchClosetData();
  }, []);

  const handleDressupBtn = async () => {
    if (!showClothesTop) {
      alert('상의 옷을 선택해주세요.');
      return;
    }

    const selectedOuter = outerItems.find(item => item.name === showClothesTop);
    if (!selectedOuter) {
      alert('선택한 상의 정보가 잘못되었습니다.');
      return;
    }

    setIsWearing(true);
    try {
      await PostWear(selectedOuter.id.toString(), showClothesBottom);
      alert(`${showClothesTop} 착용 완료!${showClothesBottom ? ` 하의: ${showClothesBottom}도 함께 착용!` : ''}`);
    } catch (error) {
      alert('옷 착용에 실패했습니다. 다시 시도해주세요.');
      console.error('PostWear 에러:', error);
    } finally {
      setIsWearing(false);
    }
  };

  const handleCancelBtn = () => {
    setShowClothesTop(null);
    setShowClothesBottom(null);
  };

  const handleClothesTopBtn = (outerName: string) => {
    setShowClothesTop(prev => (prev === outerName ? null : outerName));
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-start">
      <Header>
        <Header.Title>{`옷장`}</Header.Title>
        <Header.BackButton />
      </Header>

      {/* 캐릭터 영역 */}
      <div className="flex w-full h-[40%] mt-29 justify-center items-center">
        <div className="relative flex w-[48%] h-full mt-[10px] items-center justify-center">
          <Woman1 className="w-full h-full" />
          {outerItems.map(({ name, Component }) =>
            showClothesTop === name ? (
              <Component key={name} className="absolute top-0 w-full z-1 h-full object-contain" />
            ) : null
          )}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex flex-row w-full h-[5.83%] items-center justify-center mt-8 gap-3.5">
        <DressBtn className="w-[29%] h-full pr-5" onClick={handleDressupBtn} />
        <CancelBtn className="w-[22.13%] h-full" onClick={handleCancelBtn} />
      </div>

      {/* 옷장 */}
      <div className="flex flex-col closet w-full h-[31%] mt-auto">
        {/* 윗줄 상의 3개 */}
        <div className="flex flex-row w-full h-[40%] justify-center gap-8 mt-6">
          {outerItems.slice(0, 3).map(({ name, Component }) => (
            <button
              key={name}
              className={`closet-inner w-[24.53%] h-full ${showClothesTop === name ? 'active' : ''}`}
              onClick={() => handleClothesTopBtn(name)}
            >
              <Component className="w-full h-[220%] mt-[-90px] pointer-events-none" />
            </button>
          ))}
        </div>

        {/* 아랫줄 상의 3개 */}
        <div className="flex flex-row w-full h-[40%] justify-center gap-8 mt-3 mb-6">
          {outerItems.slice(3, 6).map(({ name, Component }) => (
            <button
              key={name}
              className={`closet-inner w-[24.53%] h-full ${showClothesTop === name ? 'active' : ''}`}
              onClick={() => handleClothesTopBtn(name)}
            >
              <Component className="w-full h-[220%] mt-[-90px] pointer-events-none" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
