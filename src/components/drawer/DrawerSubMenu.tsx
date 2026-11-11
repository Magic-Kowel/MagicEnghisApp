import { COLORS } from '@/constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

interface ItemSubMenuType {
    title: string;
    path: string;
    icon?: string;
}

interface DrawerSubMenuType {
    title: string;
    iconName?: keyof typeof Ionicons.glyphMap; // <-- Añadido para cambiar el icono opcionalmente
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    listItems: ItemSubMenuType[];
}

export default function DrawerSubMenu({
    title,
    iconName = "settings-outline",
    open,
    setOpen,
    listItems
}: DrawerSubMenuType) {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    return (
        <View>
            <TouchableOpacity style={styles.dropdownToggle} onPress={() => setOpen(!open)}>
                <View style={styles.row}>
                    <Ionicons name={iconName} size={22} color={COLORS.primary} />
                    <Text
                        style={[styles.dropdownText, { color: isDark ? '#fff' : '#333' }]}
                    >
                        {title}
                    </Text>
                </View>
                <Ionicons
                    name={open ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={isDark ? '#ccc' : '#666'}
                />
            </TouchableOpacity>

            {open && (
                <View style={[styles.submenu, { backgroundColor: isDark ? '#2a2a2a' : '#eaeaea' }]}>
                    {listItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.submenuItem}
                            onPress={() => router.push(item.path as any)}
                        >
                            <MaterialCommunityIcons name={item.icon ? item.icon as any : "options-outline"} size={18} color={COLORS.primary} />
                            <Text
                                style={[styles.submenuText, { color: isDark ? '#ddd' : '#555' }]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20 },
    dropdownToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 20 },
    row: { flexDirection: 'row', alignItems: 'center' },
    dropdownText: { marginLeft: 15, fontSize: 15, fontWeight: '500' },
    submenu: { paddingLeft: 15 },
    submenuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20 },
    submenuText: { marginLeft: 15, fontSize: 14 }
});