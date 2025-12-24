import request from '@/utils/request'

// 获取面经列表参数
export interface ArticlesParams {
  current?: number
  keyWord?: string
  pageSize?: number
  sorter?: string
  stem?: string
}

// 通用服务器返回格式
export interface ServiceResponse<T> {
  code: number
  message: string
  data: T // T 表示变化的类型(泛型)
}

// 获取面经列表返回数据
export interface ArticlesResponse {
  current: number
  pageSize: number
  pageTotal: number
  rows: ArticleRowItem[] // 文章列表
  total: number
}

// 文章列表项
export interface ArticleRowItem {
  id: string
  avatar: string
  collectFlag: number
  content: string
  createdAt: string
  creator: string
  likeCount: number
  likeFlag: number
  stem: string
  views: number
}

// 文章列表接口
export const getArticlesAPI = (
  params: ArticlesParams,
): Promise<ServiceResponse<ArticlesResponse>> => {
  return request.get('/h5/interview/query', {
    // 接口文档的 query 参数，在 axios 中，通过 params 配置项传递
    params: {
      current: params.current || 1,
      pageSize: params.pageSize || 10,
      sorter: params.sorter,
    },
  })
}

export interface OptListParams {
  page?: number
  pageSize?: number
  optType?: number
}

export interface OptListResponse {
  rows: ArticleRowItem[]
  pageTotal: number
  total: number
}

// 收藏列表
export const getArticlesCollectAPI = (
  params: OptListParams,
): Promise<ServiceResponse<OptListResponse>> => {
  return request.get('/h5/interview/opt/list', {
    params: {
      page: params.page || 1,
      pageSize: params.pageSize,
      optType: 2,
    },
  })
}

// 喜欢列表
export const getArticlesLikeAPI = (
  params: OptListParams,
): Promise<ServiceResponse<OptListResponse>> => {
  return request.get('/h5/interview/opt/list', {
    params: {
      page: params.page || 1,
      pageSize: params.pageSize,
      optType: 1,
    },
  })
}

export const getArticleDetailAPI=(
  id:string
):Promise<ServiceResponse<ArticleRowItem>>=>{
  return request.get('h5/interview/show',{
    params:{id:id}
  })
}

export const updateLikeAPI=(id:string)=>{
  return request.post('/h5/interview/opt',{
    id:id,
    optType:1
  })
}

export const updateCollectAPI=(id:string)=>{
  return request.post('/h5/interview/opt',{
    id:id,
    optType:2
  })
}