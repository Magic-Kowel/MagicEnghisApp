import { COLORS } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

interface SwitchLabelType {
    label: string;
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SwitchLabel({ label, value, setValue }: SwitchLabelType) {
    return (
        <View style={styles.switchContainer}>
            <Text variant="bodyLarge" style={styles.label}>
                {label}
            </Text>
            <Switch
                value={value}
                onValueChange={() => setValue(!value)}
                color={COLORS.primary} // Color cuando está encendido
            />
        </View>
    );
}
const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',          // 👈 Los coloca en línea (horizontal)
        justifyContent: 'space-between', // 👈 Manda el texto a la izquierda y el switch a la derecha
        alignItems: 'center',          // 👈 Los alinea verticalmente al centro
    },
    label: {
        fontSize: 16,
    },
});