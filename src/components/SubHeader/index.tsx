import { FaChevronRight } from "react-icons/fa";
import { SubHeaderContainer } from "./styles";
import { ISubHeader } from "../../interfaces/components";

export const SubHeader = ({ page, description }: ISubHeader) => {
  return (
    <>
      <SubHeaderContainer>
        <div>
          <p>Home</p>
            <FaChevronRight size={12}/>
          <p>{page}</p>
        </div>
        <h2>{page}</h2>
        <p>{description}</p>
      </SubHeaderContainer>
    </>
  );
};
