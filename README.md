# Music Distribution Platform

This repository contains the source code for a **Music Distribution Platform** built using **Next.js**. The platform allows artists to upload music and videos, manage their profiles, monitor royalties and analytics, and handle payments via **PayPal** and **Paystack** for subscriptions. Additionally, the platform includes features like **OAuth login**, password reset, email verification, and support ticketing, with all emails sent via **SendGrid**.

## Features

- **User Authentication**: 
  - Login and registration with **NextAuth.js** and **OAuth**.
  - Password reset and email verification functionality.
  
- **Payment Integration**: 
  - **PayPal** and **Paystack** for subscriptions and royalty payments.

- **Music & Video Upload**:
  - Artists can upload tracks and music videos for distribution.

- **Artist Profile**:
  - Artists can manage their profile, including social links and bio.

- **Royalties Report**:
  - Track and report royalties earned through distribution.

- **Daily Analytics Report**:
  - Provide detailed insights into streams, downloads, and engagement.

- **Support Ticketing**:
  - Artists can create and track support tickets.

- **Email Notifications**:
  - All system-generated emails (account verification, password reset, support tickets, etc.) are sent via **SendGrid**.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes, Node.js
- **Database**: Prisma ORM (PostgreSQL or another supported DB)
- **Authentication**: NextAuth.js with OAuth (Google, Facebook, etc.)
- **Payment**: PayPal API, Paystack API
- **File Storage**: AWS S3 (or similar for music/video uploads)
- **Email Service**: SendGrid API
- **Analytics**: Custom analytics engine (or third-party service integration)



---

### Key Sections Included:

1. **Authentication with NextAuth** and OAuth (Google OAuth integration).
2. **Payment handling with PayPal and Paystack**, including sandbox and production settings.
3. **File upload for music and videos**, using **AWS S3**.
4. **Royalties report** and **daily analytics** tracking for artists.
5. **Support ticketing** system with email notifications powered by **SendGrid**.
6. Detailed **setup instructions** for both local development and production deployment.

