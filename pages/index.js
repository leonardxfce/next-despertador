import axios from "axios";
import Link from "next/link";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout>
    {data.map(({ id, title, excerpt }) => (
      <article className="card" key={id}>
        <Link href={`/posts/${id}`}>
          <a>
            <h3>{title.rendered}</h3>
          </a>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
      </article>
    ))}
  </Layout>
);

export const getStaticProps = async () => {
  const x = await axios.get(
    "http://despertadorlavalle.com.ar/wp-json/wp/v2/posts"
  );
  const data = x.data;
  return { props: { data } };
};
