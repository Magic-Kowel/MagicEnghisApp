import StackTable from "@/components/StackTable";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
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
            <View style={styles.containerInput}>
                <Searchbar
                    placeholder="Buscar verbo o traducción..."
                    onChangeText={setSearch}
                    value={search}
                />
            </View>
            <View style={styles.tableContainer}>
                <StackTable
                    listTitles={["English", "Spanish"]}
                    listKeys={["english", "spanish"]}
                    dataList={listFilter}
                />
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    containerInput: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    tableContainer: {
        flex: 1,
        paddingBottom: 0,
    }
});