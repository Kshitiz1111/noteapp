import { setAuth } from "../features/userAuth/SliceAuth";
import axios from "../api/axios";
import { useAppSelector, useAppDispatch } from "../app/hooks";

export const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const getAuth = useAppSelector((state) => state.userAuth);

  const refresh = async () => {
    const response = await axios.get("/api/v1/user/refreshtkn", {
      withCredentials: true,
    });
    console.log(`from useRef hook: ${JSON.stringify(getAuth)}`);
    console.log(response.data.accessToken);
    dispatch(
      setAuth({
        name: response.data.userName,
        accessToken: response.data.accessToken,
      })
    );
    return response.data.accessToken;
  };

  return refresh;
};
