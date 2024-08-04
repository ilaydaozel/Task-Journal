import Link from "next/link";

const NavLink = ({ href, title }:{ href: string, title: string }) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 font-semibold text-text1-800 sm:text-lg rounded md:p-0 hover:scale-105"
    >
      {title}
    </Link>
  );
};

export default NavLink;