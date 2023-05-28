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
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent="space-between"
      px={{ xs: "5%", md: "10%" }}
      className={styles.navbar}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap="20px"
        width={{ xs: "100%", sm: "60%" }}
      >
        <p>
          Settley<span>.</span>
        </p>
        <input
          type="text"
          name="search"
          placeholder="Search property, assets and collections"
        />
      </Stack>

      <Stack
        direction="row"
        gap={{ xs: "0px", sm: "30px", md: "60px" }}
        justifyContent="space-between"
        width={{ xs: "100%", sm: "auto" }}
      >
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
