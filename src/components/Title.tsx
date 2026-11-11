import { COLORS } from "@/constants/colors";
import { useColorScheme } from "react-native";
import { Text } from 'react-native-paper';
export default function Title({ title }: { title: string }) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    return (<>
        <Text
            variant="titleLarge"
            style={{
                color: isDarkMode ? COLORS.background : COLORS.backgrounDark,
                textAlign: 'center'
            }}
        >
            {title}
        </Text>
    </>);
}