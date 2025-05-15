// src/hooks/useKakao.ts
import { useEffect } from "react";

export default function useKakaoInit() {
  useEffect(() => {
    // Kakao SDK가 이미 로드되어 있으면 무시
    if (window.Kakao && window.Kakao.isInitialized?.()) return;

    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
}
