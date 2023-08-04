const functions = require("firebase-functions");
const stripe = require("stripe")(
  "sk_test_51N4hnMKqSpjk1qzNaL4r4p2v78Cw9ZEh4z2RklzWU857f8u87h9uwEuO3LU0PCP7mUJIZqopdufirlhqsCDoEuxB00gD84V67f"
);

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.stripeEndpoint = functions.https.onRequest(async (req, res) => {
  try {
    const {amount} = req.body;
    console.log("request reached");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.ceil(parseInt(amount * 100)),
      currency: "usd",
      payment_method_types: ["card"],
    });
    return res.json({
      client_secret: paymentIntent.client_secret,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: "occured" });
  }
});
