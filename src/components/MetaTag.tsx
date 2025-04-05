import { Helmet } from 'react-helmet-async';

type Props = { title?: string; image?: string; url?: string };

const MetaTag = ({ title = 'Shopshop', image, url }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta
        property='og:image'
        content={
          image ? image : 'https://shopshop-app.vercel.app/images/banner.jpg'
        }
      />
      <meta property='og:description' content='Shopshop 쇼핑몰' />
      {url && <meta property='og:url' content={url} />}
    </Helmet>
  );
};

export default MetaTag;
