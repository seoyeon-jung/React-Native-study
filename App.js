import { ThemeProvider } from "@emotion/react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./theme";

// access the client
const queryClient = new QueryClient();

export default function App() {
  // dark mode => true
  const isDark = useColorScheme() === "dark";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
