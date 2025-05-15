import React from "react";
import KakaoShareButton from "./KakaoShareButton";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onShare: (platform: string) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, imageUrl, onShare }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#FF9D52] border-[#FF801E] border-2 rounded-xl p-6 w-[320px] relative flex flex-col items-center">
        <button className="absolute top-2 right-2 font-[NeoDunggeunmo]" onClick={onClose}>X</button>
        <div className="w-full flex flex-col items-center">
          <p className="font-bold text-lg mb-2 font-['NeoDunggeunmo']">미리보기</p>
          {imageUrl && (
            <img src={imageUrl} alt="미리보기" className="w-[260px] rounded-lg mb-4" />
          )}
        </div>
        <div className="flex justify-around w-full mt-2">
          <KakaoShareButton />
        </div>
        <button
          className="mt-4 text-sm text-gray-500 underline"
          onClick={() => {
            if (imageUrl) {
              const link = document.createElement("a");
              link.href = imageUrl;
              link.download = "운동결과.png";
              link.click();
            }
          }}
        >
          이미지 저장하기
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
