import { HeaderStyle } from "./styles";
import logo from "../../../public/images/white-pokeball.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MainButtonHeader } from "../MainButtonHeader";

export const Header = () => {
  const [expanded, setExpanded] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setExpanded(false);
    }, 5000);
  }, [expanded]);
  
  return (
    <HeaderStyle>
      <Link href="/">
        <MainButtonHeader $expanded={expanded} sourceImage={logo} altImage="Imagem de uma pokébola" btnText="Centro Pokémon" />
      </Link>
      <nav>
        <Link href="/sobre">Quem somos</Link>
        <Link href="/consulta">Agendar consulta</Link>
      </nav>
    </HeaderStyle>
  );
};
