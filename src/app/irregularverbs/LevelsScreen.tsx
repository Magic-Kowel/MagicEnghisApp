import Container from '@/components/Container';
import ListLeves from '@/components/ListLeves';
import Title from '@/components/Title';
import { verbsIrregularsList } from '@/db/verbsIrregularsList';
import { useGameStore } from '@/store/useGameStore';
export default function LevelsScreen() {
    const setIrregularVerbs = useGameStore((state) => state.setIrregularVerbs);
    const setScoreglobal = useGameStore((state) => state.setScore);
    return (
        <Container>
            <Title title='Niveles de Preposiciones' />
            <ListLeves
                list={verbsIrregularsList}
                namescore="score"
                path="/irregularverbs/Irregularverbs"
                setScoreGlobal={setScoreglobal}
                setLevelsArray={setIrregularVerbs}
            />
        </Container>
    );
}