const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()

app.use(cors())
app.use(express.json())

//  CONNECT DATABASE
const pool = new Pool({
    connectionString: "YOUR_DATABASE_URL",
    ssl: {
        rejectUnauthorized: false
    }
})

// CREATE TABLE (auto)
pool.query(`
    CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name TEXT,
        age INT,
        email TEXT,
        phone TEXT
    )
`)

// API
app.post("/join", async (req, res) => {
    const { name, age, email, phone } = req.body

    try {
        await pool.query(
            "INSERT INTO students (name, age, email, phone) VALUES ($1, $2, $3, $4)",
            [name, age, email, phone]
        )

        res.json({ message: "Data saved successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error saving data" })
    }
})

app.get("/", (req, res) => {
    res.send("Backend running")
})

app.listen(3000, () => {
    console.log("Server started")
})
