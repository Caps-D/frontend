// src/types/kakao.d.ts
interface KakaoStatic {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendScrap: (options: { requestUrl: string }) => void;
    // 필요 시 sendDefault, sendCustom 등 추가 선언
  };
}

interface Window {
  Kakao: KakaoStatic;
}
