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
import Bottom1 from '../../assets/pants1.svg?react'
import Bottom2 from '../../assets/pants2.svg?react'
import Bottom3 from '../../assets/pants3.svg?react'
import Bottom4 from '../../assets/pants4.svg?react'
import Bottom5 from '../../assets/pants5.svg?react'
import Bottom6 from '../../assets/pants6.svg?react'
import Bicon1 from '../../assets/Bottom1.svg?react'
import Bicon2 from '../../assets/Bottom2.svg?react'
import Bicon3 from '../../assets/Bottom3.svg?react'
import Bicon4 from '../../assets/Bottom4.svg?react'
import Bicon5 from '../../assets/Bottom5.svg?react'
import Bicon6 from '../../assets/Bottom6.svg?react'

import { useState, useEffect } from 'react'
import { GetCloset } from '../../api/closet/getCloset'
import { PostWear } from '../../api/closet/postWear'
import './closet.css'

type ClosetItem = {
  id?: number | null;
  name: string
  type: 'outer' | 'bottom'
  equipped: boolean
}

const outerItems = [
  { id: 1, name: "outer1", Component: Outer1 },
  { id: 2, name: "outer2", Component: Outer2 },
  { id: 3, name: "outer3", Component: Outer3 },
  { id: 4, name: "outer4", Component: Outer4 },
  { id: 5, name: "outer5", Component: Outer5 },
  { id: 6, name: "outer6", Component: Outer6 },
];

const bottomItems = [
  { id: 7, name: "bottom1", Component: Bottom1 },
  { id: 8, name: "bottom2", Component: Bottom2 },
  { id: 9, name: "bottom3", Component: Bottom3 },
  { id: 10, name: "bottom4", Component: Bottom4 },
  { id: 11, name: "bottom5", Component: Bottom5 },
  { id: 12, name: "bottom6", Component: Bottom6 },
];

const bottomIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  bottom1: Bicon1,
  bottom2: Bicon2,
  bottom3: Bicon3,
  bottom4: Bicon4,
  bottom5: Bicon5,
  bottom6: Bicon6,
}

export default function Closet() {
  const [showClothesTop, setShowClothesTop] = useState<string | null>(null);
  const [showClothesBottom, setShowClothesBottom] = useState<string | null>(null);
  const [isWearing, setIsWearing] = useState(false);
  const [clothesData, setClothesData] = useState<ClosetItem[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchClosetData = async () => {
    try {
      const response = await GetCloset();
      let items: ClosetItem[] = response.data.items;

      // 로그로 상태 확인
      console.log('GetCloset 응답:', items);

      items = items.map(item => {
        const normalizedName = item.name.toLowerCase();

        let foundId = null;
        if (item.type === 'outer') {
          const found = outerItems.find(o => o.name === normalizedName);
          foundId = found ? found.id : null;
        } else if (item.type === 'bottom') {
          const found = bottomItems.find(b => b.name === normalizedName);
          foundId = found ? found.id : null;
          if (!found) {
            console.warn(`bottomItems에 없는 하의명: ${normalizedName}`);
          }
        }
        return {
          ...item,
          id: foundId,
          name: normalizedName,
        };
      });

      setClothesData(items);

      const equippedTop = items.find(item => item.type === 'outer' && item.equipped);
      const equippedBottom = items.find(item => item.type === 'bottom' && item.equipped);

      console.log('착용된 상의 아이템:', equippedTop);
      console.log('착용된 하의 아이템:', equippedBottom);

      setShowClothesTop(equippedTop?.name ?? null);
      setShowClothesBottom(equippedBottom?.name ?? null);

    } catch (error) {
      alert('옷장 데이터를 가져오는 데 실패했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchClosetData();
}, []);

const handleDressupBtn = async () => {
  if (!showClothesTop && !showClothesBottom) {
    alert('착용할 옷을 선택해주세요.');
    return;
  }

  const selectedOuter = showClothesTop
    ? outerItems.find(item => item.name === showClothesTop)
    : null;

  const selectedBottom = showClothesBottom
    ? bottomItems.find(item => item.name === showClothesBottom)
    : null;

  if (showClothesTop && !selectedOuter) {
    alert('선택한 상의 정보가 잘못되었습니다.');
    return;
  }

  if (showClothesBottom && !selectedBottom) {
    alert('선택한 하의 정보가 잘못되었습니다.');
    return;
  }

  setIsWearing(true);

  try {
    await PostWear(
      selectedOuter ? selectedOuter.id ?? 0 : 0,
      selectedBottom ? selectedBottom.id ?? 0 : 0
    );

    setShowClothesTop(selectedOuter?.name || null);
    setShowClothesBottom(selectedBottom?.name || null);

    alert(
      `${selectedOuter ? `${selectedOuter.name} 착용 완료!` : ''} ${
        selectedBottom ? `하의: ${selectedBottom.name} 착용 완료!` : ''
      }`
    );
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

  const handleClothesBottomBtn = (bottomName: string) => {
    setShowClothesBottom(prev => (prev === bottomName ? null : bottomName));
  };

  const SelectedBottomComponent = bottomItems.find(
    item => item.name === showClothesBottom
  )?.Component as React.FC<React.SVGProps<SVGSVGElement>>;

  console.log('현재 선택된 하의:', showClothesBottom);

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
          {SelectedBottomComponent && (
            <SelectedBottomComponent className="absolute top-0 left-1 w-full z-0 h-full object-contain" />
          )}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex flex-row w-full h-[5.83%] items-center justify-center mt-8 gap-3.5">
        <DressBtn className="w-[29%] h-full pr-5" onClick={handleDressupBtn} />
        <CancelBtn className="w-[22.13%] h-full" onClick={handleCancelBtn} />
      </div>

      {/* 옷장 */}
      <div className="flex flex-col closet w-full h-[31%] mt-auto overflow-y-auto">
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

        <div className="flex flex-row w-full h-[40%] justify-center gap-8 mt-3 mb-3">
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

        <div className="flex flex-row w-full h-[40%] justify-center gap-8">
          {clothesData
            .filter(item => item.type === 'bottom')
            .slice(0, 3)
            .map(({ name }) => {
              const IconComponent = bottomIcons[name];
              if (!IconComponent) {
                console.warn(`하의 아이콘 없음: ${name}`);
                return <div key={name}>아이콘 없음</div>;
              }

              return (
                <button
                  key={name}
                  className={`closet-inner w-[24.53%] h-full flex flex-col items-center justify-start ${
                    showClothesBottom === name ? 'active' : ''
                  }
                `}
                onClick={() => handleClothesBottomBtn(name)}
              >
            <IconComponent className="w-[70%] h-[80%] mt-7 mb-6 pointer-events-none" />
            </button>
          );
          })}
        </div>
      </div>
    </div>
  );
}