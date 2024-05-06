declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "!!wordlist-loader!*" {
  const wordListItem: {name, desc}
  const contents: wordListItem[]
  export default contents
}