import axios, { AxiosResponse } from "axios";

const apiUrl = 'https://h4capston.site/api';

export const PostWear = async (outerId: number, bottomId: number): Promise<void> => {
  axios.defaults.withCredentials = true;

  try {
    // 상의, 하의를 한 번에 보내도록 수정
    const response: AxiosResponse<any> = await axios.post(
      `${apiUrl}/wear`,
      { 
        outerId, // 상의 아이템 ID (없으면 0)
        bottomId // 하의 아이템 ID (없으면 0)
      },
      { withCredentials: true }
    );
    console.log("착용 결과:", response.data);

  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      console.error("Error response:", status, data);
      // 인증 오류 등 별도 처리 가능
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};
