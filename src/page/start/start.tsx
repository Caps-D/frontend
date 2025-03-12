import CommonBtn from "../../components/commonBtn";
import { useEffect, useState, useRef } from "react";
import Header from "../../components/header";
import DefaultBody from "../../components/defaultBody";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  // 웹캠 비디오 참조
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const processedImageRef = useRef<HTMLImageElement | null>(null);
  const overlayWarningRef = useRef<HTMLDivElement | null>(null);
  const squatCounterRef = useRef<HTMLDivElement | null>(null);

  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const [squatCount, setSquatCount] = useState(0);
  const [connectionAttempts, setConnectionAttempts] = useState(0);  // 연결 시도 횟수 추적

  // 웹캠 스트림 가져오기
  useEffect(() => {
    const getWebcamStream = async () => {
      try {
        console.log("🔍 웹캠 요청 중...");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        console.log("웹캠 활성화 완료");
      } catch (err) {
        console.error("웹캠 오류:", err);
        alert("웹캠을 사용할 수 없습니다. 권한을 확인하세요.");
      }
    };

    getWebcamStream();

    // 컴포넌트 언마운트 시 웹캠 스트림을 종료
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // WebSocket 연결 및 메시지 처리
  useEffect(() => {
    const connectWebSocket = () => {
      // 연결 시도 횟수가 3번을 초과하면 연결 시도하지 않음
      if (connectionAttempts >= 3) {
        console.log("WebSocket 연결 시도 제한에 도달했습니다. 더 이상 연결을 시도하지 않습니다.");
        return;
      }

      const ws = new WebSocket("ws://35.216.59.23:5001/ws");
      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        console.log("WebSocket 연결 성공");
        sendFrames(ws);
      };

      ws.onmessage = (event) => {
        if (typeof event.data === "string") {
          // JSON 응답 처리 (경고 메시지 + 스쿼트 카운트)
          try {
            const response = JSON.parse(event.data);

            // 경고 메시지 처리
            if (overlayWarningRef.current) {
              overlayWarningRef.current.textContent = response.message;
              overlayWarningRef.current.style.display = response.message ? "block" : "none";
            }

            // 스쿼트 카운트 업데이트
            if (response.squat_count !== undefined) {
              setSquatCount(response.squat_count);
              if (squatCounterRef.current) {
                squatCounterRef.current.textContent = `스쿼트 횟수: ${response.squat_count}`;
              }
            }
          } catch (err) {
            console.error("WebSocket 메시지 처리 오류:", err);
          }
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket 오류:", error);
        setConnectionAttempts((prevAttempts) => prevAttempts + 1);  // 오류 발생 시 시도 횟수 증가
      };

      ws.onclose = () => {
        console.log("WebSocket 연결 종료");
        // 연결 실패 후 시도 횟수 증가
        setConnectionAttempts((prevAttempts) => prevAttempts + 1);
      };

      setWebSocket(ws);
    };

    connectWebSocket();

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, [websocket, connectionAttempts]); // connectionAttempts를 의존성으로 추가

  // 비디오 프레임 전송 함수
  const sendFrames = (ws: WebSocket) => {
    const sendImageData = () => {
      if (videoRef.current && ws.readyState === WebSocket.OPEN) {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              ws.send(blob);
            }
          });
        }
      }
      if (websocket?.readyState === WebSocket.OPEN) {
        requestAnimationFrame(sendImageData);
      }
    };

    sendImageData();
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <Header>
        <Header.Title>{`운동하기`}</Header.Title>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        {/* 운동 진행 상태 표시 */}
        <div className="flex w-[100%] justify-center font-['NeoDunggeunmo'] text-[48px] leading-[48px] text-[#000000]">
          {squatCount} / 30
        </div>
        <div className="mt-[15px] flex w-[100%] justify-center font-['NeoDunggeunmo'] text-[48px] leading-[48px] text-[#338C00]">
          good!
        </div>

        {/* 웹캠 비디오 화면 */}
        <div className="flex justify-center items-center mt-[20px] relative">
          <video
            ref={videoRef}
            autoPlay
            width="100%"
            height="auto"
            style={{ transform: "scaleX(-1)" }}
          />

          {/* AI 분석된 이미지 표시 */}
          <img
            ref={processedImageRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
            }}
          />

          {/* 경고 메시지 오버레이 */}
          <div
            ref={overlayWarningRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-red-600 bg-white bg-opacity-70 p-2 rounded-md"
            style={{ display: "none" }}
          ></div>
        </div>

       
      </DefaultBody>
    </div>
  );
}

export default Start;
