import { DbServiceBase } from "./dbServiceBase/dbServiceBase.js";
export class ProductsDbService extends DbServiceBase {
    constructor() {
        super();
    }
    async createProduct(productData) {
        const category = await this.Knex('categories').where("categories.name", productData.category_id).first();
        if (!category) {
            throw new Error(`Failed to find category!`);
        }
        try {
            const [newProduct] = await this.Knex('products')
                .insert({
                title: productData.title,
                image: productData.image || null,
                price: this.Knex.raw('CAST(? AS DECIMAL(10,2))', [productData.price]),
                category_id: category.id || null
            })
                .returning('*');
            return newProduct;
        }
        catch (error) {
            if (error.code === '23503') { // Foreign key constraint (category_id)
                throw new Error('Invalid category ID');
            }
            throw new Error(`Failed to create product: ${error.message}`);
        }
    }
    async getById(id) {
        return this.Knex("products")
            .where("id", id).first();
    }
    async getByTitle(title) {
        return this.Knex("products")
            .where("products.title", title).first();
    }
    // Get product with category information
    async getWithCategory(id) {
        return this.Knex("products")
            .where("products.id", id)
            .join("categories", "products.category_id", "categories.id")
            .select("products.*", "categories.name as category_name", "categories.parent_id as category_parent_id");
    }
    // Get all products with their category information
    async getAllWithCategories(filter) {
        const query = this.Knex("products")
            .join("categories", "products.category_id", "categories.id")
            .select("products.*", "categories.name as category_name", "categories.parent_id as category_parent_id");
        // Apply filter if provided
        if (filter.category_id) {
            query.where("products.category_id", filter.category_id);
        }
        return query;
    }
    async getPopularProducts() {
        return this.Knex("products")
            .orderBy("created_at", "desc")
            .limit(10);
    }
    // Get products by category ID (including pagination optional)
    async getByCategoryId(categoryId, page = 1, pageSize = 10) {
        return this.Knex("products")
            .where("category_id", categoryId)
            .offset((page - 1) * pageSize)
            .limit(pageSize);
    }
    // Get products by search term (title)
    async searchByTitle(searchTerm) {
        return this.Knex("products")
            .where("title", "ilike", `%${searchTerm}%`);
    }
    // Update product price
    async updatePrice(id, newPrice) {
        return this.Knex("products").update(id, { price: newPrice });
    }
    async updateById(id, data) {
        try {
            const category = await this.Knex("categories").where({ name: data.category_id }).first();
            if (!category) {
                throw new Error("Category not found!");
            }
            // Update the product
            const updatedCount = await this.Knex('products')
                .where({ id })
                .update({
                ...data,
                category_id: category.id,
                updated_at: this.Knex.fn.now() // Add timestamp for update
            });
            if (updatedCount === 0) {
                return null; // Product not found
            }
            // Fetch and return the updated product
            const updatedProduct = await this.Knex('products')
                .where({ id })
                .first();
            return updatedProduct;
        }
        catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }
    ;
    async deleteById(id) {
        try {
            const [deletedProduct] = await this.Knex('products')
                .where({ id })
                .del()
                .returning('*');
            return deletedProduct || null;
        }
        catch (error) {
            throw new Error(`Error deleting product ${id}: ${error.message}`);
        }
    }
}
export default new ProductsDbService();
