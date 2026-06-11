import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID={
    'seeker_pro':'price_1TgiRUQvHJPQliAKzQ9G9zA0',
    'seeker_premium':'price_1TgjKPQvHJPQliAKykNV7M6P',
    'recruters_growth':'price_1TgjLLQvHJPQliAKbCPqzcUD',
    'recruters_enterprise':'price_1TgjMAQvHJPQliAKQWSXGOgr',
}