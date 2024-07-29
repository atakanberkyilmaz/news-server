const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors'); // CORS paketini içe aktarın
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // CORS'u etkinleştirin

app.get('/news', async (req, res) => {
  try {
    const response = await axios.get('https://www.theconstructionindex.co.uk/feeds/news.xml');
    const data = await xml2js.parseStringPromise(response.data, { mergeAttrs: true });
    const items = data.rss.channel[0].item;

    res.json(items.map(item => ({
      title: item.title[0],
      description: item.description[0],
      link: item.link[0]
    })));
  } catch (error) {
    res.status(500).json({ error: 'Haberler çekilemedi' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
