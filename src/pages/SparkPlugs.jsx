import { useTranslation } from "react-i18next";

import "./about.css";

export default function SparkPlugs() {
  const { t } = useTranslation();

  return <div className="aboutContainer">
      <div dangerouslySetInnerHTML={{ __html: t('sparkPlugs.content') }} className="aboutText" />
      </div>;
}
