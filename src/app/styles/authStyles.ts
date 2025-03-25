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
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
        fontSize: 16,
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
    btnBack: {
        borderColor: '#007AFF',
        borderWidth: 1,
        padding: 16,
        borderRadius: 8,
        marginTop: 10,
      },
    btnBackText: {
        color: '#007AFF',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
        height: 48, // ✅ igual que el input
        marginBottom: 16, // para mantener separación
      }
      
});
