const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5001;

// Database connection
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Emp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Emp database');
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

connectDB();

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary must be a positive number'],
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', UserSchema);

// User Account Schema
const UserAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserAccount = mongoose.model('UserAccount', UserAccountSchema);

app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("App is Working");
});

// Register user route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, position, department, salary } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ Status: 'Fail', Message: 'User already registered' });
    }

    const user = new User({ name, email,password, position, department, salary });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    let result = await user.save();

    let userAccount = await UserAccount.findOne({ email });
    if (userAccount) {
      return res.status(400).json({ Status: 'Fail', Message: 'User account already exists' });
    }

    const newUserAccount = new UserAccount({ name, email, password });

    newUserAccount.password = await bcrypt.hash(password, salt);

    await newUserAccount.save();

    res.status(200).json({ Status: 'Success', Message: 'User registered successfully', user: result });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send("Something Went Wrong");
  }
});

//register admin user
app.post('/register-user', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let userAccount = await UserAccount.findOne({ email });

    if (userAccount) {
      return res.status(400).json({ Status: 'Fail', Message: 'User already exists' });
    }

    const newUserAccount = new UserAccount({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    newUserAccount.password = await bcrypt.hash(password, salt);

    await newUserAccount.save();

    

    res.status(200).json({ Status: 'Success', Message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ Status: 'Fail', Message: 'Server error' });
  }
});
// Admin login route
app.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await UserAccount.findOne({ email });
    if (admin && await bcrypt.compare(password, admin.password)) {
      res.json({ Status: "Success" });
    } else {
      res.json({ Status: "Failed", message: "Invalid credentials" });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Server error');
  }
});
// Employee login route
app.post('/employee-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await UserAccount.findOne({ email });
    if (admin && await bcrypt.compare(password, admin.password)) {
      res.json({ Status: "Success" });
    } else {
      res.json({ Status: "Failed", message: "Invalid credentials" });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Server error');
  }
});
// Employee login route
app.post('/employee-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserAccount.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ Status: "Success" });
    } else {
      res.json({ Status: "Failed", message: "Invalid credentials" });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Server error');
  }
});

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send("Something Went Wrong");
  }
});

// Fetch single user by email (employee-login)
app.get('/employee-login', async (req, res) => {
  try {
    const { email } = req.query;
    const user = email ? await User.findOne({ email }) : await User.find();
    res.json(user);
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send("Something Went Wrong");
  }
});

// Fetch single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Server error');
  }
});

// Update user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Delete user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});
app.get('/employee-profile', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ Status: 'Fail', Message: 'Email is required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ Status: 'Fail', Message: 'User not found' });
    }
    res.json(user);
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`App listening at port ${PORT}`);
  }
});
