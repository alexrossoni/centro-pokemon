import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle, { AppMainContainer } from "../styles/global";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <AppMainContainer>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AppMainContainer>
    </>
  );
}
