import LearnButton from "@/components/LearnButton";
import { familyMembersList } from "@/db/familyMembersList";
import { useState } from "react";
import LearnWords from "./LearnWords";
import MemorizeWords from "./MemorizeWords";
export default function FamilyMembers() {
    const [isLearn, setIsLearn] = useState(false);
    return (<>
        <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />

        {isLearn ? (
            <MemorizeWords list={familyMembersList} />
        ) : (
            <LearnWords list={familyMembersList} />
        )}
    </>);
}
