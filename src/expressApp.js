const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3057;

app.use(cors());

app.get('/:fileName/:endpoint', (req, res) => {
  const { fileName, endpoint } = req.params;
  // = const fileName = req.params.fileName;

  const filePath = path.resolve(__dirname, '../data', fileName +'.json'); // Pfad zur JSON-Datei

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  } // Überprüft, ob der erstellte filePath existiert

  fs.readFile(filePath, 'utf8', (err, data) => {

    const jsonData = JSON.parse(data);

    if (!jsonData[endpoint]) {
      return res.status(404).json({ error: 'Endpoint not found in JSON file' });
    } // Überprüft, ob der angegebene Endpunkt im jeweiligen JSON existiert

    res.json(jsonData[endpoint]); // Sendet Antwort (im JSON-Format)
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Startet den Server
});
