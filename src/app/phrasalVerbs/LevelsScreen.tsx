import Container from '@/components/Container';
import LearnButton from '@/components/LearnButton';
import ListLeves from '@/components/ListLeves';
import Title from '@/components/Title';
import { LIS_KEYS_VERBS_PHRASAL, LIS_TTITLES_VERBS_PHRASAL, scorePhrasalVerbsSelect } from '@/constants/constants';
import { phrasalVerbsList } from '@/db/phrasalVerbsList';
import { useGameStore } from '@/store/useGameStore';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react";
import LearnWords from '../memorizeWords/LearnWords';
export default function LevelsScreen() {
    const [isLearn, setIsLearn] = useState(false);
    const setPhrasalVerbs = useGameStore((state) => state.setPhrasalVerb);
    const setScoreglobal = useGameStore((state) => state.setScore);
    const setPathBack = useGameStore((state) => state.setPathBack);
    const setListTitles = useGameStore((state) => state.setListTitles);
    const setListKeys = useGameStore((state) => state.setListKeys);
    useFocusEffect(
        useCallback(() => {
            setListTitles(LIS_TTITLES_VERBS_PHRASAL);
            setListKeys(LIS_KEYS_VERBS_PHRASAL);
            setPathBack("phrasalVerbs/LevelsScreen");
        }, [])
    );
    return (<>
        <Container>
            <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
            {isLearn ? (
                <LearnWords list={phrasalVerbsList} />
            ) : (
                <>
                    <Title title='Niveles de Preposiciones' />
                    <ListLeves
                        list={phrasalVerbsList}
                        namescore={scorePhrasalVerbsSelect}
                        path="/phrasalVerbs/PhrasalVerbs"
                        setScoreGlobal={setScoreglobal}
                        setLevelsArray={setPhrasalVerbs}
                    />
                </>
            )}
        </Container>
    </>);
}