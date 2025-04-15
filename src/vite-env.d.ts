/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" /> 

// src/window.d.ts
declare global {
    interface Window {
      Kakao: any;
    }
  }
  export {};
  