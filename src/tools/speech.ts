import * as Speech from "expo-speech";
export default function speakMessage(message: string) {
  Speech.speak(message, {
    language: "en-US", // Define el idioma (español)
    pitch: 1.0, // Tono de voz (1.0 es el normal)
    rate: 1.0, // Velocidad de lectura (1.0 es la normal)
    onStart: () => console.log("Comenzó a hablar"),
    onDone: () => console.log("Terminó de hablar"),
  });
}
