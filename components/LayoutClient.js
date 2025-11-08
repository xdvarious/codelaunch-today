"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Crisp } from "crisp-sdk-web";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import config from "@/config";

// Crisp customer support chat:
// This component exists separately from ClientLayout as it requires <SessionProvider> wrapping to utilize the useSession() hook
const CrispChat = () => {
  const pathname = usePathname();
  const { data } = useSession();

  useEffect(() => {
    if (config?.crisp?.id) {
      // Configure Crisp
      Crisp.configure(config.crisp.id);

      // (Optional) When onlyShowOnRoutes array contains routes in config.js, Crisp will be concealed on those specified routes.
      // Employ <AppButtonSupport> as an alternative to reveal it (users click the button to display Crisp, maintaining a cleaner interface)
      if (
        config.crisp.onlyShowOnRoutes &&
        !config.crisp.onlyShowOnRoutes?.includes(pathname)
      ) {
        Crisp.chat.hide();
        Crisp.chat.onChatClosed(() => {
          Crisp.chat.hide();
        });
      }
    }
  }, [pathname]);

  // Associate User Unique ID with Crisp for simplified user identification during support interactions (optional)
  useEffect(() => {
    if (data?.user && config?.crisp?.id) {
      Crisp.session.setData({ userId: data.user?.id });
    }
  }, [data]);

  return null;
};

// All client-side wrappers reside here (incompatible with server components)
// 1. SessionProvider: Enables useSession from next-auth (determines user authentication status)
// 2. NextTopLoader: Displays a progress indicator at the top during page navigation
// 3. Toaster: Renders Success/Error notifications throughout the app via toast()
// 4. Tooltip: Displays tooltips for JSX elements containing these attributes: data-tooltip-id="tooltip" data-tooltip-content=""
// 5. CrispChat: Configures Crisp customer support chat (detailed above)
const ClientLayout = ({ children }) => {
  return (
    <>
      <SessionProvider>
        {/* Display a progress indicator at the top during page transitions */}
        <NextTopLoader color={config.colors.main} showSpinner={false} />

        {/* Content from app/page.js files  */}
        {children}

        {/* Render Success/Error notifications throughout the app using toast() */}
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />

        {/* Display tooltips for JSX elements with these attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
        <Tooltip
          id="tooltip"
          className="z-[60] !opacity-100 max-w-sm shadow-lg"
        />

        {/* Configure Crisp customer support chat */}
        <CrispChat />
      </SessionProvider>
    </>
  );
};

export default ClientLayout;
