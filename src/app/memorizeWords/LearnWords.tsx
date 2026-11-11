import Container from "@/components/Container";
import StackTable from "@/components/StackTable";
import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { TextInput } from "react-native-paper";
interface WordItem {
    english: string;
    spanish: string;
}
interface MemorizeWordsProps {
    list: WordItem[];
}
export default function LearnWords({ list }: MemorizeWordsProps) {
    const [search, setSearch] = useState("");
    const [listFilter, setListFilter] = useState(list);

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    useEffect(() => {
        const result = list.filter((item) => {
            const matchesSearch =
                item.english.toLowerCase().includes(search.toLowerCase()) ||
                item.spanish.toLowerCase().includes(search.toLowerCase())
            return matchesSearch;
        });

        setListFilter(result.length === 0 && search === "" ? list : result);
    }, [search]);
    return (
        <>
            <Container>
                {/* Input de Búsqueda */}
                <View style={styles.containerInput}>
                    <TextInput
                        label="Buscar verbo o traducción..."
                        mode="outlined"
                        value={search}
                        onChangeText={(newText) => setSearch(newText)}
                        right={<TextInput.Icon icon="table-search" />}
                    />
                </View>
                {/* Tabla con FlatList propia */}
                <View style={styles.tableContainer}>
                    <StackTable
                        listTitles={["English", "Spanish"]}
                        listKeys={["english", "spanish"]}
                        dataList={listFilter}
                    />
                </View>
            </Container>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
        alignItems: 'center',
    },
    containerInput: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    containerFilter: {
        paddingHorizontal: 20,
        paddingBottom: 8,
        alignItems: 'center',
    },
    segmentedButton: {
        width: '100%',
    },
    textoCentrado: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 0,
    }
});