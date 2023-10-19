import Loading from "@/components/elements/Loading";
import { useEnforceLocation } from "@/hooks/useEnforceLocation";
import "@/styles/globals.css";
import { garamond } from "@/utils/constants/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import cn from "clsx";

const EnforceLocationBasedRoutes = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const {
    isGettingLocation,
    isLocationFound,
    locationId,
    isPermissionRejected,
  } = useEnforceLocation();

  if (isPermissionRejected) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center lg:text-6xl md:text-4xl text-3xl px-6 text-center",
          garamond.className
        )}
      >
        <h1>Please enable your device location in order to use this app.</h1>
      </div>
    );
  }

  if (!router.isReady) {
    return <Loading />;
  }

  const shouldEnforce =
    router.asPath === "/" || router.asPath.split("/").includes("location");

  if (isGettingLocation) {
    return <Loading />;
  }

  if (!isLocationFound) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center lg:text-6xl md:text-4xl text-3xl px-6 text-center",
          garamond.className
        )}
      >
        <h1>This location has not been registered in Collectiv.</h1>
      </div>
    );
  }

  if (!shouldEnforce) {
    return children;
  }

  const isHomepage = router.asPath === "/";
  const isLocationMismatch = router.query.id !== locationId

  if (isHomepage || isLocationMismatch) {
    router.replace(`/location/${locationId}`);
    return null;
  }

  return children;
};

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <EnforceLocationBasedRoutes>
        <Component {...pageProps} />
      </EnforceLocationBasedRoutes>
    </QueryClientProvider>
  );
}
