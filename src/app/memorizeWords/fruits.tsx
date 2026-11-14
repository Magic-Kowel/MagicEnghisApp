import Container from "@/components/Container";
import LearnButton from "@/components/LearnButton";
import { fruitsList } from "@/db/fruitsList";
import { useState } from "react";
import LearnWords from "./LearnWords";
import MemorizeWords from "./MemorizeWords";
export default function FamilyMembers() {
    const [isLearn, setIsLearn] = useState(false);
    return (<Container>
        <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
        {isLearn ? (
            <MemorizeWords list={fruitsList} />
        ) : (
            <LearnWords list={fruitsList} />
        )}
    </Container>);
}