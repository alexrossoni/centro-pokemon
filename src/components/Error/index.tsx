import { Container } from "./styles";
import errorImage from "../../../public/images/error.png";
import Image from "next/image";
import { Button } from "../../components/Button/styles";
import { SubHeader } from "../../components/SubHeader";
import Head from "next/head";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { IError } from "../../interfaces/components";

export const Error = ({ error }: IError) => {
  useEffect(() => {
    if (error) {
      toast.error(
        "Ops! Encontramos um problema ao carregar dados da página. Parece que há um pequeno contratempo com nossos servidores. Tente novamente.",
        {
          toastId: "error-get-data",
          position: "top-right",
          theme: "dark",
        }
      );
    }
  }, [error]);

  return (
    <>
      <Head>
        <title>Centro Pokémon - Consultas</title>
      </Head>
      <Container>
        <SubHeader
          description="Recupere seus pokémons em 5 segundos."
          page="Agendar Consulta"
        />
        <div className="imageErrorContainer">
          <Image
            src={errorImage}
            alt="Imagem de erro ao acessar a página"
            className="imageError"
            sizes="(max-width: 720px) 100vw, 600px"
            priority
            fill
          />
        </div>
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          Tentar novamente
        </Button>
      </Container>
    </>
  );
};
