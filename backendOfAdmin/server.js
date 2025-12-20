// const express = require("express");
// const ExcelJS = require("exceljs");
// const cors = require("cors");
// const fs = require("fs");
// const jwt = require("jsonwebtoken");

// const jwtSecret = "your_jwt_secret_key";
// const app = express();
// app.use(cors());
// app.use(express.json());

// const FILE = "users.xlsx";
// let users = [];

// /* ---------------- INIT EXCEL ---------------- */
// async function initExcel() {
//   if (fs.existsSync(FILE)) return;

//   const workbook = new ExcelJS.Workbook();
//   const sheet = workbook.addWorksheet("Users");
//   sheet.addRow(["ID", "Name", "Email","Role"]);

//   await workbook.xlsx.writeFile(FILE);
// }
// initExcel();

// /* ---------------- LOAD EXCEL ---------------- */
// async function loadExcel() {
//   const workbook = new ExcelJS.Workbook();
//   await workbook.xlsx.readFile(FILE);
//   const sheet = workbook.getWorksheet(1);

//   users = [];

//   sheet.eachRow((row, index) => {
//     if (index > 1) {
//       users.push({
//         id: row.getCell(1).value,
//         name: String(row.getCell(2).value).toLowerCase().trim(),
//         email: String(row.getCell(3).value).toLowerCase().trim(),
//         role: String(row.getCell(4).value).toLowerCase().trim(),
//       });
//     }
//   });

//   return { workbook, sheet };
// }

// /* ---------------- Auth MiddleWare ---------------- */
// function authenticate(req, res, next) {
//   const auth = req.headers.authorization;
//   if (!auth) return res.sendStatus(401);

//   const token = auth.split(" ")[1];

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) return res.sendStatus(403);
//     req.user = decoded;
//     next();
//   });
// }

// /* ---------------- Role Middleware ---------------- */
// function authorize(roles = []) {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// }


// /* ---------------- HEALTH CHECK ---------------- */
// app.get("/test", (req, res) => {
//   res.json({ message: "Server connected successfully" });
// });

// /* ---------------- CONNECT / COMPARE ---------------- */
// app.post("/connect", async (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ error: "Name and Email required" });
//   }

//   await loadExcel();

//   const user = users.some(
//     u =>
//       u.name === name.toLowerCase().trim() &&
//       u.email === email.toLowerCase().trim()
//   );
//   if (!user) {
//     return res.json({ status: "disconnect" });
//   }

//   const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: "1h" });

//   res.json({
//     status: "connect",
//     token,
//     user: {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role
//     }
//   });
// });

// /* ---------------- READ ALL USERS ---------------- */
// app.get("/users", authenticate, authorize(["admin"]), async (req, res) => {
//   await loadExcel();
//   res.json(users);
// });

// /* ---------------- CREATE USER ---------------- */
// app.post("/users", authenticate, authorize(["admin"]), async (req, res) => {
//   const { name, email, role } = req.body;
//   if (!name || !email) {
//     return res.status(400).json({ error: "Name and Email required" });
//   }

//   const { workbook, sheet } = await loadExcel();

//   const id = sheet.rowCount;
//   sheet.addRow([id, name, email, role]);

//   await workbook.xlsx.writeFile(FILE);

//   res.json({ message: "User created" });
// });

// /* ---------------- UPDATE USER ---------------- */
// app.put("/users/:id", async (req, res) => {
//   const { name, email } = req.body;
//   const id = Number(req.params.id);

//   const { workbook, sheet } = await loadExcel();

//   const row = sheet.getRow(id + 1);
//   if (!row || !row.getCell(1).value) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   row.getCell(2).value = name;
//   row.getCell(3).value = email;
//   row.commit();

//   await workbook.xlsx.writeFile(FILE);

//   res.json({ message: "User updated" });
// });

// /* ---------------- DELETE USER ---------------- */
// app.delete("/users/:id", async (req, res) => {
//   const id = Number(req.params.id);

//   const { workbook, sheet } = await loadExcel();

//   if (!sheet.getRow(id + 1).getCell(1).value) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   sheet.spliceRows(id + 1, 1);
//   await workbook.xlsx.writeFile(FILE);

//   res.json({ message: "User deleted" });
// });

