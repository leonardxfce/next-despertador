import Layout from "../../components/layout";
import axios from "axios";
import Fs from "fs";
import webp from "webp-converter";

export default ({ data: { content, featured_image_urls, title } }) => (
  <Layout>
    <div className="a-div">
      <img src={featured_image_urls.medium} alt="Imagen" className="a-img" />
    </div>
    <h1>{title.rendered}</h1>
    <div
      dangerouslySetInnerHTML={{ __html: content.rendered }}
      className="a-para"
    />
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

  const imageUrl = data.featured_image_urls.medium;
  const pathUrl = imageUrl.substr(imageUrl.length - 50);
  const path = `public/${pathUrl}`;
  const path2 = path.replace("jpg", "webp");
  data.featured_image_urls.medium = "/" + pathUrl.replace("jpg", "webp");
  await downloadImage(imageUrl, path, path2);

  return { props: { data } };
};

async function downloadImage(id, path, path2) {
  const writer = Fs.createWriteStream(path);
  const response = await axios({
    url: id,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(writer);
  webp.grant_permission();
  const result = webp.cwebp(path, path2, "-q 80");
  result.then((res) => console.log(res));

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}
