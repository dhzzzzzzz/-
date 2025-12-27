import { MeiliSearch } from 'meilisearch'

const meilisearchHost = process.env.MEILISEARCH_HOST || 'http://localhost:7700'
const meilisearchMasterKey = process.env.MEILISEARCH_MASTER_KEY || 'masterKey'

export const meilisearchClient = new MeiliSearch({
  host: meilisearchHost,
  apiKey: meilisearchMasterKey,
})

export const WEBSITES_INDEX = 'websites'

// 初始化索引
export async function initMeilisearch() {
  try {
    const index = meilisearchClient.index(WEBSITES_INDEX)
    
    // 配置搜索属性
    await index.updateSearchableAttributes([
      'name',
      'description',
      'category'
    ])
    
    // 配置过滤属性
    await index.updateFilterableAttributes([
      'category'
    ])
    
    // 配置排序属性
    await index.updateSortableAttributes([
      'created_at',
      'name'
    ])
    
    console.log('Meilisearch index configured successfully')
  } catch (error) {
    console.error('Error initializing Meilisearch:', error)
  }
}

