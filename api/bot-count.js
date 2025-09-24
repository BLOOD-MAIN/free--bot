import { MongoClient } from "mongodb";

const uri = "mongodb+srv://sachi:99999978666@cluster0.g0op9im.mongodb.net/blood-xmd?retryWrites=true&w=majority";
let cachedClient = null;

export default async function handler(req, res) {
  try {
    let client;
    if (cachedClient) {
      client = cachedClient;
    } else {
      client = new MongoClient(uri);
      await client.connect();
      cachedClient = client;
    }

    const db = client.db("blood-xmd");
    const bots = db.collection("bots");

    const count = await bots.countDocuments({ status: "active" });

    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
