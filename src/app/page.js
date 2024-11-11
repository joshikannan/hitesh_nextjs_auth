import Image from "next/image";
import styles from "./page.module.css";
import { Stack } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <Stack spacing={2}>
        <h1>Welcome to home page</h1>
        <Link href={"/signup"}> Signup</Link>
        <Link href={"/login"}> Login</Link>
      </Stack>
    </div>
  );
}
