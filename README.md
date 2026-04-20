# Traderise | High-Performing Business Systems

Traderise specializes in building high-performing business systems that turn interest into customers. This repository contains the source code for the Traderise marketing platform, designed for maximum conversion and infrastructure-driven growth.

## 🚀 The System

Unlike traditional "lead gen" sites, Traderise focuses on **"After The Click"** optimization. We build the architecture required to capture, nurture, and convert traffic into actual revenue.

### Core Features
- **High-Converting UI**: A glassmorphic, modern interface built for speed and engagement.
- **Dynamic Dashboard Metrics**: Animated statistics showing system performance and conversion trends.
- **Smart Lead Capture**: A mandatory validation form ensuring high-quality data (Email & Phone).
- **Automated Routing**: Backend integration with **Resend** for instant email alerts and automated lead delivery.
- **Serverless Infrastructure**: Powered by Cloudflare Pages and Edge Functions for global performance.

## 🛠️ Tech Stack

- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript (No heavy frameworks for maximum SEO and speed).
- **Backend**: Cloudflare Pages Functions (Serverless Edge logic).
- **Email Delivery**: [Resend](https://resend.com) API for high-deliverability lead notifications.
- **Typography**: Inter (Google Fonts) for a premium, tech-forward aesthetic.

## ⚙️ Configuration

The following environment variables are set in the Cloudflare Pages project:

- `GHL_WEBHOOK_URL`: ✅ **Configured** — GoHighLevel Inbound Webhook URL (Workflow trigger). No API token required; the URL itself serves as authentication. Leads are routed directly from the edge function to GHL on form submission.

> **Note:** The original Resend email delivery has been replaced by the GHL webhook integration. All form submissions now flow directly into GoHighLevel for CRM contact creation and workflow automation.

## 🌐 Deployment

The project is configured for continuous deployment via **Cloudflare Pages**. Any push to the `main` branch triggers a fresh build and deployment in seconds.

---

© 2026 Traderise. All rights reserved.
