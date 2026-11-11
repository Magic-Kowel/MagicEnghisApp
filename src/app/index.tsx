
import LearnButton from '@/components/LearnButton';
import { useState, } from 'react';
import LearnIrregularVerbs from './irregularverbs/LearnIrregularVerbs';
import LevelsScreen from './irregularverbs/LevelsScreen';
export default function HomeScreen() {
  const [isLearn, setIsLearn] = useState(false);
  return (<>
    <LearnButton isLearn={isLearn} setIsLearn={setIsLearn} />
    {isLearn ? (
      <LearnIrregularVerbs />
    ) : (
      <LevelsScreen />
    )}
  </>
  );
}