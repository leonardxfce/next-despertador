import Layout from "../../components/layout";
import axios from "axios";

export default ({ data: { content, featured_image_urls, title } }) => (
  <Layout>
    <div className="a-div">
      <img src={featured_image_urls.medium} alt="Imagen" className="a-img" />
    </div>
    <h1>{title.rendered}</h1>
    <div dangerouslySetInnerHTML={{ __html: content.rendered }} className="a-para"/>
  </Layout>
);

export const getStaticPaths = async () => {
  const x = await axios.get(
    "http://despertadorlavalle.com.ar/wp-json/wp/v2/posts"
  );
  const paths = x.data.map(({ id }) => ({ params: { id: `${id}` } }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const x = await axios.get(
    `http://despertadorlavalle.com.ar/wp-json/wp/v2/posts/${params.id}`
  );
  const data = x.data;
  return { props: { data } };
};
