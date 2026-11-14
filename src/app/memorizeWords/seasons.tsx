import Container from "@/components/Container";
import LearnButton from "@/components/LearnButton";
import { seasonsList } from "@/db/seasonsList";
import { useState } from "react";
import LearnWords from "./LearnWords";
import MemorizeWords from "./MemorizeWords";
export default function FamilyMembers() {
    const [isLearn, setIsLearn] = useState(false);
    return (<Container>
        <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
        {isLearn ? (
            <MemorizeWords list={seasonsList} />
        ) : (
            <LearnWords list={seasonsList} />
        )}
    </Container>);
}
