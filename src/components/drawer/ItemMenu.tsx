import { COLORS } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
interface ItemMenuType {
    title: string;
    path: string;
    icon: string;
}

export default function ItemMenu({ title, path, icon }: ItemMenuType) {
    const router = useRouter();
    const pathname = usePathname();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    return (<>
        <TouchableOpacity
            style={[styles.menuItem, pathname === path && styles.activeItem]}
            onPress={() => router.push(path as any)}
        >
            <MaterialCommunityIcons name={icon as any} size={22} color={COLORS.primary} />
            <Text style={[styles.menuText, { color: isDark ? '#fff' : '#333' }]}>
                {title}
            </Text>
        </TouchableOpacity>
    </>);
}
const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20
    },
    activeItem: { backgroundColor: 'rgba(0,0,0,0.05)' },
    menuText: { marginLeft: 15, fontSize: 15, fontWeight: '500' },
});