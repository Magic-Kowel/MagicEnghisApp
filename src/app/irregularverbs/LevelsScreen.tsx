import ListLeves from '@/components/ListLeves';
import Title from '@/components/Title';
import { LIS_KEYS_VERBS_IRREGULARS, LIS_TTITLES_VERBS_IRREGULARS, scoreIrregularVerbsSelect } from '@/constants/constants';
import { verbsIrregularsList } from '@/db/verbsIrregularsList';
import { useGameStore } from '@/store/useGameStore';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
export default function LevelsScreen() {
    const setIrregularVerbs = useGameStore((state) => state.setIrregularVerbs);
    const setScoreglobal = useGameStore((state) => state.setScore);
    const setListTitles = useGameStore((state) => state.setListTitles);
    const setListKeys = useGameStore((state) => state.setListKeys);
    useFocusEffect(
        useCallback(() => {
            setListTitles(LIS_TTITLES_VERBS_IRREGULARS);
            setListKeys(LIS_KEYS_VERBS_IRREGULARS);
        }, [])
    )
    return (
        <>
            <Title title='Niveles de Preposiciones' />
            <ListLeves
                list={verbsIrregularsList}
                namescore={scoreIrregularVerbsSelect}
                path="/irregularverbs/Irregularverbs"
                setScoreGlobal={setScoreglobal}
                setLevelsArray={setIrregularVerbs}
            />
        </>
    );
}