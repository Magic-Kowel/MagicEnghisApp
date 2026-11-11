// app/_layout.tsx
import CustomDrawerContent from '@/components/drawer/CustomDrawerContent';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { COLORS } from '../constants/colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : DefaultTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: true,
            drawerActiveTintColor: COLORS.primary,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: '#fff',
            sceneStyle: {
              backgroundColor: colorScheme === 'dark' ? '#0f0f0f' : '#f5f5f5',
            },
            drawerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#333333' : '#f5f5f5',
              width: 240,
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: 'Verbos irregulares',
            }}
          />
          <Drawer.Screen
            name="memorizeWords/familyMembers"
            options={{ drawerItemStyle: { display: 'none' }, title: 'Family Members' }}
          />
          <Drawer.Screen
            name="memorizeWords/daysWeeks"
            options={{ drawerItemStyle: { display: 'none' }, title: 'Weeks' }}
          />
          <Drawer.Screen
            name="memorizeWords/fruits"
            options={{ drawerItemStyle: { display: 'none' }, title: 'Fruits' }}
          />
          <Drawer.Screen
            name="memorizeWords/months"
            options={{ drawerItemStyle: { display: 'none' }, title: 'Months' }}
          />
          <Drawer.Screen
            name="memorizeWords/seasons"
            options={{ drawerItemStyle: { display: 'none' }, title: 'Seasons' }}
          />
          <Drawer.Screen
            name="prepositionsPlace"
            options={{ drawerItemStyle: { display: 'none' }, title: 'Prepositions Place' }}
          />
          <Drawer.Screen
            name="irregularverbs/Irregularverbs"
            options={{ drawerItemStyle: { display: 'none' }, title: 'Prepositions Place' }}
          />
        </Drawer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}