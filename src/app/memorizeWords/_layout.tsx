import { Stack } from 'expo-router';
export default function PhrasalVerbsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="daysWeeks" />
            <Stack.Screen name="familyMembers" />
            <Stack.Screen name="fruits" />
            <Stack.Screen name="months" />
            <Stack.Screen name="seasons" />
        </Stack>
    );
}