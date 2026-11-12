
import CustomKeyboard from '@/components/CustomKeyboard';
import ModalCheck from '@/components/ModalCheck';
import Title from '@/components/Title';
import { COLORS } from '@/constants/colors';
import { useGameStore } from '@/store/useGameStore';
import { randomIndex } from '@/tools/randomIndex';
import speakMessage from '@/tools/speech';
import { getData, saveData } from '@/tools/storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState, } from 'react';
import { ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';
const getRandomProperty = (obj: any) => {
    const keys = Object.keys(obj).filter(
        (key) => key !== "translation" && key !== "difficulty" && key !== "infinitive",
    );
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return randomKey;
};
export default function Irregularverbs() {
    const [text, setText] = useState("");
    const [indexList, setIndexList] = useState(0);
    const [level, setLevel] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [randomProperty, setRandomProperty] = useState("past");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const router = useRouter();
    const colorScheme = useColorScheme();
    const listIrregularVerbs = useGameStore((state) => state.irregularVerbs);
    const score = useGameStore((state) => state.score);
    const isDarkMode = colorScheme === 'dark';
    useEffect(() => {
        handleRandom();
    }, []);
    useFocusEffect(
        useCallback(() => {
            if (!modalVisible) {
                speakMessage(listIrregularVerbs[indexList]?.infinitive);
            }
            return () => {
                // detener audio si es necesario
            };
        }, [modalVisible])
    );
    const handleRandom = (nextLevel = level) => {
        const index = randomIndex(listIrregularVerbs);
        setIndexList(nextLevel);
        const property = getRandomProperty(listIrregularVerbs[index]);
        setRandomProperty(property);
    };
    async function handleModeGame(result: boolean) {
        let nextLevel = level;
        // 1. Determinar el siguiente nivel según si acertó o falló
        if (!result) {
            nextLevel = 0; // Si falla, vuelve al inicio
        } else {
            nextLevel = level + 1; // Si acierta, avanza
        }
        // 2. Verificar si ya se completaron todos los niveles
        if (nextLevel === listIrregularVerbs.length) {
            const savedScore = await getData('score') ?? 0;

            // Si el puntaje actual es MAYOR al récord guardado, lo actualizamos
            if (score > savedScore) {
                await saveData('score', score); // Guardamos el puntaje real, SIN sumarle 1
            }
            setLevel(0);
            router.back();
            return;
        }
        // 3. Actualizar el nivel actual
        setLevel(nextLevel);
        handleRandom(nextLevel);
        // 4. Sincronizar el índice de la palabra según el mod
        setIndexList(nextLevel); // En modo secuencial, el índice sigue al nivel

    }

    const handleVirtualKeyPress = (key: string) => {
        if (key === '⌫') {
            setText((prev) => prev.slice(0, -1));
        } else {
            setText((prev) => prev + key.toLowerCase());
        }
    };
    const handleValidate = () => {
        if (listIrregularVerbs.length === level) {
            return;
        }
        const propertyKey = randomProperty as keyof typeof listIrregularVerbs[number];
        const expectedAnswer = String(listIrregularVerbs[indexList][propertyKey] || "").toLowerCase();
        setCorrectAnswer(expectedAnswer);
        const result = expectedAnswer === text.toLowerCase();
        setIsSuccess(result);
        setModalVisible(true);
        handleModeGame(result);
        setText("");
    };


    return (<>
        <ScrollView>
            <View style={[styles.mainContainer, { backgroundColor: isDarkMode ? '#0f0f0f' : '#f5f5f5' }]}>
                <View style={styles.container}>
                    <Title title='Escribe la traducción' />
                </View>
                <Card>
                    <Card.Content>
                        <Text
                            variant="displaySmall"
                            style={{
                                color: isDarkMode ? COLORS.background : COLORS.backgrounDark,
                                textAlign: 'center'
                            }}
                        >
                            {listIrregularVerbs[indexList]?.infinitive.toUpperCase()}
                        </Text>
                        <Text
                            variant="titleLarge"
                            style={{
                                color: isDarkMode ? COLORS.background : COLORS.backgrounDark,
                                textAlign: 'center',
                                marginVertical: 20
                            }}
                        >
                            {listIrregularVerbs[indexList]?.translation}
                        </Text>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: "center"
                        }}>

                            <Text
                                variant="bodyLarge"
                                style={[styles.text, { color: isDarkMode ? COLORS.background : COLORS.backgrounDark }]}
                            >
                                Escribe el verbo en:
                            </Text>
                            <View style={styles.containerChips}>
                                <Chip
                                    mode="flat"
                                    textStyle={{ fontWeight: 'bold', color: COLORS.background }}
                                    style={[styles.chip, { backgroundColor: COLORS.primary }]}
                                >
                                    {randomProperty.toUpperCase()}
                                </Chip>

                                <Chip
                                    mode="outlined"
                                    style={[styles.chip, { borderColor: COLORS.primary }]}
                                    textStyle={[styles.smallText, { color: COLORS.primary }]}
                                >
                                    {`${level + 1}`}
                                </Chip>

                            </View>

                        </View>

                        <View style={{
                            backgroundColor: COLORS.primary,
                            borderRadius: 20,
                            alignSelf: 'center',
                            paddingHorizontal: text.length > 0 ? 10 : 0,
                            paddingVertical: 10,
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
            </View>
        </ScrollView>
        <ModalCheck
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            isSuccess={isSuccess}
            answer={correctAnswer.toUpperCase()}
        />
    </>)
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, // Ocupa toda la pantalla y permite que la FlatList interna maneje el scroll
        backgroundColor: '#f5f5f5',
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    containerInput: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    text: {
        color: COLORS.background
    },
    chip: {
        marginVertical: 2,        // Espaciado vertical si hace wrap
        alignSelf: 'flex-start',
        color: COLORS.primary
    },
    smallText: {
        fontSize: 12,             // Simula el tamaño "small" de los chips
    },
    containerChips: {
        flexDirection: 'row',     // Los coloca en horizontal
        justifyContent: 'center', // 👈 ESTO CENTRA LOS CHIPS HORIZONTALMENTE
        alignItems: 'center',     // Los alinea verticalmente al centro
        gap: 8,                   // Espacio de separación entre ambos chips
        marginVertical: 8,        // Espacio arriba y abajo del contenedor
    },

});