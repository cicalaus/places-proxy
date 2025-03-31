const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

app.post("/places:searchText", async (req, res) => {
  try {
    const apikey = req.header("X-Goog-Api-Key");
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.id",
        "X-Goog-Api-Key": apikey
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Errore proxy:", error);
    res.status(500).json({ error: "Errore del proxy" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy attivo sulla porta ${port}`);
});
