import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

const FaqPage = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    fetch( `${process.env.API_URL}/faqs`) // ← Cambia esto por la URL correcta de tu backend
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener las FAQs");
        return response.json();
      })
      .then((data) => {
        setFaqs(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleAnswer = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Preguntas Frecuentes</Text>

      <View style={styles.faqContainer}>
        {faqs.map((faq) => (
          <View key={faq._id} style={styles.card}>
            <TouchableOpacity
              onPress={() => toggleAnswer(faq._id)}
              style={styles.questionButton}
            >
              <Text style={styles.questionText}>{faq.question}</Text>
              <Text style={styles.toggleIcon}>
                {activeId === faq._id ? "−" : "+"}
              </Text>
            </TouchableOpacity>

            {activeId === faq._id && (
              <Text style={styles.answerText}>{faq.answer}</Text>
            )}
          </View>
        ))}
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    marginBottom: 20,
  },
  faqContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
    flex: 1,
    paddingRight: 8,
  },
  toggleIcon: {
    fontSize: 24,
    color: "#2563EB",
  },
  answerText: {
    marginTop: 10,
    color: "#374151",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default FaqPage;
