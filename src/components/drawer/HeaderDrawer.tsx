import {
    StyleSheet,
    Text,
    useColorScheme,
    View
} from "react-native";
export default function HeaderDrawer({ text }: { text: string }) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    return (
        <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#333' }]}>
                {text}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        paddingVertical: 40,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});