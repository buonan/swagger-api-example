import * as mongoose from 'mongoose';

export default abstract class AbstractService<T> {
    private model: mongoose.Model<T>;

    constructor(model: mongoose.Model<T>) {
        this.model = model
    }

    async create(body: any): Promise<T> {
        const obj = await new this.model(body).save();
        return obj as unknown as T;
    }

    async getAll(): Promise<T[]> {
        const all = await this.model.find()
        return all;
    }

    async get(id: string): Promise<T | null> {
        const obj = await this.model.findById(id);
        return obj;
    }

    async update(id: string, body: any): Promise<T | null> {
        const obj = await this.model.findByIdAndUpdate(id, body, { new: true })
        return obj;
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
    }
}
