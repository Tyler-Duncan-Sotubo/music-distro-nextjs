import { registerRouter, passwordRouter, verifyRouter } from "./routers/auth/";
import { subscriptionRouter } from "./routers/subscriptions/subscriptions";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { smartLinkRouter } from "./routers/smartLinks/smartLinks";
import { userRouter } from "./routers/user/user";
import { cartRouter } from "./routers/cart/cart";
import { photoRouter } from "./routers/user";
import { ticketRouter, commentRouter } from "./routers/ticket";
import { postRouter } from "./routers/posts/posts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  register: registerRouter,
  password: passwordRouter,
  verify: verifyRouter,
  subscriptions: subscriptionRouter,
  smartLinks: smartLinkRouter,
  user: userRouter,

  cart: cartRouter,
  photo: photoRouter,

  // ticket
  ticket: ticketRouter,
  comment: commentRouter,

  // posts
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
