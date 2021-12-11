import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({results}) {
  return (
    <div>
      <Head>
        <title>Hulu</title>
        <link
          rel="icon"
          href="https://www.hulu.com/static/icons/apple-touch-icon.png"
        />
      </Head>
      {/* Header */}
      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genres;

  const fetchData = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: fetchData.results,
    },
  };
}
