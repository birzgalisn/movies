import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styles from "./SidebarLink.module.scss";

export default function SidebarLink({ href, text, icon, children, ...props }) {
  const router = useRouter();
  const linkStyle = useMemo(
    () => (router.asPath === href ? styles.active : styles.regular),
    [router, href]
  );

  return (
    <Link href={href} passHref {...props}>
      <a className={linkStyle}>
        <div>
          {icon && icon} {text}
        </div>
      </a>
    </Link>
  );
}
