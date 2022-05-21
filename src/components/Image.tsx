import NextImage, { ImageProps, ImageLoader } from "next/image";

export type Props = Omit<ImageProps, "loader" | "unoptimized">;

const imageLoader: ImageLoader = ({ src }) => src;

export const Image: React.FunctionComponent<Props> = props => <NextImage loader={imageLoader} unoptimized {...props} />;
