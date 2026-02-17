import { fontUrls } from "../styles/theme";

export const FontLoader: React.FC = () => (
  <>
    {fontUrls.map((url) => (
      <link key={url} rel="stylesheet" href={url} />
    ))}
  </>
);
