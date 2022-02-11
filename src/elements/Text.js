import styled from 'styled-components';
import React from "react";
const Image = (props) => {
  const { shape, src, size } = props;
  
  const styles = {
    src: src,
    size: size,
  }
//   if (shape === "circle") {
//     return (
//       <ImageCircle {...styles}></ImageCircle>
//     )
//   }
  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    )
  }
  if (shape === "layout1") {
    return (
      <Outter1>
        <AspectInner {...styles}></AspectInner>
      </Outter1>
    )
  }
  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  )
}
Image.defaultProps = {
  shape: "circle",
  src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAA1BMVEVLidy+keIGAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABODcYhAAEl463hAAAAAElFTkSuQmCC",
  size: 36,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const Outter1 = styled.div`
width: 100%;
flex-basis: 50%;
min-width: 250px;
`;