import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const DEFAULT_ZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Asia/Tokyo"
];

function formatForZone(date, zone) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: false
    }).format(date);
  } catch (e) {
    return "Invalid Timezone";
  }
}

export default function App() {
  const [now, setNow] = useState(new Date());
  const [zones, setZones] = useState(DEFAULT_ZONES);
  const [newZone, setNewZone] = useState("");

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const addZone = () => {
    const z = newZone.trim();
    if (!z) return;
    if (!zones.includes(z)) setZones((s) => [...s, z]);
    setNewZone("");
  };

  const removeZone = (zone) => setZones((s) => s.filter((z) => z !== zone));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ConstructionOnline — Time Zones</Text>
      <Text style={styles.subtitle}>Local: {now.toLocaleString()}</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add IANA timezone e.g. Europe/Paris"
          value={newZone}
          onChangeText={setNewZone}
          style={styles.input}
        />
        <Button title="Add" onPress={addZone} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {zones.map((zone) => (
          <View key={zone} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.zone}>{zone}</Text>
              <TouchableOpacity onPress={() => removeZone(zone)}>
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.time}>{formatForZone(now, zone)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 4 },
  subtitle: { marginBottom: 12, color: "#444" },
  inputRow: { flexDirection: "row", marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", padding: 8, marginRight: 8, borderRadius: 6 },
  list: { paddingBottom: 24 },
  card: { padding: 12, borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginBottom: 10 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  zone: { fontWeight: "600" },
  remove: { color: "#c00" },
  time: { marginTop: 8, fontSize: 18 }
});