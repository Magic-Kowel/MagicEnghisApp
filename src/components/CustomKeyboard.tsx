import { useRef } from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
    useColorScheme
} from 'react-native';

interface CustomKeyboardProps {
    onPressKey: (key: string) => void;
    spaceKey: boolean;
}

export default function CustomKeyboard({ onPressKey, spaceKey = false }: CustomKeyboardProps) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
        [" "]
    ];

    return (
        <View style={styles.keyboardContainer}>
            {
                rows.map((row, rowIndex) => (
                    <View key={`row-${rowIndex}`} style={styles.row}>
                        {row.filter((item => {
                            if (!spaceKey && item === " ") {
                                return;
                            }
                            return item;
                        })).map((key) => {
                            return (
                                <AnimatedKey
                                    key={key}
                                    kKey={key}
                                    isDarkMode={isDarkMode}
                                    onPressKey={onPressKey}
                                />
                            );
                        })}
                    </View>
                ))
            }
        </View >
    );
}
function AnimatedKey({
    kKey,
    isDarkMode,
    onPressKey
}: {
    kKey: string;
    isDarkMode: boolean;
    onPressKey: (k: string) => void
}) {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const isSpecialKey = kKey === '⌫';

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.90, // Se encoge un 10% al tocar
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1, // Regresa a su tamaño original
            useNativeDriver: true,
            speed: 50,
            bounciness: 6,
        }).start();
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => onPressKey(kKey)}
            style={[
                isSpecialKey ? styles.specialKey : styles.normalKey,
            ]}
        >
            <Animated.View
                style={[
                    styles.key,
                    {
                        backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
                        transform: [{ scale: scaleAnim }], // 👈 Aquí aplicamos la animación de escala
                    },
                ]}
            >
                <Text style={[
                    styles.keyText,
                    { color: isDarkMode ? '#ffffff' : '#1f2937' }
                ]}>
                    {kKey}
                </Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
        gap: 6,
    },
    normalKey: {
        flex: 1,
    },
    specialKey: {
        flex: 1.5,
    },
    key: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1.5,
    },
    keyText: {
        fontSize: 18,
        fontWeight: '600',
    },
});