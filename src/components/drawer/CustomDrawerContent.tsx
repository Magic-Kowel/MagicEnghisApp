import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import DrawerSubMenu from './DrawerSubMenu';
import HeaderDrawer from './HeaderDrawer';
import ItemMenu from './ItemMenu';

export default function CustomDrawerContent(props: any) {
  const [isAjustesOpen, setIsAjustesOpen] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <DrawerContentScrollView {...props}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? '#333333' : '#f5f5f5' }
      ]}>
      <HeaderDrawer text='Magic Enghis' />
      <ItemMenu title='Verbos irregulares' icon='book-open-variant' path='/' />
      <ItemMenu title='Prepositions Place' icon='sign-direction' path='/prepositionsPlace' />
      <ItemMenu title='Verbos Frasales' icon='sign-direction' path='/phrasalVerbs/LevelsScreen' />
      <DrawerSubMenu
        title="Memorize words"
        iconName="people-outline"
        open={isAjustesOpen}
        setOpen={setIsAjustesOpen}
        listItems={[
          {
            title: 'Family Members',
            path: '/memorizeWords/familyMembers',
            icon: "account-group"
          },
          {
            title: 'Days Weeks',
            path: '/memorizeWords/daysWeeks',
            icon: "calendar-outline"
          },
          {
            title: 'Fruits',
            path: '/memorizeWords/fruits',
            icon: "fruit-cherries"
          },
          {
            title: 'Months',
            path: '/memorizeWords/months',
            icon: "calendar-month"
          },
          {
            title: 'Seasons',
            path: '/memorizeWords/seasons',
            icon: "weather-partly-cloudy"
          },
        ]}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 }
});