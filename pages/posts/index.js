import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";

export default () => (
  <Layout>
    <div>
      <h1>
        <Link href="/">
          <a>Hola Post</a>
        </Link>
      </h1>
      <Head>
        <title>Hola mundo</title>
      </Head>
    </div>
  </Layout>
);
