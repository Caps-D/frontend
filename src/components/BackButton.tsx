

import React from "react";
import { useNavigate } from "react-router-dom";

interface BackProps {
    onClick?: () => void;
}

const BackButton: React.FC<BackProps> = ({ onClick }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onClick) {
            // onClick이 있으면 onClick 메서드 호출
            onClick();
        } else {
            // onClick이 없으면  호출
            navigate(-1);
        }
        console.log("BackButton: handleBack");
    };

    return (
        <button
            onClick={handleBack}
            className="w-[24px] h-[54px] font-[NeoDunggeunmo] items-center not-italic font-normal text-[48px] text-black"
            aria-label="뒤로가기"
        >
            {`<`}
        </button>
    );
};

export default BackButton;
