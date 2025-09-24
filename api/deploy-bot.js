import { MongoClient } from "mongodb";

const uri = "mongodb+srv://sachi:99999978666@cluster0.g0op9im.mongodb.net/blood-xmd?retryWrites=true&w=majority";
let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const { botName } = req.body;
    if (!botName) return res.status(400).json({ error: "Bot name required" });

    const client = await clientPromise;
    const db = client.db("blood-xmd");
    const bots = db.collection("bots");

    // Update or insert bot as active
    await bots.updateOne(
      { name: botName },
      { $set: { name: botName, status: "active" } },
      { upsert: true }
    );

    res.status(200).json({ message: `${botName} deployed` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
