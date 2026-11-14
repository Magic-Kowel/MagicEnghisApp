import { COLORS } from "@/constants/colors";
import { useGameStore } from "@/store/useGameStore";
import { getData } from "@/tools/storage";
import { IrregularItem } from "@/types/listTypes";
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IconButton, Surface } from 'react-native-paper';
import Animated, {
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import ModalSelectedLevel from "./modal/ModalSelectedLevel";
const AnimatedSurface = Animated.createAnimatedComponent(Surface);
const chunkArray = <T extends Record<string, any>>(array: T[], chunkSize: number = 10) => {
    const results: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        results.push(array.slice(i, i + chunkSize));
    }
    return results;
};
interface ListLevesType<T = any> {
    path: string;
    namescore: string;
    list: T[];
    setScoreGlobal: (score: number) => void;
    setLevelsArray: (words: T[]) => void,
}
export default function ListLeves({
    list,
    path,
    setScoreGlobal,
    setLevelsArray,
    namescore
}: ListLevesType) {
    const router = useRouter();
    const [score, setScore] = useState(0);
    const [visible, setVisible] = useState(false);
    const [listLevel, setListLevel] = useState<IrregularItem[]>([]);
    const listKeys = useGameStore((state) => state.listKeys);
    const listTitles = useGameStore((state) => state.listTitles);
    const levelsArray = useMemo(() => {
        return chunkArray(list, 10);
    }, [list]);
    useFocusEffect(
        useCallback(() => {
            const loadScore = async () => {
                const savedScore = await getData(namescore) ?? 0;
                setScore(savedScore);
            };
            loadScore();
        }, [])
    );
    const handleStart = () => {
        setVisible(false);
        router.push(path as any);
    }
    return (<>
        <Text style={styles.headerSubtitle}>
            Total de palabras: {list.length} ({levelsArray.length} niveles en total)
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
                                            setLevelsArray(levelWords);
                                            setScoreGlobal(index);
                                            setVisible(true)
                                            setListLevel(levelWords);
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
        <ModalSelectedLevel
            listLevel={listLevel}
            visible={visible}
            setVisible={setVisible}
            handleStart={handleStart}
            listTitles={listTitles}
            listKeys={listKeys}
        />
    </>);
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