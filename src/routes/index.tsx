import Spin from "antd/es/spin";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginContainer } from "../container/login";
import { RegisterContainer } from "../container/register";
import { DashboardContainer } from "../container/dashboard";

export const AppRoutes = () => {
  const auth = true;
  return (
    <>
      <Suspense
        fallback={
          <div className="row-flex-col">
            <Spin />
          </div>
        }
      >
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
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};
