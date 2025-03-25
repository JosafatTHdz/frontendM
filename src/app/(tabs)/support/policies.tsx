import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"

type Policy = {
  _id: string
  title: string
  description: string
}

const PoliticasPrivacidad: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch(`${process.env.API_URL}/policies`)
        if (!res.ok) throw new Error("Error al obtener políticas")
        const data = await res.json()
        const sorted = data.sort((a: Policy, b: Policy) =>
          a.title.localeCompare(b.title)
        )
        setPolicies(sorted)
      } catch (err) {
        console.error("Error al obtener políticas:", err)
      }
    };

    fetchPolicies();
  }, []);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Políticas de Privacidad</Text>

        <Text style={styles.introText}>
          Bienvenido a nuestras Políticas de Privacidad. Aquí explicamos cómo
          recopilamos, utilizamos y protegemos tu información personal.
        </Text>

        {policies.map((policy) => (
          <View key={policy._id} style={styles.item}>
            <TouchableOpacity
              onPress={() => handleToggle(policy._id)}
              style={styles.itemHeader}
            >
              <Text style={styles.itemTitle}>{policy.title}</Text>
              <Text style={styles.toggleIcon}>
                {activeId === policy._id ? "−" : "+"}
              </Text>
            </TouchableOpacity>

            {activeId === policy._id && (
              <Text style={styles.itemDescription}>{policy.description}</Text>
            )}
          </View>
        ))}

        <Text style={styles.contactTitle}>Contacto</Text>
        <Text style={styles.contactText}>
          Si tienes preguntas o inquietudes sobre esta política de privacidad,
          puedes contactarnos en{" "}
          <Text style={styles.contactEmail}>babydreams@gmail.com</Text>.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
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
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 12,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    flex: 1,
    paddingRight: 8,
  },
  toggleIcon: {
    fontSize: 22,
    color: "#2563EB",
  },
  itemDescription: {
    marginTop: 8,
    color: "#4B5563",
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

export default PoliticasPrivacidad;
