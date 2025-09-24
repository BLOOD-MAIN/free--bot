import { MongoClient } from "mongodb";

const uri = "mongodb+srv://sachi:99999978666@cluster0.g0op9im.mongodb.net/blood-xmd?retryWrites=true&w=majority";

let cachedClient = null;

export default async function handler(req, res) {
  try {
    // Reuse MongoClient if already connected
    let client;
    if (cachedClient) {
      client = cachedClient;
    } else {
      client = new MongoClient(uri);
      await client.connect();
      cachedClient = client;
    }

    const db = client.db("blood-xmd");
    const botsCollection = db.collection("bots");

    const activeCount = await botsCollection.countDocuments({ status: "active" });

    res.status(200).json({ count: activeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}