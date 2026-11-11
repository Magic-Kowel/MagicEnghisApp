import Container from '@/components/Container';
import Title from '@/components/Title';
import { COLORS } from '@/constants/colors';
import { verbsIrregularsList } from '@/db/verbsIrregularsList';
import { useGameStore } from '@/store/useGameStore';
import { getData } from '@/tools/storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton, Surface } from 'react-native-paper';

// 1. Importamos herramientas de Reanimated
import Animated, {
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

// Convertimos Surface en un componente animado
const AnimatedSurface = Animated.createAnimatedComponent(Surface);

const chunkArray = (array: any[], chunkSize: number = 10) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        results.push(array.slice(i, i + chunkSize));
    }
    return results;
};

export default function LevelsScreen() {
    const [score, setScore] = useState(0);
    const router = useRouter();
    const setCurrentLevelWords = useGameStore((state) => state.setCurrentLevelWords);

    const levelsArray = useMemo(() => {
        return chunkArray(verbsIrregularsList, 10);
    }, [verbsIrregularsList]);

    useFocusEffect(
        useCallback(() => {
            const loadScore = async () => {
                const savedScore = await getData('score') ?? 0;
                setScore(savedScore);
            };
            loadScore();
        }, [])
    );

    return (
        <Container>
            <Title title='Niveles de Preposiciones' />
            <Text style={styles.headerSubtitle}>
                Total de palabras: {verbsIrregularsList.length} ({levelsArray.length} niveles en total)
            </Text>
            <ScrollView>
                <View style={styles.pathContainer}>
                    {levelsArray.map((levelWords, index) => {
                        const isUnlocked = index <= score;
                        const isCompleted = index < score;

                        const alignmentStyle =
                            index % 4 === 0 ? styles.alignCenter :
                                index % 2 === 0 ? styles.alignLeft : styles.alignRight;

                        // Estado compartido para la escala del botón al presionar
                        const scale = useSharedValue(1);

                        const animatedStyle = useAnimatedStyle(() => ({
                            transform: [{ scale: scale.value }]
                        }));

                        return (
                            <Animated.View
                                key={index}
                                style={[styles.levelWrapper, alignmentStyle]}
                                // 2. Animación de entrada escalonada (cada nivel entra un poquito después)
                                entering={FadeInDown.delay(index * 100).duration(700)}
                            >
                                <AnimatedSurface
                                    style={[
                                        styles.nodeButton,
                                        isUnlocked ? styles.unlockedNode : styles.lockedNode,
                                        animatedStyle
                                    ]}
                                    elevation={isUnlocked ? 4 : 0}
                                >
                                    <IconButton
                                        icon={
                                            isCompleted ? "check" :
                                                isUnlocked ? "star" : "lock"
                                        }
                                        iconColor={isUnlocked ? COLORS.background : "#9e9e9e"}
                                        size={28}
                                        // 3. Efecto muelle al presionar
                                        onPressIn={() => {
                                            if (isUnlocked) scale.value = withSpring(0.75);
                                        }}
                                        onPressOut={() => {
                                            if (isUnlocked) scale.value = withSpring(1);
                                        }}
                                        onPress={() => {
                                            if (isUnlocked) {
                                                setCurrentLevelWords(levelWords);
                                                router.push('/irregularverbs/Irregularverbs');
                                            }
                                        }}
                                    />
                                </AnimatedSurface>
                                <Text style={styles.levelText}>Nivel {index + 1}</Text>
                            </Animated.View>
                        );
                    })}
                </View>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 32,
        textAlign: 'center',
    },
    pathContainer: {
        width: '100%',
        maxWidth: 400,
        gap: 24,
    },
    levelWrapper: {
        alignItems: 'center',
        marginVertical: 8,
    },
    alignCenter: { alignSelf: 'center' },
    alignLeft: { alignSelf: 'flex-start', marginLeft: '20%' },
    alignRight: { alignSelf: 'flex-end', marginRight: '20%' },
    nodeButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unlockedNode: { backgroundColor: COLORS.primary },
    lockedNode: { backgroundColor: '#e0e0e0' },
    levelText: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: '600',
        color: '#555',
    },
});