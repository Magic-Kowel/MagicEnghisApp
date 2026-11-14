import LearnButton from "@/components/LearnButton";
import { monthsList } from "@/db/monthsList";
import { useState } from "react";
import LearnWords from "./LearnWords";
import MemorizeWords from "./MemorizeWords";
import Container from "@/components/Container";
export default function FamilyMembers() {
    const [isLearn, setIsLearn] = useState(false);
    return (<Container>
        <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
        {isLearn ? (
            <MemorizeWords list={monthsList} />
        ) : (
            <LearnWords list={monthsList} />
        )}
    </Container>);
}