import Axios from "axios";
import { env } from "@/env";

const axios = Axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export default axios;
