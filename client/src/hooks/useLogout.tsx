import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { emptyNoteAfterLogout } from "../features/SliceAddNote";
import { setAuth } from "../features/userAuth/SliceAuth";

export const useLogout = () => {
  const getAuth = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(
      setAuth({
        name: null,
        accessToken: null,
      })
    );
    dispatch(emptyNoteAfterLogout({}));

    try {
      const response = await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });
      if (response.status === 204) {
        dispatch(
          setAuth({
            name: null,
            accessToken: null,
          })
        );
        navigate("/login");
      } else {
        console.log("network error");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return handleLogout;
};
