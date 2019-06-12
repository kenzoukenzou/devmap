const fs = require("fs");
const path = require("path");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.returnHTMLWithOGP = functions.https.onRequest((req, res) => {
  fs.readFile("./hosting/index.html", "utf-8", (e, html) => {
    const overviewId = req.path.split("/")[2];
    const firestore = admin.firestore();
    try {
      firestore.settings({ timestampsInSnapshots: true });
    } catch (error) {
      // ignore
    }
    firestore
      .collection("overviews")
      .doc(overviewId)
      .get()
      .then(doc => {
        const overview = doc.data();
        html = html.replace(
          html.match(/<title>.*<\/title>/),
          `<title>${overview.title} | ${
            overview.authorName
          }さんのロードマップ</title>`
        );
        html = html.replace(
          html.match(/<meta property="og:image"[^>]*>/),
          `<meta property="og:image" content="${overview.eyeCatchImg}">`
        );
        html = html.replace(
          html.match(/<meta property="og:title"[^>]*>/),
          `<meta property="og:title" content="${overview.title} | ${
            overview.authorName
          }さんのロードマップ">`
        );
        html = html.replace(
          html.match(/<meta property="og:url"[^>]*>/),
          `<meta property="og:url" content="https://devmap.work/overviews/${
            overview.key
          }">`
        );
        res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
        res.status(200).send(html);
        return overview;
      })
      .catch(e => {
        res.status(200).send(html);
        throw e;
      });
  });
  return 0;
});
