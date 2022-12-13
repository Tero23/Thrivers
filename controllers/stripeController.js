require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Mentorship = require("../models/mentorshipModel");
const Customer = require("../models/customerModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createSubscriptionPlan = catchAsync(async (req, res, next) => {
    const { mentorshipName } = req.body;
    const mentorship = await Mentorship.findOne({ name: mentorshipName });
    const plan = await stripe.plans.create({
        amount: mentorship.price * 100,
        interval: 'month',
        product: {
            name: mentorshipName,
        },
        currency: 'inr',
        });
    plan.nickname = mentorshipName;

    res.status(201).json({
        message: "Subscription plan created inside of stripe.",
        plan,
    })
})

exports.createSubsciption = catchAsync(async (req, res, next) => {
    // Create a subscirtion plan
    const { mentorshipName, email } = req.body;
    // const customer = await Customer.create({
    //     email,
    //     mentorshipName,
    //     stripeToken,
    // });
    const mentorship = await Mentorship.findOne({ name: mentorshipName });
    const plan = await stripe.plans.create({
        amount: mentorship.price * 100,
        interval: 'month',
        product: {
            name: mentorshipName,
        },
        currency: 'inr',
        });
    // Create a customer
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
        message: "Subscription successful!"
      })
})













// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//     const mentorship = await Mentorship.findById(req.params.id);

//     const session = await stripe.checkout.sessions.create({
//         mode: "subscription",
//         payment_method_types: ['card'],
//         success_url: "https://www.thriverswagmi.com/career",
//         cancel_url: "https://www.thriverswagmi.com",
//         customer_email: "doumaniant@gmail.com",
//         client_reference_id: req.params.id,
//         line_items: [
//             {
//                 quantity: 1,
//                 price: "price_1MEAeYDHO50JWtREXISeX5Ij"
//             },
//         ],
//     });
//     res.status(200).json({
//         session
//     })
// })

// exports.handler = catchAsync(async (req, res, next) => {
//     const { name, email, paymentMethod } = req.body;
//     const customer = await stripe.customers.create({
//         email,
//         name,
//         payment_method: paymentMethod,
//         invoice_settings: {
//             default_payment_method: paymentMethod
//         },
//     });
//     const product = await stripe.products.create({
//         name: "Monthly Subscription",
//     });
//     const subscription = await stripe.subscription.create({
//         customer: customer.id,
//         items: [
//             {
//                 price_data: {
//                     currency: 'INR',
//                     product: product.id,
//                     unit_amount: "500",
//                     recurring: {
//                         interval: 'month'
//                     }
//                 }
//             }
//         ],
//         payment_settings: {
//             payment_method_options: ["card"],
//             save_default_payment_method: "on_subsciption",
//         },
//         expand: ['latest_invoice.payment_intent']
//     });
//     res.status(200).json({
//         message: "Subscription succerssful!",
        
//     })
// })
