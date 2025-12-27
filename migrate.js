const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function runMigration() {
  try {
    const migrationFile = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql')
    const sql = fs.readFileSync(migrationFile, 'utf8')
    
    // 注意：Supabase JS客户端不直接支持执行SQL
    // 你需要通过Supabase Dashboard或使用psql客户端来运行迁移
    console.log('Migration SQL:')
    console.log('='.repeat(50))
    console.log(sql)
    console.log('='.repeat(50))
    console.log('\n请通过以下方式之一运行迁移:')
    console.log('1. 在Supabase Dashboard的SQL Editor中运行上述SQL')
    console.log('2. 使用psql客户端连接到数据库并运行迁移文件')
    console.log('3. 使用Supabase CLI: supabase db push')
  } catch (error) {
    console.error('Error running migration:', error)
    process.exit(1)
  }
}

runMigration()

