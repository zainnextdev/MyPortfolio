# Zain Khalid - Full-Stack Portfolio

<p align="center">
  <img src="https://raw.githubusercontent.com/zain-khalid-23/zain-khalid-portfolio/main/public/og-image.png" alt="Zain Khalid Portfolio Banner" />
</p>

<p align="center">
  <!-- Vercel Deployment Badge -->
  <a href="https://zain-khalid-portfolio.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Status-Deployed%20on%20Vercel-black?style=for-the-badge&logo=vercel" alt="Deployment Status" />
  </a>
  <!-- License Badge -->
  <a href="https://github.com/zain-khalid-23/zain-khalid-portfolio/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/zain-khalid-23/zain-khalid-portfolio?style=for-the-badge&color=00F5D4" alt="License" />
  </a>
</p>

This repository contains the complete source code for my personal portfolio, a showcase of modern web architecture and interactive design. It's built from the ground up to be performant, visually stunning, and fully responsive, leveraging the power of the Vercel ecosystem.

**Live Site:** [**https://zain-khalid-portfolio.vercel.app/**](https://zain-khalid-portfolio.vercel.app/)

---

## 🛠️ Tech Stack & Architecture

This project is built with a modern, type-safe, and scalable technology stack designed for elite performance and developer experience.

| Category              | Technology                                                                                                                                                                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Framework**    | [**Next.js 15**](https://nextjs.org/) (with App Router), [**React 19**](https://react.dev/)                                                                                                                                                                                                     |
| **Language**          | [**TypeScript**](https://www.typescriptlang.org/)                                                                                                                                                                                                                                              |
| **Styling**           | [**Tailwind CSS**](https://tailwindcss.com/) with custom themes & plugins                                                                                                                                                                                                                        |
| **Animation**         | [**GSAP (GreenSock)**](https://greensock.com/gsap/) for high-performance timeline animations, [**Three.js**](https://threejs.org/) & [**React Three Fiber**](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) for 3D graphics. |
| **Backend & API**     | [**Next.js API Routes**](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), [**Resend**](https://resend.com/) for email delivery, [**Zod**](https://zod.dev/) for validation.                                                               |
| **Deployment**        | [**Vercel**](https://vercel.com/) (Global Edge Network, CI/CD)                                                                                                                                                                                                                                 |
| **Developer Tools**   | [**ESLint**](https://eslint.org/), [**Prettier**](https://prettier.io/), [**Git**](https://git-scm.com/)                                                                                                                                                                                          |

---

## ✨ Key Features

-   **Interactive 3D Graphics:** Engaging visuals built with Three.js and React Three Fiber.
-   **Advanced GSAP Animations:** Complex, scroll-triggered, and physics-based animations for a fluid user experience.
-   **Command Palette:** A `Ctrl+K` command palette for quick navigation and actions.
-   **Theming System:** Switch between 'Obsidian', 'Marble', and 'Blueprint' themes with a smooth cross-fade transition.
-   **Custom Cursor:** A dynamic cursor that interacts with page elements.
-   **Smooth Scrolling:** Implemented with Lenis for a premium, fluid scroll feel.
-   **API Integration:** A secure API route for the contact form with server-side validation.

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/zain-khalid-portfolio.git
    cd zain-khalid-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add your Resend API key:
    ```env
    RESEND_API_KEY=your_resend_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🌐 Deployment

This project is configured for seamless deployment on [Vercel](https://vercel.com). Simply fork the repository, import it into your Vercel account, and add the `RESEND_API_KEY` environment variable. Vercel's CI/CD will handle the rest automatically.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.