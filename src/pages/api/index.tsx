import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";

import Link from "next/link";

import Navbar from "../../Components/MainAPIComponents/APINavbar";
import AboutBody from "../../Components/MainAPIComponents/APIAboutBody";

import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "from tRPC" },
  ]);

  return (
    <>
      <div className={styles.MainBody}>
        <Navbar />
        <AboutBody />
        <div className={styles.DocumentationHeader}>
          <Link href="/documentation">
              <h1 className={styles.headerFont}> How to Use </h1>
          </Link>
        </div>
      </div>
    </>
  );
};



export default Home;
