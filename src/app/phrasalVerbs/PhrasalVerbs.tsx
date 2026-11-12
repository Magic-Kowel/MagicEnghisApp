import { useGameStore } from "@/store/useGameStore";
import SelectedWords from "../selectedWords/SelectedWords";

export default function PhrasalVerbs() {
    const list = useGameStore((state) => state.phrasalVerbs);
    return (<>
        <SelectedWords list={list} />
    </>);
}