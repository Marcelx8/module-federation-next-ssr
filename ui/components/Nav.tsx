import React from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/login", label: "Login" },
  { href: "/ui", label: "UI" },
];

function Nav() {
  return (
    <nav>
      <ul>
        {links.map(({ href, label }) => (
          <Link key={`nav-link-${label}`} href={href}>
            <a>{label}</a>
          </Link>
        ))}
      </ul>

      <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
        max-width: 600px;
        margin: 0 auto;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: black;
        text-decoration: none;
        font-size: 13px;
        padding-right: 10px;
      }
    `}</style>
    </nav>
  )
}

export default Nav;