// Dependencies
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure & Run the http server
const app = express();

app.use(express.static(__dirname, { dotfiles: 'allow' } ));
console.log(__dirname)

app.listen(80, () => {
  console.log('HTTP server running on port 80');
});