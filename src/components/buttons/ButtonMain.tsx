import { COLORS } from "@/constants/colors";
import { useRef } from "react";
import { Animated } from "react-native";
import { Button } from "react-native-paper";

interface ButtonMainType {
    text: string;
    handle: () => void;
    full?: boolean
}

export default function ButtonMain({ text, handle, full = false }: ButtonMainType) {
    // 1. Creamos una referencia animada inicializada en 1 (tamaño normal)
    const scaleValue = useRef(new Animated.Value(1)).current;

    // 2. Función cuando se presiona el botón (se hace un poco má pequeño)
    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95, // Se reduce al 95%
            useNativeDriver: true,
        }).start();
    };

    // 3. Función cuando se suelta el botón (vuelve a su tamaño original con rebote)
    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1, // Regresa a 100%
            friction: 3, // Controla el rebote (menor número = más rebote)
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{
            flex: full ? 1 : 0,
            transform: [{ scale: scaleValue }]
        }}>
            <Button
                mode="contained"
                textColor={COLORS.background}
                buttonColor={COLORS.primary}
                onPress={handle}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                {text}
            </Button>
        </Animated.View>
    );
}