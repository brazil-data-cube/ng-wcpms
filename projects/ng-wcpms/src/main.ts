import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: { response: { status: number; }; }) => {
    if (error.response.status === 401) {
      console.log({ error });
    }
  }
);

export default instance;
