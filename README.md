# 🚀 Next-Sale Client

**A modern web app platform for browsing, buying, and managing sales items.**

|                                **Live Link**                                 | **Status**  | **Built With**  |
| :--------------------------------------------------------------------------: | :---------: | :-------------: |
| [https://next-sale-client.vercel.app/](https://next-sale-client.vercel.app/) | ✅ Deployed | Next.js, Vercel |

---

## 🌟 Project Overview

Next-Sale Client is the **fast, responsive frontend** for the Next-Sale platform. It leverages **Next.js** capabilities (like Server-Side Rendering and Static Site Generation) to deliver a highly performant and user-friendly e-commerce experience.

The application allows users to:

- **Browse** the full product catalog.
- **View** detailed product specifications.
- **Add** and manage items in their shopping cart.
- **Post** new products for sale.
- **Manage** their account and posted listings via a user dashboard.

---

## ⚙️ Setup & Local Installation

To get the Next-Sale Client running on your local machine, follow these steps.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en) (LTS recommended)
- npm, Yarn, or pnpm

### 1. Clone the Repository

Clone the project from your repository and navigate into the directory:

bash
git clone <YOUR_REPO_URL>
cd next-sale-client

npm install

npm run dev

## 🗺️ Project Routes & Access

| Route         | Functionality                                                | Requires Authentication |
| :------------ | :----------------------------------------------------------- | :---------------------- |
| `/`           | Homepage & Landing. Features promotions and featured items.  | ❌                      |
| `/items`      | Main product catalog listing all available products.         | ❌                      |
| `/items/[id]` | Individual product detail page.                              | ❌                      |
| `/cart`       | User's shopping cart management view.                        | ✅                      |
| `/add`        | Form page for a user to post and list new products for sale. | ✅                      |
| `/manage`     | User account dashboard for managing profile and listings.    | ✅                      |
| `/login`      | Authentication route for signing in.                         | ❌                      |
| `/register`   | Authentication route for creating a new user account.        | ❌                      |


## 🗺️ Project used tech

| Category            | Purpose                                                                                 |Technology             |
| :-----------------  | :-------------------------------------------------------------------------------------- | :-------------------- |
| Frontend Framework  | High-performance, SEO-friendly framework with SSG/SSR capabilities.                     | Next.js (React)       |
| Styling & UI        | Utility-first CSS framework and component library for rapid, responsive UI development. | Tailwind CSS & daisyUI|
| Authentication      | Secure, scalable, and easy-to-implement user authentication (Sign-in, Registration).    | Firebase              |
| Backend Architecture|The overall architecture uses MongoDB, Express.js, React (via Next.js), and Node.js.     | MERN Stack            |
| Deployment          | Platform for static sites and Serverless Functions, optimized for Next.js.              | Vercel                |

