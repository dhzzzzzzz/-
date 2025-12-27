const { createClient } = require('@supabase/supabase-js')
const websitesData = require('../data/websites.json')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedData() {
  try {
    console.log('开始导入数据...')
    
    // 获取所有分类
    const categories = [...new Set(websitesData.map(w => w.category))]
    
    // 插入分类
    for (const category of categories) {
      const slug = category.toLowerCase().replace(/\s+/g, '-')
      const { error } = await supabase
        .from('categories')
        .upsert({ name: category, slug }, { onConflict: 'slug' })
      
      if (error && error.code !== '23505') { // 忽略唯一约束错误
        console.error(`Error inserting category ${category}:`, error)
      }
    }
    
    console.log(`已导入 ${categories.length} 个分类`)
    
    // 插入网站数据
    const { data, error } = await supabase
      .from('websites')
      .upsert(websitesData, { onConflict: 'url' })
      .select()
    
    if (error) {
      console.error('Error inserting websites:', error)
      process.exit(1)
    }
    
    console.log(`已导入 ${data.length} 个网站`)
    console.log('数据导入完成！')
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seedData()

