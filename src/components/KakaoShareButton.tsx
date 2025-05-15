import React from "react";
import useKakaoInit from "../hooks/useKaKao";

interface KakaoShareButtonProps {
  imageUrl: string | null;
}

const shareUrl = import.meta.env.VITE_KAKAO_SHARE_URL;

// base64 Data URL을 File 객체로 변환하는 함수
function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ imageUrl }) => {
  useKakaoInit();

  const handleShare = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      if (imageUrl) {
        // 1. base64 imageUrl을 File로 변환
        const file = dataURLtoFile(imageUrl, "result.png");

        // 2. FileList로 변환 (uploadImage는 FileList 필요)
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // 3. Kakao 서버에 이미지 업로드
        window.Kakao.Share.uploadImage({
          file: dataTransfer.files,
        })
          .then((response: any) => {
            const uploadedImageUrl = response.infos.original.url;
            // 4. 업로드된 이미지 URL로 공유
            window.Kakao.Share.sendDefault({
              objectType: "feed",
              content: {
                title: "운동 결과 공유",
                description: "내가 만든 운동 결과 이미지입니다.",
                imageUrl: uploadedImageUrl,
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
          })
          .catch((error: any) => {
            alert("이미지 업로드에 실패했습니다.");
            console.error(error);
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
