import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#007BFF",
        marginBottom: 20,
    },
    input: {
        width: "90%",
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#CCC",
        backgroundColor: "#FFF",
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: "90%",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    link: {
        fontSize: 14,
        color: "#007BFF",
        marginTop: 10,
    },
});
