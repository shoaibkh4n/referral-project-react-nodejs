# Referral Generator Project

Welcome to the Referral Generator Project repository! This full-stack web application is designed to streamline the process of generating and managing referrals, making it easier for businesses and individuals to track and incentivize referrals through a user-friendly interface. The project is built with a React frontend and a Node.js backend, utilizing MongoDB as the database, Express.js for creating APIs, and Mongoose as an ORM for data modeling. This README provides an overview of the project, including setup instructions, features, and contribution guidelines.

## Features

- **User Authentication**: Secure authentication system with protected routes for authenticated users and public routes for guests.
- **Referral Management**: Users can create, read, update, and delete referrals in a seamless interface.
- **Email Notifications**: Automatic email notifications to users about referral status changes using Nodemailer.
- **Responsive Design**: A mobile-friendly design ensures the application is accessible on various devices.
- **Asset Management**: Efficient management of static files and assets for a fast and responsive user experience.
- **Component Splitting**: Optimized loading times and performance through React's lazy loading and component splitting.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Email Service**: Nodemailer
- **Authentication**: JWT for secure authentication

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or later)
- npm (v6 or later)
- MongoDB (Local or Cloud Atlas)

### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/referral-generator.git

cd referral-project-react-nodejs
```

2. Install dependency in each of the folder.

   - Backend:

   ```
   cd referral-backend-nodejs
   npm install
   ```

   - Frontend:

   ```
   cd referral-frontend-reactjs
   npm install
   ```

3. Create .env file in each folder with the following content.

   - Backend:

     - DB_CONNECTION_URL = mongodbconnectionstring
     - JWT_SECRET = randomstring
     - COMPANY_MAIL_PASSWORD= randompassword
     - COMPANY_SENDING_MAIL= xyz@gmail.com
     - COMPANY_RECIVING_MAIL= xyz@gmail.com
     - COMPANY_NAME=XYZ

   - Frontend:
     - REACT_APP_BASE_URL = http://localhost:8000
     - GENERATE_SOURCEMAP = false

> Note: Make sure to replace the values of each env key mentioned above according to you.

4. Start server:

   - Backend:

   ```
   npm run dev
   ```

   - Frontend:

   ```
   npm start
   ```

### Default ports:

- **Backend:** 8000
- **Frontend:** 3000

> Frontend built using the first version of my previous [react-saas-starter](https://github.com/shoaibkh4n/react-saas-starter) template. Few things got updated in that template which is switched from create-reat-app to vite and jsx to tsx , else is same.

> Note: there is no interface for signup , so you need to create account using the api using postman or anything.
> Just make a post request with the following as body content:

```json
{
  "name": "xyz",
  "email": "xyz@gmail.com",
  "password": "random"
}
```

## Project Workflow

The Referral Generator Project facilitates the creation, distribution, and tracking of referral coupon codes, bridging efficient communication between companies, distributors (such as influencers or YouTubers), and potential customers. Below is a detailed guide on how the workflow progresses from account creation to tracking coupon code usage.

### Step-by-Step Workflow

#### 1. Account Creation

To get started, a user (typically a company employee responsible for managing referrals) needs to create an account. As the frontend does not currently support account creation, this step must be completed using the signup API via Postman or a similar tool. Follow the `routes.js` file present in the `config` folder in backend folder `(referral-backend-nodejs)`.

#### 2. Logging In

Once the account is created, log in through the frontend's home screen using the credentials you've set up. This action grants you access to the dashboard where you can manage referral coupon codes.

#### 3. Generating Referral Coupons

On the dashboard, you can generate a new referral coupon by entering the name and email of the person (distributor) who will be distributing your coupon, e.g., a YouTuber or influencer promoting your website. The coupon code is auto-generated based on the distributor's name and email to ensure uniqueness and traceability.

#### 4. Tracking Coupon Usage

When an individual uses the given coupon code on the company's official website either for signing up, contacting the company, or any other action predefined by the company then the following occurs:

- The company receives an email detailing the user's information along with the used coupon code, facilitating seamless tracking of the referral's source and ensuring transparency in distributor compensation.
- Simultaneously, the distributor (e.g., the YouTuber) receives an email notification that their specific coupon has been used, along with the user's details. This process ensures clear communication and trust between the company and the distributor.

#### 5. Managing Coupons

Back on the frontend dashboard, company employees can oversee all generated coupon codes. This management includes viewing active coupons and deleting any that are no longer needed or have expired. This feature allows for effective control over the distribution and validity of referral coupons.

### Additional Notes

This workflow emphasizes efficiency, transparency, and ease of communication between all parties involved in the referral process. It streamlines the tracking of referrals and simplifies the management of referral incentives. For any further details regarding API endpoints, data fields, or additional functionalities, please refer to the project's API documentation.

### Contributing

Contributions are welcome! If you'd like to help improve the Astro Website Template, feel free to submit issues, feature requests, or pull requests.

### License

Distributed under the MIT License. See [LICENCE](https://github.com/shoaibkh4n/referral-project-react-nodejs/blob/main/LICENSE) for more information.

### Acknowledgments

- Icon and designs from [Quazire.com](https://quazire.com/)
- Backed by [Quazire.com](https://quazire.com/)

- Follow me on [Twitter](https://twitter.com/theshoaibkh4n) and [Linkedin](https://linkedin.com/in/shoaibkh4n)
- Support my work with a [Donation](https://github.com/sponsors/shoaibkh4n) 🔥🚀
