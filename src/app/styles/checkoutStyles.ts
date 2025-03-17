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
        fontSize: 24,
        fontWeight: "bold",
        color: "#007BFF",
        marginBottom: 20,
    },
    authBox: {
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        width: "90%",
    },
    purchaseBox: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        width: "90%",
    },
    message: {
        fontSize: 16,
        color: "#6C757D",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    secondaryButton: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#007BFF",
    },
    secondaryButtonText: {
        color: "#007BFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
