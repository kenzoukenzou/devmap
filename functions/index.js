const fs = require("fs");
const path = require("path");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.pageOverview = functions.https.onRequest((req, res) => {
  fs.readFile("index.html", "utf8", (e, html) => {
    // req.path = '/spot/:overviewId'
    const overviewId = req.path.split("/")[2];
    const firestore = admin.firestore();
    // https://stackoverflow.com/questions/51441263/admin-sdk-cannot-set-settings-for-firestore
    try {
      firestore.settings({ timestampsInSnapshots: true });
    } catch (error) {
      // ignore
    }
    firestore
      .doc(`/overviews/${overviewId}/`)
      .get()
      .then(overviewDoc => {
        const overview = overviewDoc.exists ? overviewDoc.data() : null;
        if (overview) {
          html = html.replace(
            html.match(/<title>.*<\/title>/),
            `<title>Devmap - ${overview.title}</title>`
          );

          // html = html.replace(
          //   html.match(/<meta name="og:title"[^>]*>/),
          //   `<meta name="og:title" content="${overview.title}">`
          // );
          // html = html.replace(
          //   html.match(/<meta name="og:image"[^>]*>/),
          //   `<meta name="og:image" content="${overview.eyeCatchImg}">`
          // );

          res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
        }
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
