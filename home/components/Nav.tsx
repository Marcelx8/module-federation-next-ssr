import React from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/login", label: "Login" },
  { href: "/ui", label: "UI" },
];

const Nav = () => {
  return (
    <nav>
      <ul>
        {links.map(({ href, label }) => (
          <Link key={`nav-link-${label}`} href={href}>
            <a>- {label} -</a>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default Nav;