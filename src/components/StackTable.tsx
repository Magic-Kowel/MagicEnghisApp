import { useCallback } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    useColorScheme
} from 'react-native';

interface StackTableProps {
    listTitles: string[];
    listKeys: string[];
    dataList: Record<string, any>[];
}

export default function StackTable({ listTitles, listKeys, dataList }: StackTableProps) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    // 1. Añadimos isDarkMode a las dependencias del useCallback
    const renderItem = useCallback(({ item: row }: { item: Record<string, any> }) => {
        return (
            <View style={[
                styles.rowContainer,
                { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' } // Fondo de fila adaptativo
            ]}>
                {listKeys.map((key, keyIndex) => (
                    <View key={`StackTable-${key}-${keyIndex}`} style={styles.listItem}>
                        {/* Título adaptativo */}
                        <Text style={[
                            styles.listTextTitle,
                            { color: isDarkMode ? '#bb86fc' : '#333' }
                        ]}>
                            {listTitles[keyIndex]}
                        </Text>
                        {/* Valor adaptativo */}
                        <Text style={[
                            styles.listTextValue,
                            { color: isDarkMode ? '#e0e0e0' : '#030303' }
                        ]} numberOfLines={3}>
                            {row[key]}
                        </Text>
                    </View>
                ))}
                <View style={[
                    styles.divider,
                    { backgroundColor: isDarkMode ? '#333' : '#e0e0e0' }
                ]} />
            </View>
        );
    }, [listKeys, listTitles, isDarkMode]); // 👈 AQUÍ ESTABA EL SECRETO

    return (
        <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(_, index) => `row-${index}`}
            style={[
                styles.paper,
                { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }
            ]}
            contentContainerStyle={styles.scrollContainer}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
            removeClippedSubviews={true}
        />
    );
}

const styles = StyleSheet.create({
    paper: {
        width: '100%',
        maxHeight: '85%',
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
        paddingVertical: 8,
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