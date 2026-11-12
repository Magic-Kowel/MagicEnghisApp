import { prepositionsPlaceList } from '@/db/prepositionsPlaceList';
import SelectedWords from './selectedWords/SelectedWords';
export default function PrepositionsPlace() {
    return (
        <>
            <SelectedWords list={prepositionsPlaceList} />
        </>
    );
}