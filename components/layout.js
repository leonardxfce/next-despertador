import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Despertador Lavalle</title>
        <link
          rel="icon"
          href="https://despertadorlavalle.com.ar/wp-content/uploads/2018/08/cropped-android-icon-192x192-32x32.png"
        />
      </Head>
      <main className={styles.main2}>
        <Link href="/">
          <a>
            <img src="https://despertadorlavalle.com.ar/wp-content/themes/miracleone64/img/bannernuevo.png" />
          </a>
        </Link>
      </main>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Layout;
