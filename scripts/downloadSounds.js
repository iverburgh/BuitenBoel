const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const sounds = {
  'pop.mp3': 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  'boing.mp3': 'https://assets.mixkit.co/active_storage/sfx/2540/2540-preview.mp3',
  'zing.mp3': 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
  'whoosh.mp3': 'https://assets.mixkit.co/active_storage/sfx/2530/2530-preview.mp3',
  'bell.mp3': 'https://assets.mixkit.co/active_storage/sfx/2507/2507-preview.mp3',
};

const soundsDir = path.join(__dirname, '../public/sounds');

if (!fs.existsSync(soundsDir)){
  fs.mkdirSync(soundsDir, { recursive: true });
}

Object.entries(sounds).forEach(([filename, url]) => {
  fetch(url)
    .then(res => res.buffer())
    .then(buffer => {
      fs.writeFileSync(path.join(soundsDir, filename), buffer);
      console.log(`Downloaded ${filename}`);
    })
    .catch(err => console.error(`Error downloading ${filename}:`, err));
}); 