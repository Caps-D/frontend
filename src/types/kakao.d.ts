interface KakaoStatic {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendScrap: (options: { requestUrl: string }) => void;
    sendDefault: (options: any) => void;
    uploadImage: (options: { file: FileList }) => Promise<any>; // 이 부분 추가!
  };
}

interface Window {
  Kakao: KakaoStatic;
}
