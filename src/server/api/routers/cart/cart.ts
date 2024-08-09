import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const cartRouter = createTRPCRouter({
  getCartItem: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const cartItems = await db.cartItem.findMany({
      where: {
        userId: session.user.id,
        status: "active",
      },
    });

    if (!cartItems) {
      return null;
    }
    return cartItems;
  }),
  createCartItem: protectedProcedure
    .input(
      z.object({
        product: z.string().min(1, "Product name is required"),
        productId: z.string().min(1, "Product is required"),
        description: z.string().min(1, "Description is required"),
        price: z.number().int().min(1, "Price is required"),
        quantity: z.number().int(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;

      // Check if cart item already exists
      const existingCartItem = await db.cartItem.findUnique({
        where: {
          productId: input.productId,
          userId: session.user.id,
          status: "active",
        },
      });

      // Check if cart item already exists in the database and throw an error if it does
      if (existingCartItem) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart item already exists",
        });
      }

      // Create cart item if it does not exist
      const cartItem = await db.cartItem.create({
        data: {
          ...input,
          userId: session.user.id,
        },
      });

      // Throw an error if cart item creation fails
      if (!cartItem) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create cart item",
        });
      }
      // Return the created cart item
      return cartItem;
    }),
  updateCartItem: protectedProcedure
    .input(z.object({ productId: z.string().min(1, "Product is required") }))
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;
      const { productId } = input;
      const cartItem = await db.cartItem.findUnique({
        where: {
          productId,
          userId: session.user.id,
        },
      });

      if (!cartItem) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cart item not found",
        });
      }

      const updatedCartItem = await db.cartItem.update({
        where: {
          productId,
          userId: session.user.id,
        },
        data: {
          status: "inactive",
        },
      });

      if (!updatedCartItem) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update cart item",
        });
      }

      return updatedCartItem;
    }),
  deleteCartItem: protectedProcedure
    .input(
      z.object({
        productId: z.string().min(1, "Product is required"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;

      // Check if cart item already exists
      const existingCartItem = await db.cartItem.findUnique({
        where: {
          productId: input.productId,
          userId: session.user.id,
          status: "active",
        },
      });

      // Check if cart item already exists in the database and throw an error if it does
      if (!existingCartItem) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart item Doesn't exists",
        });
      }

      // Delete cart item if it exists
      await db.cartItem.delete({
        where: {
          productId: input.productId,
          userId: session.user.id,
        },
      });
      // Return the created cart item
      return {
        message: "Cart item deleted successfully",
      };
    }),
});
