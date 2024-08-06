import { registerRouter, passwordRouter, verifyRouter } from "./routers/auth/";
import { subscriptionRouter } from "./routers/subscriptions/subscriptions";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { streamRouter, audioRouter } from "./routers/music";
import { userRouter } from "./routers/user/user";

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
  audio: audioRouter,
  user: userRouter,
  streams: streamRouter,
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
