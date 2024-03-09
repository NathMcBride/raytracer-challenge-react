import { Stripe, Point, Color, isEven } from '..';
export const stripeAt = (stripe: Stripe, point: Point): Color =>
  isEven(Math.floor(point.x)) ? stripe.a : stripe.b;