// /* ---------------- SERVER ---------------- */
// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });


const express = require("express");
const ExcelJS = require("exceljs");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 JWT Secret
const JWT_SECRET = "your_jwt_secret_key";

// Disable cache for APIs
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

const FILE = "users.xlsx";
let users = [];

/* ---------------- INIT EXCEL ---------------- */
async function initExcel() {
  if (fs.existsSync(FILE)) return;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Users");
  sheet.addRow(["ID", "Name", "Email", "Role"]);

  await workbook.xlsx.writeFile(FILE);
}
initExcel();

/* ---------------- LOAD EXCEL ---------------- */
async function loadExcel() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(FILE);
  const sheet = workbook.getWorksheet(1);

  users = [];

  sheet.eachRow((row, index) => {
    if (index > 1) {
      users.push({
        id: row.getCell(1).value,
        name: String(row.getCell(2).value).toLowerCase().trim(),
        email: String(row.getCell(3).value).toLowerCase().trim(),
        role: String(row.getCell(4).value).toLowerCase().trim()
      });
    }
  });

  return { workbook, sheet };
}

/* ---------------- AUTH MIDDLEWARE ---------------- */
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  const token = auth.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

/* ---------------- ROLE MIDDLEWARE ---------------- */
function authorize(roles = []) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

/* ---------------- HEALTH CHECK ---------------- */
app.get("/test", (req, res) => {
  res.json({ message: "Server connected successfully" });
});

/* ---------------- LOGIN ---------------- */
app.post("/connect", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email required" });
  }

  await loadExcel();

  const user = users.find(
    u =>
      u.name === name.toLowerCase().trim() &&
      u.email === email.toLowerCase().trim()
  );

  if (!user) {
    return res.json({ status: "disconnect" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    status: "connect",
    token,
    user
  });
});

/* ---------------- SIGNUP (PUBLIC) ---------------- */
app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: "All fields required" });
  }

  const { workbook, sheet } = await loadExcel();

  const id = sheet.rowCount;
  sheet.addRow([id, name, email, role]);

  await workbook.xlsx.writeFile(FILE);
  res.json({ message: "User created successfully" });
});

/* ---------------- READ USERS (ADMIN ONLY) ---------------- */
app.get("/users", authenticate, authorize(["admin"]), async (req, res) => {
  await loadExcel();
  res.json(users);
});

/* ---------------- UPDATE USER ROLE (ADMIN ONLY) ---------------- */
app.patch("/users/:id/role", authenticate, authorize(["admin"]), async (req, res) => {
  const { role } = req.body;
  const id = Number(req.params.id);

  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  const { workbook, sheet } = await loadExcel();
  const row = sheet.getRow(id + 1);

  if (!row.getCell(1).value) {
    return res.status(404).json({ error: "User not found" });
  }

  row.getCell(4).value = role.toLowerCase();
  row.commit();

  await workbook.xlsx.writeFile(FILE);

  res.json({ message: "Role updated successfully" });
});


/* ---------------- UPDATE USER (ADMIN ONLY) ---------------- */
app.put("/users/:id", authenticate, authorize(["admin"]), async (req, res) => {
  const { name, email, role } = req.body;
  const id = Number(req.params.id);

  const { workbook, sheet } = await loadExcel();
  const row = sheet.getRow(id + 1);

  if (!row.getCell(1).value) {
    return res.status(404).json({ error: "User not found" });
  }

  row.getCell(2).value = name;
  row.getCell(3).value = email;
  row.getCell(4).value = role;
  row.commit();

  await workbook.xlsx.writeFile(FILE);
  res.json({ message: "User updated" });
});

/* ---------------- DELETE USER (ADMIN ONLY) ---------------- */
app.delete("/users/:id", authenticate, authorize(["admin"]), async (req, res) => {
  const id = Number(req.params.id);

  const { workbook, sheet } = await loadExcel();
  const row = sheet.getRow(id + 1);

  if (!row.getCell(1).value) {
    return res.status(404).json({ error: "User not found" });
  }

  sheet.spliceRows(id + 1, 1);
  await workbook.xlsx.writeFile(FILE);
  res.json({ message: "User deleted" });
});

/* ---------------- SERVER ---------------- */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
