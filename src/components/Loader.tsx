import { COLORS } from "@/constants/colors";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from "react-native";

export default function Loader() {
    return (
        <View style={[styles.loaderContainer, { backgroundColor: COLORS.primary }]}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loaderText}>Cargando...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    loaderText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});