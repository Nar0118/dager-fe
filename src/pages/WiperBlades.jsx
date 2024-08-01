import { useTranslation } from "react-i18next";

import "./about.css";

export default function WiperBlades() {
  const { t } = useTranslation();

  return (
    <div className="aboutContainer">
      <div
        className="aboutText"
        dangerouslySetInnerHTML={{ __html: t("wiperBlades.content") }}
      />
    </div>
  );
}
