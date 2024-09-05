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

## Prerequisites

Before running the project, ensure you have the following:

- **Node.js** (v14.x or higher)
- **npm** or **yarn**
- **PostgreSQL** (or another relational database supported by Prisma)
- **PayPal Developer Account** with API credentials
- **Paystack** Developer Account
- **SendGrid** account for sending emails
- **Cloud storage** (e.g., AWS S3) for file uploads (music and video)

## Getting Started

### 1. Clone the repository:

```bash
git clone <repository-url>
cd music-distribution-platform
