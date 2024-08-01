import { useTranslation } from "react-i18next";

import "./about.css";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="aboutContainer">
      <h1>{t("About")}</h1>
      <div dangerouslySetInnerHTML={{ __html: t('aboutUs') }} className="aboutText" />
    </div>
  );
}
