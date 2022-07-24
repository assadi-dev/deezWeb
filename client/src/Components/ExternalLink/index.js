import styled from "styled-components";

const Container = styled.a`
  width: fit-content;
`;

/**
 *Ouvre un nouvel onglet avec les proprietés "noopener noreferrer"
 *Balise <a></a> qui contients les proprieté "noopener noreferrer nofollow" de l'attribut rel
 */
const ExternalLink = ({ children, ...props }) => {
  return (
    <Container {...props} target="_blank" rel="noopener noreferrer nofollow">
      {children}
    </Container>
  );
};

export default ExternalLink;
