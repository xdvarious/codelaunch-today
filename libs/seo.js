import config from "@/config";

// Comprehensive SEO tags available for your pages.
// Pre-populates with default title/description/OG metadata, customizable per page.
// Already integrated into the root layout.js, eliminating the need to add to individual pages
// However, setting a canonical URL for each page is recommended (export const metadata = getSEOTags({canonicalUrlRelative: "/"});)
// Reference: https://docs.codelaunch.today/features/seo
export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
} = {}) => {
  return {
    // Maximum 50 characters (describe your app's value to users) > primary focus should be placed here
    title: title || config.appName,
    // Maximum 160 characters (explain how your app benefits users)
    description: description || config.appDescription,
    // Comma-separated keywords. Defaults to your app name
    keywords: keywords || [config.appName],
    applicationName: config.appName,
    // Establishes a base URL prefix for fields requiring fully qualified URLs (e.g., og:image: 'https://yourdomain.com/share.png' => '/share.png')
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : `https://${config.domainName}/`
    ),

    openGraph: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      url: openGraph?.url || `https://${config.domainName}/`,
      siteName: openGraph?.title || config.appName,
      // Adding an opengraph-image.(jpg|jpeg|png|gif) file to the /app folder makes the code below unnecessary
      // images: [
      //   {
      //     url: `https://${config.domainName}/share.png`,
      //     width: 1200,
      //     height: 660,
      //   },
      // ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      // Including a twitter-image.(jpg|jpeg|png|gif) file in the /app folder eliminates the need for the code below
      // images: [openGraph?.image || defaults.og.image],
      card: "summary_large_image",
      creator: "@marc_louvion",
    },

    // When a canonical URL is provided, it will be included. The metadataBase converts relative URLs to fully qualified URLs
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),

    // Additional tags can be passed through here if desired
    ...extraTags,
  };
};

// Structured Data for Google Rich Results. Additional information: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
// Locate your content type here (SoftwareApp, Book, etc.): https://developers.google.com/search/docs/appearance/structured-data/search-gallery
// Validate your structured data with this tool: https://search.google.com/test/rich-results
// While this component is optional, it enhances your likelihood of obtaining rich snippets on Google.
// For software applications, the configuration below is recommended for /page.js: It informs Google that your AppName is a Software application with a 4.8/5 rating based on 12 reviews.
// Populate the fields with your specific information
// Reference: https://docs.codelaunch.today/features/seo
export const renderSchemaTags = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "SoftwareApplication",
          name: config.appName,
          description: config.appDescription,
          image: `https://${config.domainName}/icon.png`,
          url: `https://${config.domainName}/`,
          author: {
            "@type": "Person",
            name: "Vadim",
          },
          datePublished: "2023-08-01",
          applicationCategory: "EducationalApplication",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "12",
          },
          offers: [
            {
              "@type": "Offer",
              price: "9.00",
              priceCurrency: "USD",
            },
          ],
        }),
      }}
    ></script>
  );
};
