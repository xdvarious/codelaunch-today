const config = {
  // REQUIRED
  appName: "CodeLaunch",
  // REQUIRED: brief app description for SEO tags (can be customized)
  appDescription:
    "The NextJS boilerplate with all you need to build your SaaS, AI tool, or any other web app.",
  // REQUIRED (exclude https://, no trailing slash, domain only)
  domainName: "codelaunch.today",
  crisp: {
    // Crisp website identifier. IF CRISP ISN'T USED: remove this and specify a support email in this config (resend.supportEmail) to maintain customer support functionality.
    id: "",
    // Conceal Crisp by default, visible only on "/" route. Toggle Crisp with <ButtonSupport/>. To display on all routes, remove this configuration
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Define multiple plans in your Stripe dashboard, then configure them here. Any number of plans can be added, ensure each includes a priceId
    plans: [
      {
        // REQUIRED — identifies the plan in webhooks (e.g., for updating user credits based on their plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        //  REQUIRED - Plan name shown on the pricing page
        name: "Starter",
        // User-friendly plan description shown on the pricing page. Tip: clarify why users should select this plan over others
        description: "Perfect for small projects",
        // Display price matching the amount users will be charged via Stripe
        price: 79,
        // Optional anchor price (e.g., $29) to display with strikethrough formatting. Leave empty if not needed
        priceAnchor: 99,
        features: [
          {
            name: "NextJS boilerplate",
          },
          { name: "User oauth" },
          { name: "Database" },
          { name: "Emails" },
        ],
      },
      {
        // This plan appears distinctively on the pricing page with highlighting. Only one plan should have isFeatured: true
        isFeatured: true,
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        name: "Advanced",
        description: "You need more power",
        price: 99,
        priceAnchor: 149,
        features: [
          {
            name: "NextJS boilerplate",
          },
          { name: "User oauth" },
          { name: "Database" },
          { name: "Emails" },
          { name: "1 year of updates" },
          { name: "24/7 support" },
        ],
      },
    ],
  },
  aws: {
    // Configure these values if utilizing AWS S3/CloudFront
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — 'From' email address for magic login link delivery
    fromNoReply: `CodeLaunch <noreply@resend.codelaunch.today>`,
    // REQUIRED — 'From' email address for other communications (abandoned carts, updates, etc.)
    fromAdmin: `Vadim at CodeLaunch <marc@resend.codelaunch.today>`,
    // Support email displayed to customers. Leave blank if unnecessary => when empty, configure Crisp above to maintain customer support capabilities
    supportEmail: "vadim.hortolomei@gmail.com",
  },
  colors: {
    // REQUIRED — DaisyUI theme selection (integrated in main layout.js). Leave empty for default (light & dark modes). Custom themes besides light/dark require configuration in config.tailwind.js under daisyui.themes.
    theme: "light",
    // REQUIRED — Color applied throughout the app beyond the document scope (loading indicators, browser tabs, etc.). Defaults to the primary color from your DaisyUI theme (ensure theme name matches "data-theme=")
    // Alternative: specify a custom color directly: main: "#f37055". HEX values only.
    main: "hsl(var(--p))", // Dynamically applies the primary color from the DaisyUI theme
  },
  auth: {
    // REQUIRED — user login path. Used to secure private routes (e.g., /dashboard). Referenced in apiClient (/libs/api.js) when handling 401 errors from the API
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
};

export default config;
