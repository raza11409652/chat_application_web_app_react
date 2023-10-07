import { ConfigProvider, theme } from "antd";
import { AppRoutes } from "./routes";
function ChatApplication() {
  const isDarkMode = false;
  // const isDarkMode = window && window.matchMedia("(prefers-color-scheme:dark)").matches
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#004385",
          colorWarning: "#FAAD14",
          colorInfo: "#1e91d6",
          borderRadius: 4,
          fontFamily: `"Montserrat", sans-serif`,
        },
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  );
}

export default ChatApplication;
