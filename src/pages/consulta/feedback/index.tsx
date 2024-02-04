import { Container } from "../../../styles/feedback-styles";
import { Modal } from "../../../components/Modal";
import { IModal } from "../../../interfaces/components";
import Head from "next/head";
import { SubHeader } from "../../../components/SubHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import waveImage from "../../../../public/images/wave.svg";
import Image from "next/image";

function Feedback() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<IModal>({
    title: "",
    description: "",
    status: "success",
  });
  const router = useRouter();
  const { status, title, description, id } = router.query as {
    status: "success" | "error";
    title: string;
    description: string;
    id: string;
  };

  useEffect(() => {
    if (
      ((status === "success" && id) || status === "error") &&
      title &&
      description
    ) {
      setModalOpen(true);
      setModalProps({
        title: title,
        description: description,
        status: status,
      });
    } else {
      router.push("/");
    }
  }, [status, title, description, id, router]);

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

        <Image
          src={waveImage}
          alt="Imagem de animação estilo ondas"
          style={{ width: "100%", height: "auto" }}
        />

        <Modal
          title={modalProps.title}
          description={modalProps.description}
          status={modalProps.status}
          $isOpen={isModalOpen}
        />
      </Container>
    </>
  );
}

export default Feedback;
