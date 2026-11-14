import { COLORS } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
// 1. Importamos el tipo oficial de los botones de React Native Paper
import { SegmentedButtonsProps } from 'react-native-paper';

interface GroupButtonType {
    value: string;
    setValue: (value: string) => void;
    list: SegmentedButtonsProps['buttons'];
}

export default function GroupButton({ value, setValue, list }: GroupButtonType) {
    return (
        <View style={styles.containerFilter}>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={list}
                style={styles.segmentedButton}
                theme={{
                    colors: {
                        secondaryContainer: COLORS.primary,
                        onSecondaryContainer: '#ffffff',
                        outline: COLORS.primary,
                    },
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    segmentedButton: {
        width: '100%',
    },
    containerFilter: {
        paddingBottom: 8,
        alignItems: 'center'
    },
});