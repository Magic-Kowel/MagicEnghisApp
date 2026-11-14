import { COLORS } from "@/constants/colors";
import { IrregularItem, WordItem } from "@/types/listTypes";
import { ScrollView, useColorScheme, View } from "react-native";
import { IconButton, Modal } from "react-native-paper";
import ButtonMain from "../buttons/ButtonMain";
import CustomAccordion from "../CustomAccordion";
import StackTableList from "../StackTableList";
interface ModalSelectedLevelType {
    listLevel: IrregularItem[] | WordItem[],
    visible: boolean,
    setVisible: (visible: boolean) => void,
    handleStart: () => void
    listTitles: string[],
    listKeys: string[],
}
export default function ModalSelectedLevel({
    listLevel,
    visible,
    setVisible,
    handleStart,
    listTitles,
    listKeys,
}: ModalSelectedLevelType) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    return (<>
        <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            aria-label="Example modal"
            contentContainerStyle={{
                backgroundColor: isDarkMode ? COLORS.backgrounDark : COLORS.background, // Nota: Corregido "backgrounDark" por "backgroundDark"
                padding: 20,
                marginHorizontal: 20,
                borderRadius: 20,
                maxHeight: '80%',
                flexShrink: 1,
            }}
        >
            <View style={{ flexShrink: 1, flexDirection: 'column', gap: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: -10 }}>
                    <IconButton
                        icon="close"
                        iconColor={isDarkMode ? COLORS.background : COLORS.backgrounDark}
                        size={24}
                        onPress={() => setVisible(false)}
                        style={{ margin: 0 }}
                    />
                </View>
                <ButtonMain
                    text='Empezar'
                    handle={handleStart}
                />
                <ScrollView
                    contentContainerStyle={{ gap: 15, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    style={{ flexShrink: 1 }}
                >
                    <CustomAccordion
                        title="Memorize Words"
                        subtitle=""
                        icon="brain"
                        defaultOpen={false}
                    >
                        <StackTableList
                            listTitles={listTitles}
                            listKeys={listKeys}
                            dataList={listLevel}
                        />
                    </CustomAccordion>
                </ScrollView>
            </View>
        </Modal>
    </>)
}