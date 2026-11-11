import { COLORS } from "@/constants/colors";
import { StyleSheet, useColorScheme, View } from "react-native";
export default function Container({ children }: { children: React.ReactNode }) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    return (<>
        <View style={[
            styles.container,
            {
                backgroundColor: isDarkMode ? COLORS.backgrounDark : COLORS.background
            }]}>
            {children}
        </View>
    </>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});