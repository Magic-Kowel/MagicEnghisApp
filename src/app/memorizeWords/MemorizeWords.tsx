import Container from '@/components/Container';
import CustomKeyboard from '@/components/CustomKeyboard';
import ModalCheck from '@/components/modal/ModalCheck';
import Title from '@/components/Title';
import { COLORS } from '@/constants/colors';
import normalizeText from '@/tools/normalizeText';
import { randomEnglish } from '@/tools/randomEnglish';
import { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
interface WordItem {
    english: string;
    spanish: string;
}
interface MemorizeWordsProps {
    list: WordItem[];
}
export default function MemorizeWords({ list }: MemorizeWordsProps) {
    const [text, setText] = useState("");
    const [randomIndex, setRandomIndex] = useState(0);
    const [isEnglish, setIsEnglish] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const handleVirtualKeyPress = (key: string) => {
        if (key === '⌫') {
            setText((prev) => prev.slice(0, -1));
        } else {
            setText((prev) => prev + key.toLowerCase());
        }
    };
    const handleValidateENG = () =>
        normalizeText(text.trim().toUpperCase()) ===
        normalizeText(list[randomIndex]?.spanish.toUpperCase());

    const handleValidateESP = () =>
        normalizeText(text.trim().toUpperCase()) ===
        normalizeText(list[randomIndex]?.english.toUpperCase());
    const handleRandom = () => {
        if (list.length > 0) {
            const index = Math.floor(Math.random() * list.length);
            setRandomIndex(index);
            setIsEnglish(randomEnglish());
            setText("");
        }
    };
    const handleValidate = () => {
        const isCorrect = isEnglish ? handleValidateENG() : handleValidateESP();
        const correctAnswer = isEnglish
            ? list[randomIndex]?.spanish
            : list[randomIndex]?.english;
        setIsSuccess(isCorrect);
        setCorrectAnswer(correctAnswer);
        setModalVisible(true);
        handleRandom();
    };
    useEffect(() => {
        handleRandom();
    }, [list]);

    return (<>

        <View style={styles.container}>
            <Title title='Escribe la traducción' />
        </View>

        <Container>
            <Card>
                <Card.Content>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        gap: 10
                    }}>
                        <Text
                            variant="titleLarge"
                            style={{
                                color: isDarkMode ? COLORS.background : COLORS.backgrounDark,
                                textAlign: 'center'
                            }}
                        >
                            Traduce al {isEnglish ? "Español" : "Inglés"}
                        </Text>
                        <Text
                            variant="titleLarge"
                            style={{
                                color: isDarkMode ? COLORS.background : COLORS.backgrounDark,
                                textAlign: 'center'
                            }}
                        >
                            {isEnglish
                                ? list[randomIndex]?.english
                                : list[randomIndex]?.spanish}
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: COLORS.primary,
                        borderRadius: 20,
                        alignSelf: 'center',
                        paddingHorizontal: text.length > 0 ? 10 : 0,
                        paddingVertical: 10,
                        marginVertical: 20
                    }}>
                        <Text
                            variant="titleLarge"
                            style={[styles.text]}
                        >
                            {text}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        marginVertical: 20
                    }}>
                        {/* El botón "Siguiente" solo aparece si la condición se cumple */}
                        <Button
                            mode="contained"
                            textColor={COLORS.background}
                            buttonColor={COLORS.primary}
                            onPress={handleValidate}
                            style={{ flex: 1 }} // 👈 Hace que ocupe la mitad del espacio disponible
                        >
                            Validar
                        </Button>
                    </View>
                    <CustomKeyboard onPressKey={handleVirtualKeyPress} />
                </Card.Content>
            </Card>
        </Container>
        <ModalCheck
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            isSuccess={isSuccess}
            answer={correctAnswer.toUpperCase()}
        />
    </>);
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center'
    },
    text: {
        color: COLORS.background
    }
});