import { COLORS } from '@/constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    useColorScheme,
    View,
} from 'react-native';
import { Divider } from 'react-native-paper';

// Habilitar LayoutAnimation en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CustomAccordionProps {
    title: string;
    subtitle?: string;
    icon?: string;
    defaultOpen?: boolean;
    children: React.ReactNode; // Aquí va cualquier componente custom que quieras
}

export default function CustomAccordion({
    title,
    subtitle,
    icon,
    defaultOpen = false,
    children,
}: CustomAccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const toggleAccordion = () => {
        // Anima suavemente la apertura y cierre
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                    borderColor: isDark ? '#333333' : '#e5e5e5',
                },
            ]}
        >
            {/* Cabecera interactiva */}
            <TouchableOpacity
                style={styles.header}
                onPress={toggleAccordion}
                activeOpacity={0.7}
            >
                <View style={styles.titleContainer}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon as any}
                            size={24}
                            color={COLORS.primary}
                            style={styles.icon}
                        />
                    )}
                    <View style={styles.textWrapper}>
                        <Text style={[styles.title, { color: isDark ? '#ffffff' : '#222222' }]}>
                            {title}
                        </Text>
                        {subtitle && (
                            <Text style={[styles.subtitle, { color: isDark ? '#aaaaaa' : '#666666' }]}>
                                {subtitle}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Flecha indicadora */}
                <MaterialCommunityIcons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={isDark ? '#cccccc' : '#555555'}
                />
            </TouchableOpacity>
            <Divider />
            {/* Contenido desplegable (Tus componentes custom) */}
            {isOpen && (
                <View
                    style={[
                        styles.content,
                        { borderTopColor: isDark ? '#333333' : '#f0f0f0' },
                    ]}
                >
                    {children}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        borderWidth: 1,
        marginVertical: 6,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 12,
    },
    textWrapper: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 13,
        marginTop: 2,
    },
    content: {
        // padding: 14,
        // borderTopWidth: 1,
    },
});