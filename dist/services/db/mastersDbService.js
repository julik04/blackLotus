import { DbServiceBase } from "./dbServiceBase/dbServiceBase.js";
export class MastersDbService extends DbServiceBase {
    constructor() {
        super();
    }
    async updateMasterImage(id, imagePath) {
        return this.updateById(id, { image: imagePath });
    }
    async createMaster(masterData) {
        try {
            const [newMaster] = await this.Knex('masters')
                .insert({
                name: masterData.name,
                image: masterData.image || null,
                resume: masterData.resume || null,
                experience: masterData.experience || null,
                gallery: masterData.gallery ? JSON.stringify(masterData.gallery) : null
            })
                .returning('*');
            return newMaster;
        }
        catch (error) {
            throw new Error(`Failed to create master: ${error.message}`);
        }
    }
    async getById(id) {
        const master = await this.Knex("masters")
            .where("masters.id", id)
            .first();
        if (master && master.gallery) {
            try {
                // Check if gallery is already an array
                if (Array.isArray(master.gallery)) {
                    return master;
                }
                // Try to parse if it's a string
                master.gallery = JSON.parse(master.gallery);
            }
            catch (e) {
                console.error("Error parsing gallery JSON:", e);
                // If parsing fails, check if it's a single path string
                if (typeof master.gallery === 'string') {
                    master.gallery = [master.gallery]; // Convert to array with single item
                }
                else {
                    master.gallery = []; // Default to empty array
                }
            }
        }
        return master;
    }
    async getByName(name) {
        return this.Knex("masters")
            .where("masters.name", name)
            .first();
    }
    async getAll(filter = {}) {
        const query = this.Knex("masters")
            .select("*");
        // Применяем фильтры, если они есть
        if (filter.experience) {
            query.where("experience", ">=", filter.experience);
        }
        return query;
    }
    async getWithDetails(id) {
        return this.Knex("masters")
            .where("masters.id", id)
            .select("masters.*")
            .first();
    }
    async getAllWithDetails(filter = {}) {
        const query = this.Knex("masters")
            .select("masters.*");
        // Применяем фильтры
        if (filter.experience) {
            query.where("masters.experience", ">=", filter.experience);
        }
        return query;
    }
    async updateById(id, data) {
        try {
            const updatedCount = await this.Knex('masters')
                .where({ id })
                .update({
                ...data,
                gallery: data.gallery ? JSON.stringify(data.gallery) : null,
                updated_at: this.Knex.fn.now()
            });
            if (updatedCount === 0) {
                return null;
            }
            const updatedMaster = await this.Knex('masters')
                .where({ id })
                .first();
            return updatedMaster;
        }
        catch (error) {
            console.error('Error updating master:', error);
            throw error;
        }
    }
    async deleteById(id) {
        try {
            const [deletedMaster] = await this.Knex('masters')
                .where({ id })
                .del()
                .returning('*');
            return deletedMaster || null;
        }
        catch (error) {
            throw new Error(`Error deleting master ${id}: ${error.message}`);
        }
    }
    async searchByName(searchTerm) {
        return this.Knex("masters")
            .where("name", "ilike", `%${searchTerm}%`);
    }
}
export default new MastersDbService();
