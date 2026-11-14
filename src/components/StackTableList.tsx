import speakMessage from "@/tools/speech";
import { Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";

interface StackTableProps {
    listTitles: string[];
    listKeys: string[];
    dataList: Record<string, any>[];
}

export default function StackTableList({ listTitles, listKeys, dataList }: StackTableProps) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <View style={[
            styles.paper,
            { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }
        ]}>
            {dataList.map((row, rowIndex) => (
                <View
                    key={`row-${rowIndex}`}
                    style={[
                        styles.rowContainer,
                        { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' }
                    ]}
                >
                    {listKeys.map((key, keyIndex) => (
                        <Pressable
                            key={`StackTable-${key}-${keyIndex}`}
                            style={styles.listItem}
                            onPress={() => speakMessage(row[key])}
                        >
                            {/* Título adaptativo */}
                            <Text
                                style={[
                                    styles.listTextTitle,
                                    { color: isDarkMode ? '#bb86fc' : '#333' }
                                ]}
                            >
                                {listTitles[keyIndex]}
                            </Text>
                            {/* Valor adaptativo */}
                            <Text style={[
                                styles.listTextValue,
                                { color: isDarkMode ? '#e0e0e0' : '#030303' }
                            ]} numberOfLines={3}>
                                {row[key]}
                            </Text>
                        </Pressable>
                    ))}
                    <View style={[
                        styles.divider,
                        { backgroundColor: isDarkMode ? '#333' : '#e0e0e0' }
                    ]} />
                </View>
            ))}
        </View>
    );
}
// Mantén tus estilos originales aquí abajo
const styles = StyleSheet.create({
    paper: {
        width: '100%',
        marginTop: 8,
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    scrollContainer: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    rowContainer: {
        width: '100%',
        paddingHorizontal: 8,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    listTextTitle: {
        textAlign: 'center',
        width: '50%',
        fontWeight: 'bold',
    },
    listTextValue: {
        textAlign: 'center',
        width: '50%',
        flexWrap: 'wrap',
    },
    divider: {
        height: 1,
        marginVertical: 8,
        width: '100%',
    },
});