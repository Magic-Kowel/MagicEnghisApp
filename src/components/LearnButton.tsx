import { COLORS } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
interface LearnButtonType {
    isLearn: boolean;
    setIsLearn: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LearnButton({ isLearn, setIsLearn }: LearnButtonType) {
    return (<>
        <View style={[styles.containerButton]}>
            <Button
                mode="contained"
                icon="dumbbell"
                style={styles.button}
                textColor={COLORS.background}
                buttonColor={isLearn ? COLORS.secundary : COLORS.primary}
                onPress={() => setIsLearn(!isLearn)}
            >
                Entrenar
            </Button>
        </View>
    </>)
}
const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        color: COLORS.primary
    },
    containerButton: {
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
});