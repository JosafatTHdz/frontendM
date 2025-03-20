export type Category = {
    _id: string
    name: string
    description: string
    image: string
    createdAt: Date
}
export type CategoryForm = Pick<Category, 'name' | 'description' | 'image'>
export type CategoryResponse = {
    data: Category[]
    success: boolean
}