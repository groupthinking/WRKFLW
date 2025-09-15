import express from "express";
import cors from "cors";
import { DateTime } from "luxon";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DEFAULT_ZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Australia/Sydney"
];

app.get("/api/timezones", (_req, res) => {
  res.json({ timezones: DEFAULT_ZONES });
});

app.post("/api/time", (req, res) => {
  const zones: string[] = Array.isArray(req.body?.timezones) ? req.body.timezones : DEFAULT_ZONES;
  try {
    const times = zones.map((zone) => {
      const dt = DateTime.now().setZone(zone);
      return {
        timezone: zone,
        iso: dt.toISO(),
        formatted: dt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)
      };
    });
    res.json({ times });
  } catch (err) {
    res.status(400).json({ error: "Invalid timezone(s) provided", details: String(err) });
  }
});

app.get("/api/health", (_req, res) => res.json({ status: "ok", now: new Date().toISOString() }));

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});