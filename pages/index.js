import axios from "axios";
import Link from "next/link";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout>
    {data.map(({ jetpack_featured_media_url, id, title, excerpt }) => (
      <article className="card" key={id}>
        <div>
          <img src={jetpack_featured_media_url}></img>
          <Link href={`/posts/${id}`}>
            <a>
              <h1>{title.rendered}</h1>
            </a>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
        </div>
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
