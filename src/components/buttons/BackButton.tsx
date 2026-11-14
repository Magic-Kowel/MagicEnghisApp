import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper'; // Usamos Paper para un diálogo con idéntico diseño
export default function BackButton() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const handleConfirmExit = () => {
        setVisible(false);
        router.back();
    };

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setVisible(true)}
                activeOpacity={0.7}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
                </View>
            </TouchableOpacity>

            {/* Modal de confirmación con diseño totalmente personalizado y bordes redondeados */}
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    style={styles.dialogContainer}
                >
                    {/* Icono superior de advertencia/pregunta */}
                    <View style={styles.iconContainerModal}>
                        <Ionicons name="alert" size={32} color="#F59E0B" />
                    </View>

                    <Dialog.Title style={[styles.title, {
                        color: isDarkMode ? COLORS.background : COLORS.backgrounDark
                    }]}>
                        ¿Deseas salir?
                    </Dialog.Title>

                    <Dialog.Content style={styles.content}>
                        <Text style={[styles.message, { color: isDarkMode ? COLORS.background : COLORS.backgrounDark }]}>
                            Si sales ahora, es posible que pierdas los cambios no guardados.
                        </Text>
                    </Dialog.Content>

                    <Dialog.Actions style={styles.actions}>
                        {/* Botón de Cancelar */}
                        <Button
                            mode="outlined"
                            onPress={() => setVisible(false)}
                            style={styles.cancelButton}
                            textColor={isDarkMode ? COLORS.background : COLORS.backgrounDark}
                        >
                            Cancelar
                        </Button>

                        {/* Botón de Confirmar Salida */}
                        <Button
                            mode="contained"
                            onPress={handleConfirmExit}
                            style={styles.exitButton}
                            buttonColor="#EF4444"
                            textColor={COLORS.background}
                        >
                            Sí, salir
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: `${COLORS.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilos del Modal Personalizado
    dialogContainer: {
        borderRadius: 32, // Bordes súper redondeados igual que el otro modal
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    iconContainerModal: {
        alignSelf: 'center',
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FEF3C7', // Fondo amarillo suave de alerta
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 22,
        marginBottom: 4,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    message: {
        textAlign: 'center',
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 22,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        marginTop: 16,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        borderRadius: 16,
        borderColor: '#D1D5DB',
        borderWidth: 1,
    },
    exitButton: {
        flex: 1,
        borderRadius: 16,
    },
});