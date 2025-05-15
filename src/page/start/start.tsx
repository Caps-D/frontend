import { useState, useEffect, useRef } from 'react';
import DefaultBody from '../../components/defaultBody';
import Header from '../../components/header';
import { useMode } from "../../context/ExerciseContext"; // Context Hook import
import { useNavigate } from 'react-router-dom'; // useNavigate import
import { PostResult } from '../../api/start/postResult';

const Start = () => {
  const [isStreaming, setIsStreaming] = useState(true);

  const [squatCount, setSquatCount] = useState(0);
  const [targetCheck, setTargetCheck] = useState(0);  // targetCheck 상태 추가
  const [status, setStatus] = useState<string>('failure');
  const videoRef = useRef<HTMLVideoElement>(null);
  const processedImageRef = useRef<HTMLImageElement>(null);
  const overlayWarningRef = useRef<HTMLDivElement>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const isWebSocketConnected = useRef<boolean>(false);  // 웹소켓 연결 상태 추적
  const { state } = useMode();
  const navigate = useNavigate(); // useNavigate 훅 사용


  // 운동 종류에 따라 서버 주소를 반환
  const getWebSocketUrl = () => {
    if (state.exerciseType === '스쿼트') {
      return 'ws://43.200.67.149:5001/ws';
    } else if (state.exerciseType === '팔굽혀펴기') {
      return 'ws://43.200.67.149:5002/ws';
    } else if (state.exerciseType === '플랭크') {
      return 'ws://43.200.67.149:5003/ws';
    } else {
      // 기본값 혹은 에러 처리
      return 'ws://43.200.67.149:5001/ws';
    }
  };



  useEffect(() => {
    // 페이지가 로드되면 자동으로 운동 시작
    const timer = setTimeout(() => {
      startWebcam();
      connectWebSocket(); // WebSocket 연결
      setIsStreaming(true); // 스트리밍 시작
    }, 1000); // 1초 후에 실행
  
    return () => {
      // 페이지를 떠날 때 운동 종료 처리
      setIsStreaming(false);
      websocketRef.current?.close();
      isWebSocketConnected.current = false; // WebSocket 연결 상태 초기화
  
      clearTimeout(timer); // 컴포넌트가 unmount될 때 타이머 클리어
    };
  }, []);

  useEffect(() => {
  // 목표 세트가 달성되면 handlePostResult 실행
  if (squatCount >= state.exerciseCount * state.exerciseSet) {
    (async () => {
      try {
        const response = await PostResult(state.mode, state.exerciseType, state.exerciseCount * state.exerciseSet);
        console.log(`회원가입 결과: ${response}`);
        const code = response.status;
        // 결과에 따라 /main으로 이동
        navigate('/main');
      } catch (error) {
        console.error("회원가입 실패", error);
        alert(error);
      } finally {
        websocketRef.current?.close();
      }
    })();
  }
}, [squatCount, state.exerciseCount, state.exerciseSet, state.mode, state.exerciseType, navigate]);
  const startWebcam = async () => {
    try {
      console.log('🔍 웹캠 요청 중...');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      console.log('웹캠 활성화 완료');
    } catch (error) {
      console.error('웹캠 오류:', error);
      alert('웹캠을 사용할 수 없습니다. 권한을 확인하세요.');
    }
  };



  const connectWebSocket = () => {
    if (isWebSocketConnected.current) {
      console.log('이미 웹소켓 연결이 되어 있습니다. 재연결하지 않습니다.');
      return; // 이미 연결된 경우 연결 시도하지 않음
    }

    console.log('WebSocket 연결 시도...');
    const wsUrl = getWebSocketUrl();
    const websocket = new WebSocket(wsUrl);
    websocket.binaryType = 'arraybuffer';

    websocket.onopen = () => {
      console.log('WebSocket 연결 성공');
      isWebSocketConnected.current = true;  // 연결 성공 시 상태 업데이트
      sendFrames(websocket);
    };

    websocket.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const response = JSON.parse(event.data);
          console.log(response);

          if (overlayWarningRef.current) {
            overlayWarningRef.current.textContent = response.message;
            overlayWarningRef.current.style.display = response.message ? 'block' : 'none';
          }

          // squatCount 업데이트
      if (response.squat_count !== undefined) {
        let newSquatCount = response.squat_count;
        let newTargetCheck = targetCheck;

        // 목표 세트 체크 로직
        while (newSquatCount >= state.exerciseCount && newTargetCheck < state.exerciseSet) {
          newSquatCount -= state.exerciseCount;
          newTargetCheck += 1;
        }

        setSquatCount(newSquatCount);
        setTargetCheck(newTargetCheck);

        // 목표 세트 달성 시 /result로 이동
        if (newTargetCheck >= state.exerciseSet) {
          navigate('/result');
        }

        setStatus(response.status === 'success' ? 'success' : 'failure');
      }
        } catch (error) {
          console.error('JSON 파싱 오류:', error);
        }
      } else {
        const blob = new Blob([event.data], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        if (processedImageRef.current) {
          processedImageRef.current.src = url;
        }
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
      alert('AI 서버 연결에 실패했습니다.');
    };

    websocket.onclose = () => {
      console.log('WebSocket 연결 종료');
      isWebSocketConnected.current = false;  // 연결 종료 시 상태 업데이트
      if (isStreaming) {
        setTimeout(connectWebSocket, 3000); // 재연결 시도
      }
    };

    websocketRef.current = websocket;
  };

  const generateCheckMarks = (targetSet: number, targetCheck: number) => {
    let result = '';
    for (let i = 0; i < targetSet; i++) {
      if (i < targetCheck) {
        result += `<span class="text-[#FF801E] ">v</span> `; // 완료된 체크 
      } else {
        result += `<span class="text-black ">o</span> `; // 미완료된 체크 
      }
    }
    return result.trim();
  };

  const checkMarks = generateCheckMarks(state.exerciseSet, targetCheck);  // targetCheck 값 반영

  const sendFrames = (websocket: WebSocket) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const captureFrame = () => {
      if (!isStreaming) {
        console.log('Streaming is stopped. Exiting captureFrame.');
        return;
      }

      if (!websocket || websocket.readyState !== WebSocket.OPEN) {
        console.log('WebSocket is not open. Waiting for connection...');
        return;
      }

      if (videoRef.current) {
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Debugging log before sending the frame
        console.log('Capturing frame...');
        
        canvas.toBlob((blob) => {
          if (blob) {
            console.log('Sending frame...');
            websocket.send(blob);
          } else {
            console.log('Blob creation failed');
          }
        }, 'image/jpeg');
      } else {
        console.log('No video element found');
      }

      setTimeout(captureFrame, 33); // Capture next frame after 33ms
    };

    captureFrame(); // Start capturing frames
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <Header>
        <Header.Title>{`운동하기`}</Header.Title>
        <Header.BackButton />
      </Header>
      <DefaultBody hasHeader={1}>
        <div
          id='check'
          className="flex justify-center w-[100%] font-['NeoDunggeunmo'] font-normal text-[50px] leading-[34px] tracking-[3px] mb-[15px]"
          dangerouslySetInnerHTML={{ __html: checkMarks }}
        ></div>

        <div className="flex w-[100%] justify-center font-['NeoDunggeunmo'] text-[45px] leading-[48px] text-[#000000]">
          {squatCount} / {state.exerciseCount}
        </div>

        <div className="mt-[15px] flex w-[100%] justify-center font-['NeoDunggeunmo'] text-[48px] leading-[48px] text-[#338C00] mb-[30px]">
          {status}
        </div>

        <div className="relative inline-block">
          {/* 원본 웹캠 영상 */}
          <video ref={videoRef} className="w-[640px] h-[480px]  mb-2 [transform:rotateY(180deg)]" autoPlay    />
          
          {/* AI 분석된 영상 표시 */}
          <img
            ref={processedImageRef}
            className="absolute top-0 left-0 w-[640px] h-[480px]"
          />

          {/* 경고 메시지 오버레이 */}
          <div
            ref={overlayWarningRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-red-600 bg-white bg-opacity-80 px-4 py-2 rounded-md hidden"
          ></div>
        </div>
      </DefaultBody>
    </div>
  );
};

export default Start;
