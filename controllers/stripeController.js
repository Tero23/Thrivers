require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Mentorship = require("../models/mentorshipModel");
const Customer = require("../models/customerModel");
const catchAsync = require("../utils/catchAsync");

// For successful subscription use "tok_visa" for the stripeToken's value
exports.createSubsciption = catchAsync(async (req, res, next) => {
  const { mentorshipName, email, stripeToken } = req.body;
  const customer = await Customer.create({
    email,
    mentorshipName,
    stripeToken,
  });
  const mentorship = await Mentorship.findOne({ name: mentorshipName });
  // Create a subscirtion plan
    const plan = await stripe.plans.create({
        amount: mentorship.price * 100,
        interval: 'month',
        product: {
            name: mentorshipName,
        },
        currency: 'inr',
        });
    // Create a stripe customer
    const stripeCustomer = await stripe.customers.create({
        email,
        source: 'tok_visa',
      });
    
    // Create a subscription
      const subsciption = await stripe.subscriptions.create({
        customer: stripeCustomer.id,
        items: [
          {
            plan: plan.id,
          },
        ],
      });

      res.status(200).json({
        message: "Subscription successful!",
        subsciption
      })
});
