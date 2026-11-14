
import BackButton from '@/components/buttons/BackButton';
import ButtonMain from '@/components/buttons/ButtonMain';
import Container from '@/components/Container';
import CustomKeyboard from '@/components/CustomKeyboard';
import ModalCheck from '@/components/modal/ModalCheck';
import Title from '@/components/Title';
import { COLORS } from '@/constants/colors';
import { useGameStore } from '@/store/useGameStore';
import { getData, saveData } from '@/tools/storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { Card, Chip, ProgressBar, Text } from 'react-native-paper';
function getRandomProperty<T extends Record<string, any>>(obj: T): keyof T {
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
            setLevel(0);
            setIndexList(0);
        }, [listIrregularVerbs])
    );
    const handleRandom = (nextLevel = level) => {
        setIndexList(nextLevel);
        const property = getRandomProperty(listIrregularVerbs[nextLevel]);
        setRandomProperty(property);
    };
    async function handleModeGame(result: boolean) {
        let nextLevel = level;
        if (!result) {
            nextLevel = 0;
        } else {
            nextLevel = level + 1;
        }
        if (nextLevel === listIrregularVerbs.length) {
            const savedScore = await getData('score') ?? 0;
            if (score === savedScore) {
                await saveData('score', score + 1);
            }
            setLevel(0);
            router.back();
            return;
        }
        setLevel(nextLevel);
        handleRandom(nextLevel);
        setIndexList(nextLevel);
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
        const result = expectedAnswer === text.toLowerCase().trim();
        setIsSuccess(result);
        setModalVisible(true);
        handleModeGame(result);
        setText("");
    };


    return (<>
        <ScrollView>
            <Container>
                <View style={styles.container}>
                    <BackButton />
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
                            <View style={styles.containerCenter}>
                                <Text
                                    variant="bodyLarge"
                                    style={[styles.text, { color: isDarkMode ? COLORS.background : COLORS.backgrounDark }]}
                                >
                                    Escribe el verbo en:
                                </Text>
                                <Chip
                                    mode="flat"
                                    textStyle={{ fontWeight: 'bold', color: COLORS.background }}
                                    style={[styles.chip, { backgroundColor: COLORS.primary }]}
                                >
                                    {randomProperty.toUpperCase()}
                                </Chip>
                            </View>
                        </View>
                        <ProgressBar progress={indexList / listIrregularVerbs.length} color={COLORS.primary} />
                        <View style={{
                            backgroundColor: COLORS.primary,
                            borderRadius: 20,
                            alignSelf: 'center',
                            paddingHorizontal: text.length > 0 ? 10 : 0,
                            paddingVertical: 10,
                            marginVertical: 10
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
                            marginVertical: 10
                        }}>
                            <ButtonMain
                                text='Validar'
                                handle={handleValidate}
                                full
                            />
                        </View>
                        <CustomKeyboard onPressKey={handleVirtualKeyPress} />
                    </Card.Content>
                </Card>
            </Container>
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
    container: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        gap: 10
    },
    text: {
        color: COLORS.background
    },
    chip: {
        marginVertical: 2,
        alignSelf: 'flex-start',
        color: COLORS.primary
    },
    containerCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginVertical: 8,
    },

});