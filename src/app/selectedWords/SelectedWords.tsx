import Container from '@/components/Container';
import ModalCheck from '@/components/modal/ModalCheck';
import Title from '@/components/Title';
import { COLORS } from '@/constants/colors';
import { randomIndex } from '@/tools/randomIndex';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    Button,
    Surface
} from 'react-native-paper';

interface WordItem {
    english: string;
    spanish: string;
}
export default function SelectedWords({ list }: { list: WordItem[] }) {
    // 1. Tipamos el estado 'word' para que acepte un WordItem o sea null al inicio
    const [word, setWord] = useState<WordItem | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");
    // 2. Tipamos el estado 'options' para que sea un array de WordItem
    const [options, setOptions] = useState<WordItem[]>([]);

    const handleRandom = useCallback(() => {
        if (list.length === 0) return;

        const correctIndex = randomIndex(list);
        const currentWord = list[correctIndex];

        // Ahora TypeScript no se queja porque 'setWord' acepta 'WordItem'
        setWord(currentWord);

        // Filtrar opciones incorrectas
        const incorrectOptions = list.filter(
            (_, i) => i !== correctIndex,
        );

        // Barajar y tomar 3 incorrectas
        const shuffledIncorrect = [...incorrectOptions].sort(
            () => 0.5 - Math.random(),
        );
        const selectedIncorrect = shuffledIncorrect.slice(0, 3);

        // Combinar con la correcta y barajar de nuevo
        const currentOptions = [...selectedIncorrect, currentWord].sort(
            () => 0.5 - Math.random(),
        );

        setOptions(currentOptions);
    }, []);
    useEffect(() => {
        handleRandom();
    }, []);
    const handleCheck = (optionSpanish: string) => {
        const result = word?.spanish === optionSpanish;
        if (word?.spanish) {
            setCorrectAnswer(word?.spanish);
        }
        setIsSuccess(result);
        setModalVisible(true)
        handleRandom();
    };
    return (
        <>
            <Container>
                <View style={styles.contentWrapper}>
                    {/* Título de la sección */}
                    <View style={styles.centerContainer}>
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

                    {/* Opciones de respuesta dinámicas */}
                    <View style={styles.optionsContainer}>
                        {options.map((item: WordItem, index: number) => (
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

                </View>
            </Container>
            <ModalCheck
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                isSuccess={isSuccess}
                answer={correctAnswer.toUpperCase()}
            />
        </>

    );
}

const styles = StyleSheet.create({
    contentWrapper: {
        width: '100%',
        maxWidth: 600,
        alignItems: 'center',
    },
    centerContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
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