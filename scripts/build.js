const fs = require('fs')

const path = 'libs/config.js'

try {
  fs.unlinkSync(path)
} catch (err) {}

fs.appendFileSync(path, `export const baseUrl = "${process.env.BASE_URL}"\n`)
fs.appendFileSync(
  path,
  `export const supabaseUrl = "${process.env.SUPABASE_URL}"\n`
)
fs.appendFileSync(
  path,
  `export const supabaseKey = "${process.env.SUPABASE_KEY}"\n`
)
