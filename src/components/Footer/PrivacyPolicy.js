import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1>{t('privacy_policy_title')}</h1>
      <p>{t('effective_date')} {t('privacy_policy_date')}</p>
      <p>{t('privacy_policy_intro')}</p>
      <h2>{t('data_collection_title')}</h2>
      <p>{t('data_collection_description')}</p>
      <h2>{t('data_use_title')}</h2>
      <p>{t('data_use_description')}</p>
      <h2>{t('contact_label')}</h2>
      <p>{t('privacy_policy_contact')}</p>
    </div>
  );
};

export default PrivacyPolicy;