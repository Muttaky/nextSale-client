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

# or

yarn install

# or

pnpm install

npm run dev

# or

yarn dev

# or

pnpm dev

Route,Functionality,Requires Auth
/,Homepage & Landing. Features promotions and featured items.,❌
/items,Main product catalog listing all available products.,❌
/items/[id],Individual product detail page.,❌
/cart,User's shopping cart management view.,✅
/add,Form page for a user to post and list new products for sale.,✅
/manage,User account dashboard for managing profile and listings.,✅
/login,Authentication route for signing in.,❌
/register,Authentication route for creating a new user account.,❌

```

```
