import React, { useEffect, useState } from "react";

const DEFAULT_ZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Australia/Sydney"
];

function formatForZone(date: Date, zone: string) {
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
  const [now, setNow] = useState<Date>(new Date());
  const [zones, setZones] = useState<string[]>(DEFAULT_ZONES);
  const [newZone, setNewZone] = useState<string>("");

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const addZone = () => {
    const z = newZone.trim();
    if (!z) return;
    if (!zones.includes(z)) setZones([...zones, z]);
    setNewZone("");
  };

  const removeZone = (zone: string) => {
    setZones(zones.filter((z) => z !== zone));
  };

  return (
    <div style={{ fontFamily: "system-ui, Arial, sans-serif", padding: 24 }}>
      <h1>ConstructionOnline – Multi Timezone Clock (Demo)</h1>
      <p>Current local time: {now.toLocaleString()}</p>

      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Add IANA timezone (e.g. Asia/Kolkata)"
          value={newZone}
          onChange={(e) => setNewZone(e.target.value)}
          style={{ padding: 8, width: 320, marginRight: 8 }}
        />
        <button onClick={addZone} style={{ padding: "8px 12px" }}>
          Add Zone
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
        {zones.map((zone) => (
          <div key={zone} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <strong>{zone}</strong>
              <button onClick={() => removeZone(zone)} style={{ background: "transparent", border: "none", color: "#c00", cursor: "pointer" }}>
                Remove
              </button>
            </div>
            <div style={{ fontSize: 20, marginTop: 8 }}>{formatForZone(now, zone)}</div>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: 24, color: "#666" }}>
        Tip: Use IANA timezone names like "America/Chicago", "Europe/Paris", "Asia/Kolkata".
      </footer>
    </div>
  );
}