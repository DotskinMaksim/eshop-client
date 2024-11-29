import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1>{t('terms_of_service_title')}</h1>
      <p>{t('effective_date')} {t('terms_of_service_date')}</p>
      <p>{t('terms_of_service_intro')}</p>
      <h2>{t('use_of_services_title')}</h2>
      <p>{t('use_of_services_description')}</p>
      <h2>{t('payments_title')}</h2>
      <p>{t('payments_description')}</p>
      <h2>{t('contact_label')}</h2>
      <p>{t('terms_of_service_contact')}</p>
    </div>
  );
};

export default TermsOfService;