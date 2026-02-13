const SITE_NAME = 'Cursor Tutorial';
const SITE_URL = 'https://cursor-tutorial.wjstar.top';

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
}

export function PageSEO({ title, description, path = '' }: PageSEOProps) {
  const fullTitle = `${title} - ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
