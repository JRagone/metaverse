var express = require('express');
var router = express.Router();
const base64Img = require('base64-img');
const { join } = require('path');
const Jimp = require('jimp');

const itemDir = join('/app', 'public', 'items');

/* GET users listing. */
router.post('/', async function(req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*"
  });
  const reqBody = await req.body;
  console.log(reqBody);
  const { item, itemUrl, targetType, username } = reqBody;
  // Request item
  console.log(itemUrl);
  const itemRes = await fetch(`${itemUrl}/${username}`);
  const body = await itemRes.json();
  // Convert
  const origItemPath = base64Img.imgSync(body, itemDir, `${item}`);
  const itemPath = join(itemDir, `${item}.${targetType}`);
  let avatar;
  try {
    avatar = await Jimp.read(origItemPath);
    await avatar.writeAsync(itemPath);
  } catch (err) {
    console.error(err);
  }
  // Send item back
  const avatarData = base64Img.base64Sync(itemPath);
  res.send({data: avatarData});
});

module.exports = router;
