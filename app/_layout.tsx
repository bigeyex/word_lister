import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react'

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { Provider } from 'react-redux';

import { store, persistor } from '@/store/store';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  useEffect(() => {
      SplashScreen.hideAsync();
  }, []);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="bookSelect" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="listDetail" options={{ presentation: 'modal', headerShown: false }} />
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
            
          </Stack>
        </PersistGate>
      </Provider>
      
    </ThemeProvider>
  );
}
