import React from "react";
import useKakaoInit from "../hooks/useKaKao";


interface KakaoShareButtonProps {
  imageUrl: string | null;
}

const shareUrl = import.meta.env.VITE_KAKAO_SHARE_URL;

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ imageUrl }) => {
  useKakaoInit();

  const handleShare = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      if (imageUrl) {
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: "운동 결과 공유",
            description: "내가 만든 운동 결과 이미지입니다.",
            imageUrl: imageUrl,
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
          buttons: [
            {
              title: "웹으로 이동",
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl,
              },
            },
          ],
        });
      } else {
        alert("공유할 이미지가 없습니다.");
      }
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
