import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'JobLeap - Find Your Dream Job',
  description = 'JobLeap helps you find and apply to jobs worldwide. Search thousands of job listings, optimize your resume with AI, and track your applications.',
  keywords = 'jobs, job search, career, employment, hiring, resume builder, ATS optimizer, job applications',
  image = 'https://www.jobleap.work/og-image.png',
  url = 'https://www.jobleap.work',
  type = 'website',
}) => {
  const siteTitle = title === 'JobLeap - Find Your Dream Job' ? title : `${title} | JobLeap`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="JobLeap" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="JobLeap" />
    </Helmet>
  );
};

export default SEO;
