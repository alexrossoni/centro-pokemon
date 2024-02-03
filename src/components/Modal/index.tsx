import { Container, ContentContainer } from "./styles";
import { IModal } from "../../interfaces/components";
import { Button } from "../Button/styles";
import checkIcon from "../../../public/check.svg";
import warnIcon from "../../../public/warning.svg";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const Modal = ({
  title,
  description,
  type,
  $isOpen,
  onClose,
}: IModal) => {
  const modalRef = useRef(null);

  // Lógica para fechar o modal ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        modalRef.current &&
        !(modalRef.current as any).contains(event.target)
      ) {
        onClose();
      }
    };

    if ($isOpen) {
      // Adicionando um event listener quando o modal está aberto
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Removendo o event listener ao fechar o modal
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [$isOpen, onClose]);

  return (
    <Container $isOpen={$isOpen}>
      <ContentContainer ref={modalRef}>
        <span className="btn-close-modal" onClick={onClose}>
          X
        </span>
        <h1>{title}</h1>
        {type == "success" ? (
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
        <Button onClick={onClose}>Fazer Novo Agendamento</Button>
      </ContentContainer>
    </Container>
  );
};
