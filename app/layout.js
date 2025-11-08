import { Inter } from "next/font/google";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport = {
	// Applies your theme's primary color to the URL bar in compatible browsers
	themeColor: config.colors.main,
	width: "device-width",
	initialScale: 1,
};

// Applies default SEO tags across all application pages.
// Override these on individual pages by passing parameters to the getSEOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			data-theme={config.colors.theme}
			className={font.className}
		>
			<body>
				{/* ClientLayout encompasses all client-side wrappers (Crisp chat support, toast notifications, tooltips, etc.) */}
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
