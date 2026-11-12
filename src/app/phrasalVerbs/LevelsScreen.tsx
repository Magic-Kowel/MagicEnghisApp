import Container from '@/components/Container';
import ListLeves from '@/components/ListLeves';
import Title from '@/components/Title';
import { phrasalVerbsList } from '@/db/phrasalVerbsList';
import { useGameStore } from '@/store/useGameStore';
export default function LevelsScreen() {
    const setPhrasalVerbs = useGameStore((state) => state.setPhrasalVerb);
    const setScoreglobal = useGameStore((state) => state.setScore);
    return (<>
        <Container>
            <Title title='Niveles de Preposiciones' />
            <ListLeves
                list={phrasalVerbsList}
                namescore="scorePhrasa"
                path="/phrasalVerbs/PhrasalVerbs"
                setScoreGlobal={setScoreglobal}
                setLevelsArray={setPhrasalVerbs}
            />
        </Container>
    </>);
}