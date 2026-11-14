import SelectedWordsLevel from "@/components/SelectedWordsLevel";
import { useGameStore } from "@/store/useGameStore";

export default function PhrasalVerbs() {
    const list = useGameStore((state) => state.phrasalVerbs);
    const pathBack = useGameStore((state) => state.pathBack);
    return (<>
        <SelectedWordsLevel
            list={list}
            namescore="scorePhrasalVerbsSelect"
            pathBack={pathBack}
        />
    </>);
}