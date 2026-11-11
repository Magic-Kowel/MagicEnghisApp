import { COLORS } from "@/constants/colors";
import { Button, Dialog, Portal, Text } from "react-native-paper";
interface ModalCheckType {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    isSuccess: boolean;
    answer: string;
}
export default function ModalCheck({
    modalVisible,
    setModalVisible,
    isSuccess,
    answer
}: ModalCheckType) {
    return (
        <Portal>
            <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
                <Dialog.Icon
                    icon={isSuccess ? "check-circle" : "close-circle"}
                    size={40}
                    color={isSuccess ? "#4CAF50" : "#F44336"}
                />
                <Dialog.Title style={{ textAlign: 'center' }}>
                    {isSuccess ? "¡Excelente! 🎉" : "¡Casi, casi! ❌"}
                </Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium" style={{ textAlign: 'center' }}>
                        {isSuccess
                            ? "¡Has acertado la traducción correctamente!"
                            : `La respuesta correcta era: ${answer}`
                        }
                    </Text>
                </Dialog.Content>
                <Dialog.Actions style={{ justifyContent: 'center' }}>
                    <Button
                        mode="contained"
                        onPress={() => setModalVisible(false)}
                        buttonColor={isSuccess ? "#4CAF50" : "#F44336"}
                        textColor={COLORS.background}
                    >
                        Continuar
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}