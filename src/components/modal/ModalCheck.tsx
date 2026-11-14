import { StyleSheet, View } from "react-native";
import { Button, Dialog, Icon, Portal, Text } from "react-native-paper"; // <-- Importamos Icon aquí

interface ModalCheckType {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    isSuccess: boolean;
    answer: string;
    successColor?: string;
    errorColor?: string;
    buttonTextColor?: string;
}

export default function ModalCheck({
    modalVisible,
    setModalVisible,
    isSuccess,
    answer,
    successColor = "#10B981",
    errorColor = "#EF4444",
    buttonTextColor = "#FFFFFF",
}: ModalCheckType) {

    const activeColor = isSuccess ? successColor : errorColor;
    const containerBg = isSuccess ? "#ECFDF5" : "#FEF2F2";
    const textColor = isSuccess ? "#065F46" : "#991B1B";

    return (
        <Portal>
            <Dialog
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                style={[styles.dialogContainer, { backgroundColor: containerBg }]}
            >
                {/* Contenedor circular con flexbox para centrar perfectamente el icono */}
                <View style={[styles.iconContainer, { backgroundColor: `${activeColor}20` }]}>
                    <Icon
                        source={isSuccess ? "check" : "close"}
                        size={32}
                        color={activeColor}
                    />
                </View>

                {/* Título */}
                <Dialog.Title style={[styles.title, { color: textColor }]}>
                    {isSuccess ? "¡Excelente! 🎉" : "¡Casi lo logras! ❌"}
                </Dialog.Title>

                {/* Contenido */}
                <Dialog.Content style={styles.content}>
                    <Text variant="bodyMedium" style={[styles.message, { color: textColor }]}>
                        {isSuccess
                            ? "¡Has acertado la traducción correctamente!"
                            : "La respuesta correcta era:"
                        }
                    </Text>

                    {!isSuccess && (
                        <View style={[styles.answerCard, { borderColor: `${activeColor}40` }]}>
                            <Text variant="titleMedium" style={styles.answerText}>
                                {answer}
                            </Text>
                        </View>
                    )}
                </Dialog.Content>

                {/* Botón */}
                <Dialog.Actions style={styles.actions}>
                    <Button
                        mode="contained"
                        onPress={() => setModalVisible(false)}
                        buttonColor={activeColor}
                        textColor={buttonTextColor}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                        labelStyle={styles.buttonLabel}
                    >
                        Continuar
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    dialogContainer: {
        borderRadius: 28,
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 8,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
    },
    iconContainer: {
        alignSelf: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center', // Centra verticalmente de forma exacta
        alignItems: 'center',     // Centra horizontalmente de forma exacta
        marginBottom: 8,
    },
    title: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 22,
        marginBottom: 4,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    message: {
        textAlign: 'center',
        fontSize: 15,
        opacity: 0.85,
        marginBottom: 12,
    },
    answerCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 4,
        borderWidth: 1,
        elevation: 1,
    },
    answerText: {
        fontWeight: 'bold',
        color: '#1F2937',
        fontSize: 16,
    },
    actions: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        justifyContent: 'center',
        marginTop: 8,
    },
    button: {
        width: '100%',
        borderRadius: 16,
    },
    buttonContent: {
        paddingVertical: 8,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});