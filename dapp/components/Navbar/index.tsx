import { Stack } from "@mui/material";

import styles from "./Navbar.module.scss";
import Link from "next/link";

const navLinks = [
  {
    label: "Trending.",
    route: "",
  },
  {
    label: "Latest.",
    route: "",
  },
  {
    label: "Sign in.",
    route: "",
  },
];

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px="10%"
      className={styles.navbar}
    >
      <Stack direction="row" alignItems="center" gap="20px">
        <p>
          Settley<span>.</span>
        </p>
        <input
          type="text"
          name="search"
          placeholder="Search property, assets and collections"
        />
      </Stack>

      <Stack direction="row" gap="60px">
        {navLinks.map((link) => (
          <Link key={link.label} href={link.route}>
            {link.label}
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default Navbar;
