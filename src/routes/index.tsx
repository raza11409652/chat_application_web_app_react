import Spin from "antd/es/spin";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginContainer } from "../container/login";
import { RegisterContainer } from "../container/register";
import { DashboardContainer } from "../container/dashboard";
import { useAppSelector } from "../slice";
import useSocket from "../hooks/userSocket";

export const AppRoutes = () => {
  const auth = useAppSelector((a) => a.authReducer.auth);
  useSocket();

  return (
    <>
      <Suspense fallback={<Spin />}>
        <BrowserRouter>
          <Routes>
            {auth ? (
              <>
                <Route path="/">
                  <Route index element={<DashboardContainer />} />
                </Route>
              </>
            ) : (
              <>
                <Route path="/">
                  <Route index element={<LoginContainer />} />
                  <Route path="register" element={<RegisterContainer />} />
                </Route>
              </>
            )}
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};
