import Container from '@/components/Container';
import ModalCheck from '@/components/modal/ModalCheck';
import Title from '@/components/Title';
import { COLORS } from '@/constants/colors';
import { useGameStore } from '@/store/useGameStore';
import { randomIndex } from '@/tools/randomIndex';
import { getData, saveData } from '@/tools/storage';
import { WordItem } from '@/types/listTypes';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    Button,
    ProgressBar,
    Surface
} from 'react-native-paper';
import BackButton from './buttons/BackButton';
export default function SelectedWordsLevel({
    list,
    namescore,
    pathBack
}: {
    list: WordItem[],
    namescore: string,
    pathBack: string
}) {
    const [word, setWord] = useState<WordItem | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [options, setOptions] = useState<WordItem[]>([]);
    const [level, setLevel] = useState<number>(0);
    const router = useRouter();
    const score = useGameStore((state) => state.score);
    const handleRandom = useCallback(() => {
        if (list.length === 0) return;
        const correctIndex = randomIndex(list);
        const currentWord = list[correctIndex];
        setWord(currentWord);
        const incorrectOptions = list.filter((_, i) => i !== correctIndex);
        const shuffledIncorrect = [...incorrectOptions].sort(() => 0.5 - Math.random());
        const selectedIncorrect = shuffledIncorrect.slice(0, 3);
        const currentOptions = [...selectedIncorrect, currentWord].sort(() => 0.5 - Math.random());
        setOptions(currentOptions);
    }, [list]);

    useEffect(() => {
        handleRandom();
    }, [handleRandom]);

    const handleCheck = async (optionSpanish: string) => {
        const result = word?.spanish === optionSpanish;
        if (word?.spanish) {
            setCorrectAnswer(word?.spanish);
        }
        let nextLevel = level;
        if (!result) {
            nextLevel = 0;
        } else {
            nextLevel = level + 1;
        }
        if (nextLevel === list.length) {
            const savedScore = await getData(namescore) ?? 0;
            if (score === savedScore) {
                await saveData(namescore, score + 1);
            }
            setLevel(0);
            router.replace(pathBack as any);
            return;
        }
        setLevel(nextLevel);
        setIsSuccess(result);
        setModalVisible(true);
        handleRandom();
    };
    return (<>
        <Container>
            {/* Título de la sección */}
            <View style={styles.centerTitle}>
                <BackButton />
                <Title title='Selecciona la opción correcta' />
            </View>

            {/* Tarjeta central (Flashcard visual con Surface) */}
            <View style={styles.centerContainer}>
                <Surface style={[styles.card, { borderColor: COLORS.primary }]} elevation={3}>
                    <Text style={styles.cardSubtitle}>
                        ¿Qué significa en español?
                    </Text>
                    <Text style={styles.cardWord}>
                        {word?.english}
                    </Text>
                </Surface>
            </View>
            <View style={{
                marginVertical: 20,
                justifyContent: "center"
            }}>
                <ProgressBar progress={level / list.length} color={COLORS.primary} />
            </View>
            <Text style={styles.cardWord}>
                {word?.spanish}
            </Text>
            {/* Opciones de respuesta dinámicas */}
            <View style={styles.optionsContainer}>
                {options.map((item: any, index: number) => (
                    <Button
                        key={index}
                        mode="outlined"
                        onPress={() => handleCheck(item.spanish)}
                        style={styles.optionButton}
                        contentStyle={styles.optionContent}
                        labelStyle={styles.optionLabel}
                        textColor={COLORS.primary}
                        theme={{
                            colors: {
                                outline: COLORS.primary,
                            },
                        }}
                    >
                        {item.spanish}
                    </Button>
                ))}
            </View>
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
    centerContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    centerTitle: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        gap: 10,
    },
    card: {
        width: '100%',
        maxWidth: 450,
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    cardWord: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.primary,
        textAlign: 'center',
    },
    optionsContainer: {
        width: '100%',
        maxWidth: 450,
        gap: 12, // Espacio vertical entre los botones
    },
    optionButton: {
        width: '100%',
        borderRadius: 12,
        borderWidth: 1
    },
    optionContent: {
        paddingVertical: 6,
    },
    optionLabel: {
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'none', // Evita que se ponga todo en mayúsculas por defecto en algunas plataformas
    },
});