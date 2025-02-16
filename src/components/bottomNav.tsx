'use client';

import { Link } from 'react-router-dom';

const HomeIconPath = '/images/home.svg';
const closetIconPath = '/images/closet.svg';
const questIconPath = '/images/quest.svg';
const friendsIconPath = '/images/friends.svg';

const ActiveHomeIconPath = '/images/homeA.svg';
const ActiveclosetIconPath = '/images/closetA.svg';
const ActivequestIconPath = '/images/questA.svg';
const ActivefriendsIconPath = '/images/friendsA.svg';

interface BottomNavProps {
  activeIndex?: number; // 활성화된 항목의 인덱스, 기본값 설정 가능
}

const BottomNav: React.FC<BottomNavProps> = ({ activeIndex = 0 }) => {
  return (
    <nav
      className="fixed bottom-0 bg-white right-0 w-full left-1/2 -translate-x-1/2 max-w-[500px]"
      style={{
        boxShadow: '0px -2px 15px 5px rgba(0, 0, 0, 0.07)', // 얇고 가벼운 그림자
        height: '75px', // 컴팩트한 높이
      }}
    >
      <ul className="flex justify-around items-center h-full">
       
        <li className="flex-1 text-center">
          <Link to="/closet" className="flex justify-center items-center h-full">
            <img
              src={activeIndex === 0 ? ActiveclosetIconPath : closetIconPath}
              alt="Search"
              width={45}
              height={40}
            />
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link to="/main" className="flex justify-center items-center h-full">
            <img
              src={activeIndex === 1 ? ActiveHomeIconPath : HomeIconPath}
              alt="Home"
              width={38}
              height={30}
              className="stroke-red-500"
            />
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link to="/quest" className="flex justify-center items-center h-full">
            <img
              src={activeIndex === 2 ? ActivequestIconPath : questIconPath}
              alt="Message"
              width={38}
              height={30}
            />
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link to="/friends" className="flex justify-center items-center h-full mt-4">
            <img
              src={activeIndex === 3 ? ActivefriendsIconPath : friendsIconPath}
              alt="User"
              width={43}
              height={30}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
