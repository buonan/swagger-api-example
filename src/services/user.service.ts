
import UserModel, { IUser } from '../models/user.model';
import AbstractService from './abstract.service'
import bcrypt from '../helpers/bcrypt';

export default class UserService extends AbstractService<IUser> {
    constructor() {
        super(UserModel);
    }

    async create(body: IUser): Promise<IUser> {
        body.password = body.password ? bcrypt.encrypt(body.password) : undefined;
        return await super.create(body);
    }

    async getAll(): Promise<IUser[]> {
        return await super.getAll();
    }

    async getOne(id: string): Promise<IUser | null> {
        return await super.get(id);
    }

    async update(id: string, body: IUser): Promise<IUser | null> {
        body.password = body.password ? bcrypt.encrypt(body.password) : undefined;
        return await super.update(id, body);
    }

    async delete(id: string) {
        return await super.delete(id);
    }
}
