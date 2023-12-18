import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRefreshToken } from "../hooks/useRefresh";
import { setAuth } from "../features/userAuth/SliceAuth";
// import { setTrust } from "../features/SliceTrustThisDevice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CircularProgress from "@mui/material/CircularProgress";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const getAuth = useAppSelector((state) => state.userAuth);
  //   const persist = useAppSelector((state) => state.deviceTrusted);
  //   const persist = true;
  //   console.log(
  //     ` persist trustInd: ${persist.trustIndicator}, isLoading: ${isLoading}`
  //   );
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !getAuth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(getAuth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen ">
          <CircularProgress disableShrink />
          <span>loading</span>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
