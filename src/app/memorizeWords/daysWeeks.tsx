import LearnButton from "@/components/LearnButton";
import { daysWeeksList } from "@/db/daysWeeksList";
import { useState } from "react";
import LearnWords from "./LearnWords";
import MemorizeWords from "./MemorizeWords";
import Container from "@/components/Container";
export default function FamilyMembers() {
    const [isLearn, setIsLearn] = useState(false);
    return (<Container>
        <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
        {isLearn ? (
            <MemorizeWords list={daysWeeksList} />
        ) : (
            <LearnWords list={daysWeeksList} />
        )}
    </Container>);
}
