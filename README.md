# Challenge Description

You’re starting up a new project to build an online employee directory for the company.
There’s an existing API that can feed you the data that can be accessed at this URL:

https://reqres.in/

The goal is to be able to fetch the data from the api and display a list view, with a link to display a more detailed page with the employee’s information.
Because the company is large, we’ll need to be sure we can paginate the list results and also search by email address to find that one specific person.

This is a Greenfield exercise, and you’re in charge. Please choose your desired technology to make this happen. This does not have to be pretty, it is an exercise to learn how you would approach the problem, how you collaborate with our team members, how you accept feedback, and how you can explain the choices you’re making.

If you’re doing this as a take-home exercise, we will have a meeting afterwards to have you walk through your code, the way it works, and how you came up with the solution. You can walk us through the repository and we will have a conversation about the implementation.

There is only 1 rule. You cannot call the API directly from the frontend.

Requirements:

- Start a new repository with the desired tech stack
- Implement a method of fetching the data from the API on the backend and serving to the frontend
- Display a paginated list view of the results of employees
- Provide a link to go to a page to display more details about a specific employee
- Ensure that users can enter an email address to help narrow down the employee list closer to the person they are looking for

# Generated Next.js README

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
