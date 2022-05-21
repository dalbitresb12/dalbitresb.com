import Link from "next/link";
import { Navigation } from "./Navigation";

export interface Props {
  title: string;
}

export const Header: React.FunctionComponent<Props> = ({ title }) => (
  <header className="py-8 flex justify-between text-lg">
    <Link href="/" passHref>
      <a className="font-bold tracking-wide">{title}</a>
    </Link>
    <Navigation />
  </header>
);
