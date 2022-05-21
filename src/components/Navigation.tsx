import Link from "next/link";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

export interface Props {
  className?: string;
}

export const Navigation: React.FunctionComponent<Props> = ({ className }) => (
  <nav className={className}>
    <ul className="flex space-x-4">
      {navigation.map(item => (
        <li key={item.href}>
          <Link href={item.href} passHref>
            <a className="font-light transition-colors hover:text-white">{item.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
