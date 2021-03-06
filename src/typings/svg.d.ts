declare module "*.svg" {
  import type { SVGProps } from "react";

  const content: (props: SVGProps<SVGElement>) => JSX.Element;
  export default content;
}
