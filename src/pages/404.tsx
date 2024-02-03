import { Container, ImageContainer } from "../styles/404-styles";
import Image from "next/image";
import pokeballIcon from "../../public/images/red-pokeball.svg";
import { useRouter } from "next/router";
import Head from "next/head";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Centro Pokémon - Página não encontrada</title>
      </Head>
      <Container>
        <h1>Página não encontrada!</h1>
        <ImageContainer>
          <span className="questionIcon">?</span>
          <Image
            src={pokeballIcon}
            alt="Ícone de uma pokébola"
            width={150}
            onClick={() => {
              router.push("/");
            }}
          />
        </ImageContainer>
      </Container>
    </>
  );
}
