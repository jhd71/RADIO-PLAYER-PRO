export default async function handler(req, res) {
  try {
    await fetch("https://ylkypleeljhvearzkllk.supabase.co/rest/v1/", {
      method: "GET"
    });

    res.status(200).json({ message: "Ping sent to Supabase" });
  } catch (e) {
    res.status(500).json({ error: "Ping failed" });
  }
}