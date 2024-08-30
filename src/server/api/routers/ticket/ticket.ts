import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import crypto from "crypto";
import {
  sendNewSupportTicketEmail,
  sendMusicReleaseAlertToAdmin,
} from "@/server/services/mail";

function generateReferenceNumber(): string {
  const id = crypto.randomBytes(6).toString("hex").toUpperCase(); // 12 characters

  const part1 = id.substring(0, 4);
  const part2 = id.substring(4, 8);
  const part3 = id.substring(8, 12);
  return `${part1}-${part2}-${part3}`;
}
const newTicket = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Title is required"),
});

export const ticketRouter = createTRPCRouter({
  getTickets: protectedProcedure.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const tickets = await db.ticket.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (!tickets) {
      return null;
    }

    return tickets;
  }),
  getTicketById: protectedProcedure
    .input(
      z.object({
        ticketId: z.string().min(1, "Ticket is required"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const ticket = await db.ticket.findUnique({
        where: {
          id: input.ticketId,
          userId: session.user.id,
        },
      });

      if (!ticket) {
        return null;
      }

      return ticket;
    }),
  createTicket: protectedProcedure
    .input(newTicket)
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;

      const referenceNumber = generateReferenceNumber();

      const ticket = await db.ticket.create({
        data: {
          title: input.title,
          description: input.description,
          referenceNumber,
          userId: session.user.id,
        },
      });

      const comment = await db.comment.create({
        data: {
          content: input.content,
          ticketId: ticket.id,
          userId: session.user.id,
        },
      });

      if (!ticket || !comment) {
        return null;
      }

      await sendNewSupportTicketEmail(
        session.user.email,
        referenceNumber,
        `https://weplugmusic.com/dashboard/tickets/${ticket.id}`,
        input.description,
      );

      await sendMusicReleaseAlertToAdmin();

      return ticket;
    }),
  updateTicket: protectedProcedure
    .input(
      z.object({
        ticketId: z.string().min(1, "Ticket is required"),
        status: z.enum(["OPEN", "CLOSED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const ticket = await db.ticket.update({
        where: {
          id: input.ticketId,
        },
        data: {
          status: input.status,
          updatedAt: new Date(),
        },
      });

      if (!ticket) {
        return null;
      }

      return ticket;
    }),
});
