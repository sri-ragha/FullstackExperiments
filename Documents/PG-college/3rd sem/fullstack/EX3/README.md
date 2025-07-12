# Student Management System

A full-stack web application built with Node.js, Express.js, MongoDB, and EJS templating engine. This application provides complete CRUD (Create, Read, Update, Delete) operations for managing student records.

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete student records
- **Student Details**: View detailed information for each student
- **Search & Filter**: Search students by name, email, or course
- **Sorting**: Sort students by name, age, or course (ascending/descending)
- **Form Validation**: Server-side validation with error messages
- **Responsive Design**: Clean and modern UI with CSS styling

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine, HTML, CSS
- **Environment**: dotenv for environment variables

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/student-crud-app
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/student-crud-app?retryWrites=true&w=majority
```

### 4. Start the Application

```bash
node server.js
```

For development with auto-reload:
```bash
npx nodemon server.js
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000/students
```

## 📁 Project Structure

```
student-management-system/
├── models/
│   └── Student.js          # Mongoose model for students
├── public/
│   └── style.css           # CSS styles
├── views/
│   ├── add.ejs            # Add student form
│   ├── edit.ejs           # Edit student form
│   ├── list.ejs           # Student list with search/sort
│   └── details.ejs        # Student details page
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── server.js             # Main server file
└── README.md             # This file
```

## 🎯 Usage

### Adding a Student
1. Click "Add New Student" on the main page
2. Fill in the required fields (name, age, email, course)
3. Click "Add Student"

### Viewing Students
- The main page shows all students
- Click on a student's name to view detailed information
- Use the search bar to filter students
- Use the sort dropdowns to order the list

### Editing a Student
1. Click "Edit" next to any student
2. Modify the information in the form
3. Click "Update Student"

### Deleting a Student
1. Click "Delete" next to any student
2. Confirm the deletion in the popup dialog

## 🔧 API Endpoints

- `GET /students` - List all students (with search and sort)
- `GET /students/add` - Show add student form
- `POST /students/add` - Create new student
- `GET /students/:id` - Show student details
- `GET /students/edit/:id` - Show edit student form
- `POST /students/edit/:id` - Update student
- `POST /students/delete/:id` - Delete student

## 🎨 Features in Detail

### Search & Filter
- Search students by name, email, or course
- Case-insensitive partial matching
- Real-time filtering

### Sorting
- Sort by name, age, or course
- Ascending or descending order
- Maintains search filters while sorting

### Validation
- Required field validation
- Email format validation
- Duplicate email prevention
- User-friendly error messages

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB and Mongoose documentation
- EJS templating engine

---

**Happy Coding! 🎉** 