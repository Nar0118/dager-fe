import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "antd";

import "./about.css";

export default function About() {
  const { t } = useTranslation();

  const images = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => (
      <Image key={i + 1} src={`/images/products/image000${i + 1}.JPG`} />
    ));
  }, []);

  return (
    <>
      <div className="aboutContainer">
        <h1>{t("About")}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: t("aboutUs") }}
          className="aboutText"
        />
      </div>
      <div className="imagesGallery">
        <Image.PreviewGroup>{images}</Image.PreviewGroup>
      </div>
    </>
  );
}
