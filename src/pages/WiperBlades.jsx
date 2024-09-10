import { useTranslation } from "react-i18next";
import { Image } from "antd";

import "./about.css";

export default function WiperBlades() {
  const { t } = useTranslation();

  return (
    <>
      <div className="aboutContainer">
        <div
          className="aboutText"
          dangerouslySetInnerHTML={{ __html: t("wiperBlades.content") }}
        />
      </div>
      <div className="imagesGallery">
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <Image src="/images/products/image0007.JPG" />
          <Image src="/images/products/image0004.JPG" />
          <Image src="/images/products/image00031.JPG" />
        </Image.PreviewGroup>
      </div>
    </>
  );
}
