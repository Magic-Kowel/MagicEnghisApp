import Container from '@/components/Container';
import GroupButton from '@/components/GroupButton';
import StackTable from '@/components/StackTable';
import { verbsIrregularsList } from '@/db/verbsIrregularsList';
import { useEffect, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { TextInput } from 'react-native-paper';
export default function LearnIrregularVerbs() {
    const [search, setSearch] = useState("");
    const [listFilter, setListFilter] = useState(verbsIrregularsList);
    const [levelLearn, setLevelLearn] = useState("All");
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    useEffect(() => {
        const result = verbsIrregularsList.filter((item) => {
            const matchesSearch =
                item.infinitive.toLowerCase().includes(search.toLowerCase()) ||
                item.participle.toLowerCase().includes(search.toLowerCase()) ||
                item.past.toLowerCase().includes(search.toLowerCase()) ||
                item.translation.toLowerCase().includes(search.toLowerCase());

            const matchesLevel =
                levelLearn === "All" ||
                item.difficulty.toLowerCase() === levelLearn.toLowerCase();

            return matchesSearch && matchesLevel;
        });

        setListFilter(result.length === 0 && search === "" ? verbsIrregularsList : result);
    }, [search, levelLearn]);

    return (
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

            {/* Botones de Filtro por Nivel */}
            <GroupButton
                value={levelLearn}
                setValue={setLevelLearn}
                list={
                    [
                        { value: 'All', label: 'Todos' },
                        { value: 'Easy', label: 'Fácil' },
                        { value: 'Medium', label: 'Medio' },
                        { value: 'Hard', label: 'Difícil' },
                    ]
                }
            />
            {/* Tabla con FlatList propia */}
            <View style={styles.tableContainer}>
                <StackTable
                    listTitles={[
                        "Traducción",
                        "Infinitive",
                        "Past",
                        "Participle",
                    ]}
                    listKeys={[
                        "translation",
                        "infinitive",
                        "past",
                        "participle",
                    ]}
                    dataList={listFilter}
                />
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, // Ocupa toda la pantalla y permite que la FlatList interna maneje el scroll
        backgroundColor: '#f5f5f5',
    },
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
        paddingBottom: 0,
    }
});