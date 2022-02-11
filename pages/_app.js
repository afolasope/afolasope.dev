import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Layout from "../components/Layout";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Afeez Lawal - Frontend Developer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Afeez Lawal - Frontend Developer</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="description"
          content="I build amazing stuff on the web by converting ideas from pixels to pixel perfect, scalable web applications"
        />
        <meta
          name="image"
          content="https://firebasestorage.googleapis.com/v0/b/afeezgl.appspot.com/o/gbolahan.jpg?alt=media&token=4a3b58c8-8ba7-4b70-a2d4-e8bc8c7cdc54"
        />
        <meta itemProp="name" content="Afeez Lawal - Frontend Developer" />
        <meta
          itemProp="description"
          content="I build amazing stuff on the web by converting ideas from pixels to pixel perfect, scalable web applications"
        />
        <meta
          itemProp="image"
          content="https://firebasestorage.googleapis.com/v0/b/afeezgl.appspot.com/o/gbolahan.jpg?alt=media&token=4a3b58c8-8ba7-4b70-a2d4-e8bc8c7cdc54"
        />
        <meta name="og:title" content="Afeez Lawal - Frontend Developer" />
        <meta
          name="og:description"
          content="I build amazing stuff on the web by converting ideas from pixels to pixel perfect, scalable web applications"
        />
        <meta name="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
