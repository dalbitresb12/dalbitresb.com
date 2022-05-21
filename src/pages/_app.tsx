import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../css/base.css";

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <div className="flex flex-col px-36 h-full bg-gray-900">
    <Header title="dalbitresb" />
    <Component {...pageProps} />
  </div>
);

export default MyApp;
