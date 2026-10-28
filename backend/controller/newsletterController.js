const NewsletterSubscription = require("../models/NewsletterSubscription");
const {
  bodyIsObject,
  emailIsValid,
  invalidBody,
  invalidField,
} = require("./requestValidation");

function subscribeNewsletter(req, res) {
  if (!bodyIsObject(req.body)) return invalidBody(res);
  if (!emailIsValid(req.body.email)) return invalidField(res, "email");
  const email = req.body.email.trim().toLowerCase();
  if (NewsletterSubscription.findOne((subscription) => subscription.email === email)) {
    return res.status(409).json({ message: "This email is already subscribed." });
  }
  const subscription = NewsletterSubscription.create({ email });
  return res.status(201).json({ subscription });
}

module.exports = { subscribeNewsletter };
