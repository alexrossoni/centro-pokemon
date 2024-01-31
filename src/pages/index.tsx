import { Container } from "../styles/home-styles";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Centro Pokémon - Home</title>
      </Head>
      <Container $source={"/images/pokemon-hero.jpg"}>
        <h1>
          Cuidamos bem do seu pokémon,
          <br />
          para ele cuidar bem de você
        </h1>
      </Container>
    </>
  );
};
export default Home;
