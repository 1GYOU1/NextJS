import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Link href="/" className={`${styles.link} ${
            router.pathname === "/" ? styles.active : ""
          }`}>
        Home
      </Link>
      <Link href="/about-us" className={[
            styles.link,
            router.pathname === "/about-us" ? styles.active : "",
          ].join(" ")}>
        About
      </Link>
    </nav>
  );
}