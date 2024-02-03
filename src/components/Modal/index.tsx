import { Container, ContentContainer } from "./styles";
import { IModal } from "../../interfaces/components";
import { Button } from "../Button/styles";
import checkIcon from "../../../public/check.svg";
import warnIcon from "../../../public/warning.svg";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import Router from "next/router";

export const Modal = ({
  title,
  description,
  status,
  $isOpen,
  onClose,
}: IModal) => {
  return (
    <Container $isOpen={$isOpen}>
      <ContentContainer>
        <FaHome
          className="btn-home-modal"
          onClick={() => {
            Router.push("/");
          }}
        />
        <h1>{title}</h1>
        {status == "success" ? (
          <Image
            className="icon"
            src={checkIcon}
            alt="Ícone representando sucesso"
          />
        ) : (
          <Image
            className="icon"
            src={warnIcon}
            alt="Ícone representando erro"
          />
        )}
        <p className="description">{description}</p>
        <Button
          onClick={() => {
            Router.push("/consulta");
          }}
        >
          Fazer Novo Agendamento
        </Button>
      </ContentContainer>
    </Container>
  );
};
