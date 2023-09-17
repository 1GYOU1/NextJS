import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Link legacyBehavior href="/">
        <a className={router.pathname === "/" ? "active" : ""}>
        Home
        </a>
      </Link>
      <Link legacyBehavior href="/about-us">
        <a className={router.pathname === "/about-us" ? "active" : ""}>
        About
        </a>
      </Link>
      <style jsx>{`
        nav {
          background-color: tomato;
        }
        a {
          text-decoration: none;
        }
        .active {
          color: yellow;
        }
      `}</style>
    </nav>
  );
}