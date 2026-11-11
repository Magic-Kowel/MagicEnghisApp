import LearnButton from "@/components/LearnButton";
import { seasonsList } from "@/db/seasonsList";
import { useState } from "react";
import { StyleSheet } from "react-native";
import LearnWords from "./LearnWords";
import MemorizeWords from "./MemorizeWords";
export default function FamilyMembers() {
    const [isLearn, setIsLearn] = useState(false);
    return (<>
        <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
        {isLearn ? (
            <MemorizeWords list={seasonsList} />
        ) : (
            <LearnWords list={seasonsList} />
        )}
    </>);
}
const styles = StyleSheet.create({
    containerButton: {
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
});