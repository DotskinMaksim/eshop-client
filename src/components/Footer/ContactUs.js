import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1>{t('contact_us_title')}</h1>
      <p>{t('contact_us_intro')}</p>
      <h2>{t('email_label')}</h2>
      <p>support@dotshop.com</p>
      <h2>{t('phone_label')}</h2>
      <p>+1 (800) 123-4567</p>
      <h2>{t('address_label')}</h2>
      <p>
        {t('address_line1')}<br />
        {t('address_line2')}<br />
        {t('address_line3')}
      </p>
    </div>
  );
};

export default ContactUs;