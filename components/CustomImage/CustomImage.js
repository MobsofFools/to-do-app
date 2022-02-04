// components/Image.js
import Image from "next/image";

// opt-out of image optimization, no-op
const customLoader = ({ src }) => {
  return src
}

export default function CustomImage(props) {
  return (
    <Image
      {...props}
      loader={customLoader}
      alt={"alt"}
    />
  );
}