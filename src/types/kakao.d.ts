interface KakaoStatic {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendScrap: (options: { requestUrl: string }) => void;
    sendDefault: (options: any) => void; // sendDefault 메서드 추가
  };
}

interface Window {
  Kakao: KakaoStatic;
}
