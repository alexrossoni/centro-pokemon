import { IMainButtonHeader } from "../../interfaces/components";
import { MainButtonContainer } from "./styles";
import Image from "next/image";

export const MainButtonHeader = ({
  $expanded,
  sourceImage,
  altImage,
  btnText
}: IMainButtonHeader) => {
  return (
    <MainButtonContainer $expanded={$expanded}>
      <div className="icon">
        <Image src={sourceImage} alt={altImage} width={35} />
      </div>
      <span>{btnText}</span>
    </MainButtonContainer>
  );
};
