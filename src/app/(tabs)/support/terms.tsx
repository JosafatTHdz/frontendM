import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

interface Term {
  _id: string;
  title: string;
  description: string;
}

const TerminosCondiciones: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/terms`); // ← Cambia esto por la URL real
        if (!res.ok) throw new Error("Error al obtener términos");
        const data = await res.json();
        const sorted = data.sort((a: Term, b: Term) =>
          a.title.localeCompare(b.title)
        );
        setTerms(sorted);
      } catch (error) {
        console.error("Error obteniendo términos:", error);
      }
    };

    fetchTerms();
  }, []);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Términos y Condiciones</Text>

        <Text style={styles.introText}>
          Bienvenido a los Términos y Condiciones de Baby Dreams. Estos
          términos describen las reglas y regulaciones para el uso de nuestro
          sitio web y servicios. Al acceder y navegar en nuestro sitio, aceptas
          cumplir con todos los términos establecidos aquí.
        </Text>

        {terms.map((term) => (
          <View key={term._id} style={styles.termItem}>
            <TouchableOpacity
              onPress={() => handleToggle(term._id)}
              style={styles.termHeader}
            >
              <Text style={styles.termTitle}>{term.title}</Text>
              <Text style={styles.toggleIcon}>
                {activeId === term._id ? "−" : "+"}
              </Text>
            </TouchableOpacity>

            {activeId === term._id && (
              <Text style={styles.termDescription}>{term.description}</Text>
            )}
          </View>
        ))}

        <Text style={styles.contactTitle}>Contacto</Text>
        <Text style={styles.contactText}>
          Si tienes preguntas o inquietudes acerca de estos Términos y
          Condiciones, puedes contactarnos en{" "}
          <Text style={styles.contactEmail}>contacto@ejemplo.com</Text>.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6", // gris claro
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#2563EB", // primary
    marginBottom: 16,
  },
  introText: {
    fontSize: 14,
    color: "#4B5563", // gray-600
    textAlign: "justify",
    marginBottom: 20,
    lineHeight: 22,
  },
  termItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB", // gray-200
    paddingBottom: 12,
    marginBottom: 12,
  },
  termHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  termTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937", // gray-800
    flex: 1,
    paddingRight: 8,
  },
  toggleIcon: {
    fontSize: 22,
    color: "#2563EB", // primary
  },
  termDescription: {
    marginTop: 8,
    color: "#4B5563", // gray-600
    fontSize: 14,
    lineHeight: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 20,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  contactEmail: {
    fontWeight: "bold",
    color: "#2563EB",
  },
});

export default TerminosCondiciones;
