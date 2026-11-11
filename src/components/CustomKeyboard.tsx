import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

interface CustomKeyboardProps {
    onPressKey: (key: string) => void; // 👈 Cambiamos a una función normal que recibe la tecla
}

export default function CustomKeyboard({ onPressKey }: CustomKeyboardProps) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    return (
        <View style={styles.keyboardContainer}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((key) => (
                        <Pressable
                            key={key}
                            style={({ pressed }) => [
                                styles.key,
                                { backgroundColor: isDarkMode ? '#2d2d2d' : '#e0e0e0' },
                                pressed && { backgroundColor: isDarkMode ? '#444444' : '#b0b0b0' }
                            ]}
                            // Al presionar, simplemente mandamos la tecla hacia arriba
                            onPress={() => onPressKey(key)}
                        >
                            <Text style={[styles.keyText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
                                {key}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        width: '100%',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 6,
        gap: 4,
    },
    key: {
        flex: 1,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    keyText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});