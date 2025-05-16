import axios, { AxiosResponse } from "axios";

const apiUrl = 'https://h4capston.site/api';

export const PostWear = async (outer: string | null, bottom: string | null): Promise<void> => {
  axios.defaults.withCredentials = true;

  try {
    if (top) {
      const responseTop: AxiosResponse<any> = await axios.post(
        `${apiUrl}/wear`,
        { itemId: outer, itemType: "outer" },
        { withCredentials: true }
      );
      console.log("상의 착용 결과:", responseTop.data);
    }

    if (bottom) {
      const responseBottom: AxiosResponse<any> = await axios.post(
        `${apiUrl}/wear`,
        { itemId: bottom, itemType: "bottom" },
        { withCredentials: true }
      );
      console.log("하의 착용 결과:", responseBottom.data);
    }

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
