# Exam Management System

A comprehensive exam management system built with NestJS, TypeScript, and MySQL. This application provides a robust platform for creating, managing, and conducting online examinations.

## Features

### 👨‍💼 User Management

- User registration and authentication
- Role-based access control (Admin/User)
- User profile management

### 📝 Exam Management

- Create and manage exams
- Set exam parameters (date, passing percentage, question count)
- Draft and publish exam states
- Flexible exam configuration

### ❓ Question Management

- Create multiple choice questions
- Support for single and multi-select questions
- Rich question content with multiple options
- Question bank management

### 🔐 Security Features

- Admin and email guards for protected routes
- User middleware for request processing
- Secure authentication system

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL with TypeORM
- **Documentation**: Swagger/OpenAPI
- **Validation**: Class Validator & Class Transformer
- **Security**: Helmet, Compression

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MySQL database
- Git

## Environment Setup

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd exam
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_DATABASE=exam_system

   # Application Configuration
   PORT=3000
   NODE_ENV=development

   # Add other environment variables as needed
   ```

4. **Database Setup**
   - Create a MySQL database named `exam_system`
   - The application will automatically create tables using TypeORM migrations

## Running the Application

```bash
# Development mode
npm run start:dev
# or
npm run dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The application will be available at `http://localhost:3000`

### API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

## Project Structure

```
src/
├── app.controller.ts          # Main application controller
├── app.module.ts             # Root application module
├── app.service.ts            # Main application service
├── main.ts                   # Application entry point
├── swagger-setup.ts          # Swagger configuration
├── database/                 # Database configuration
├── decorators/               # Custom decorators
├── entities/                 # TypeORM entities
│   ├── exam.entity.ts        # Exam entity
│   ├── questions.entity.ts   # Questions entity
│   └── user.entity.ts        # User entity
├── exam/                     # Exam module
│   ├── exam.controller.ts
│   ├── exam.service.ts
│   ├── exam.module.ts
│   └── dto/
├── question/                 # Question module
│   ├── question.controller.ts
│   ├── question.service.ts
│   ├── question.module.ts
│   └── dto/
├── user/                     # User module
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.module.ts
│   └── dto/
├── guards/                   # Authentication guards
├── middlewares/              # Custom middlewares
└── shared-module/           # Shared utilities and configs
```

## API Endpoints

### User Management

- `POST /user/signup` - User registration
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

### Exam Management

- `POST /exam` - Create new exam (Admin only)
- `GET /exam` - Get all exams
- `GET /exam/:id` - Get specific exam
- `PUT /exam/:id` - Update exam (Admin only)
- `DELETE /exam/:id` - Delete exam (Admin only)

### Question Management

- `POST /question` - Create new question (Admin only)
- `GET /question` - Get all questions
- `GET /question/:id` - Get specific question
- `PUT /question/:id` - Update question (Admin only)
- `DELETE /question/:id` - Delete question (Admin only)

## Database Schema

### User Entity

- `user_id` (Primary Key)
- `email` (Unique)
- `name` (Unique)
- `role` (admin/user)
- `created_on`, `updated_on`

### Exam Entity

- `id` (Primary Key)
- `exam_name`
- `total_question`
- `question_in_exam`
- `passing_percentage`
- `exam_date`
- `role` (DRAFT/PUBLISH)
- `created_by` (Foreign Key to User)

### Questions Entity

- `id` (Primary Key)
- `description`
- `is_multiselect`
- `options` (Array)
- `answer` (Array)
- `exam` (Foreign Key to Exam)
- `created_by` (Foreign Key to User)

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## Development

### Code Quality

```bash
# Linting
npm run lint

# Code formatting
npm run format
```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the UNLICENSED License - see the package.json file for details.

## Support

For support and questions, please create an issue in the repository or contact the development team.

---

Built with ❤️ using NestJS
