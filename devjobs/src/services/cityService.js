import { get } from "../utils/request";
import { getCookie } from "../helpers/cookie";

export const getListCity = async () => {
  const result = await get(`city`);
  return result;
};
