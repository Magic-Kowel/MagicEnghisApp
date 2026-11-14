import { Stack } from 'expo-router';

export default function PhrasalVerbsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LevelsScreen" />
            <Stack.Screen name="PhrasalVerbs" />
        </Stack>
    );
}