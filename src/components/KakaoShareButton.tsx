import React from "react";
import useKakaoInit from "../hooks/useKaKao";

const shareUrl = import.meta.env.VITE_KAKAO_SHARE_URL;

const KakaoShareButton: React.FC = () => {
  useKakaoInit();

  const handleShare = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendScrap({
        requestUrl: shareUrl,
      });
    } else {
      alert("카카오 SDK 로딩 중입니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <button onClick={handleShare} style={{ background: "none", border: "none", padding: 0 }}>
      <img
        src="../images/kakaoS.svg"
        alt="카카오톡 공유 보내기 버튼"
      />
    </button>
  );
};

export default KakaoShareButton;
