import Layout from "../../components/layout";
import axios from "axios";
import Fs from "fs";
import webp from "webp-converter";

export default ({ data: { content, featured_image_urls, title } }) => (
  <Layout>
    <div className="a-div">
      <img src={featured_image_urls.medium} alt="Imagen" className="a-img" loading="lazy"/>
    </div>
    <h1>{title.rendered}</h1>
    <div
      dangerouslySetInnerHTML={{ __html: content.rendered }}
      className="a-para"
    />
  </Layout>
);

export const getStaticPaths = async () => ({
  paths: await fortmatPaths(),
  fallback: false,
});

export const getStaticProps = async ({ params }) => {
  const x = await axios.get(
    `http://despertadorlavalle.com.ar/wp-json/wp/v2/posts/${params.id}`
  );
  const data = x.data;

  const imageUrl = data.featured_image_urls.medium;
  const pathUrl = imageUrl.substr(imageUrl.length - 15);
  const path = `public/${pathUrl}`;
  const path2 = path.replace(/jpg|png/, "webp");
  data.featured_image_urls.medium = "/" + pathUrl.replace(/jpg|png/, "webp");
  await downloadImage(imageUrl, path, path2);

  return { props: { data } };
};

const fortmatPaths = async () => {
  const x = await axios.get(
    "http://despertadorlavalle.com.ar/wp-json/wp/v2/posts"
  );
  const paths = x.data.map(({ id }) => ({ params: { id: `${id}` } }));
  return paths;
};

const downloadImage = async (id, path, path2) => {
  const writer = Fs.createWriteStream(path);
  const response = await axios({
    url: id,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(writer);

  webp.grant_permission();

  const convertAndDelete = async () => {
    await webp.cwebp(path, path2, "-q 80");
    Fs.unlinkSync(path);
  };

  writer.on("finish", convertAndDelete);
};
