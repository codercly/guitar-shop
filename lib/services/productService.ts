import dbConnect from '../dbConnect'
import ProductModel, { Product } from '@/lib/models/ProductModel'
// use cache to cache database query result and prevent multiple hiting databse
import { cache } from 'react'

export const revalidate = 3600

const getLatest = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({}).sort({ _id: -1 }).limit(8).lean() //converts result to jsObject
  return products as Product[]
})

const getFeatured = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
  return products as Product[]
})

const getBySlug = cache(async (slug: string) => {
  await dbConnect()
  const product = await ProductModel.findOne({ slug }).lean()
  return product as Product
})

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
}

export default productService
