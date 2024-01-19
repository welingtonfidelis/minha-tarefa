import { I18nextProvider } from "react-i18next";
import { ChakraProvider } from "@chakra-ui/react";

import i18n from "./config/18n";
import { Preloader } from "./components/preloader";

import { GlobalStyles } from "./global.styles";
import { MainPage } from "./pages/mainPage";
import { QueryClient, QueryClientProvider } from "react-query";

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: "top-right",
          isClosable: true,
          duration: 5000,
          status: "success",
          containerStyle: { maxWidth: "300px" },
        },
      }}
    >
      <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <GlobalStyles />
            <Preloader isLoading={false}>
              <MainPage />
            </Preloader>
          </QueryClientProvider>
      </I18nextProvider>
    </ChakraProvider>
  );
};
