import { DbServiceBase } from "./dbServiceBase/dbServiceBase.js";
import bcrypt from 'bcrypt';
export class UsersDbService extends DbServiceBase {
    pepper;
    constructor() {
        super();
        const pepper = process.env.SECURITY_PEPPER;
        if (!pepper) {
            throw new Error('SECURITY_PEPPER environment variable is not set');
        }
        this.pepper = pepper;
    }
    async getById(id) {
        return this.Knex("users")
            .where("users.id", id).first();
    }
    async findByLogin(login) {
        return this.Knex("users").where("users.login", login).first();
    }
    async createUser(userData) {
        const [user] = await this.Knex('users')
            .insert({
            ...userData
        })
            .returning('*');
        return user;
    }
    async updateAccessToken(id, accessToken) {
        const [user] = await this.Knex('users')
            .where({ id })
            .update({ accessToken: accessToken })
            .returning('*');
        return user;
    }
    async deleteUser(id) {
        await this.Knex('users')
            .where({ id })
            .delete();
    }
    async listUsers() {
        return this.Knex('users').select();
    }
    async hashPassword(password) {
        const combinedString = `${password}${this.pepper}`;
        const saltRounds = 10;
        try {
            const hash = await bcrypt.hash(combinedString, saltRounds);
            return hash;
        }
        catch (error) {
            throw new Error('Error hashing password');
        }
    }
    async comparePassword(password, hash) {
        const combinedString = `${password}${this.pepper}`;
        try {
            const match = await bcrypt.compare(combinedString, hash);
            return match;
        }
        catch (error) {
            throw new Error('Error comparing passwords');
        }
    }
}
export default new UsersDbService();
