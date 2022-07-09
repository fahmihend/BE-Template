import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import { LoginDto, RegisterDTO } from 'src/dto/auth.dto';
import { Token } from 'src/models/token';
import { Users } from 'src/models/users';
import { EntityRepository, getConnection, Repository } from 'typeorm';

@EntityRepository(Users)
export class AuthRepository extends Repository<Users> {
    async register(params: RegisterDTO) {
        try {
            const mindiff = moment().utcOffset();
            const now = moment().add(mindiff, 'minutes').toDate();
            const salt = await bcrypt.genSalt(10);
            const checkUsername = await Users.createQueryBuilder('users')
                .where('users.username = :username', { username: params.username })
                .getCount();
            if (checkUsername > 0) throw new Error('Username already exist');
            if (params.password !== params.confirmPassword) throw new Error('Password not match');
            const hashPassword = await bcrypt.hash(params.password, salt);
            const result = await Users.createQueryBuilder().insert().values({
                username: params.username,
                password: hashPassword,
                role: params.role
            })
                .execute();

            const dataUser = await Users.createQueryBuilder('users')
                .select(['users.id'])
                .where('users.username = :username', { username: params.username })
                .getOne();
            return dataUser;
        } catch (e) {
            throw e;
        }
    }

    async login(params: LoginDto) {
        try {
            const user = await Users.createQueryBuilder('users')
                .where('users.username = :username', { username: params.username })
                .getOne();
            if (!user) throw new Error('Username not found');
            const checkPassword = await bcrypt.compare(params.password, user.password);
            if (!checkPassword) throw new Error('Password is incorrect');
            const result = {
                username: user.username,
                role: user.role,
            }
            return result;
        } catch (e) {
            throw e;
        }
    }

    async insertToken(
        username: string,
        params: any
    ) {
        try {
            const checkUser = await Users.createQueryBuilder('users')
                .where('users.username = :username', { username: username })
                .getOne();
            const mindiff = moment().utcOffset();
            const now = moment().add(mindiff, 'minutes').toDate();
            const result = await Token.createQueryBuilder().insert().values({
                userId: checkUser.id,
                username: checkUser.username,
                accessToken: params.access_token,
                refreshToken: params.refresh_token,
                createdDate: now,
                modifiedDate: now,
            })
                .execute();
            return null
        } catch (error) {
            return error
        }
    }

    async updateToken(username: string, token: any, refreshToken: string) {
        const mindiff = moment().utcOffset();
        const now = moment().add(mindiff, 'minutes').toDate();
        const result = await this.createQueryBuilder()
            .update(Token)
            .set({
                accessToken: token.access_token,
                refreshToken: token.refresh_token,
                modifiedDate: now,
            })
            .where('username = :username', { username: username })
            .andWhere('refresh_token = :refreshToken', { refreshToken: refreshToken })
            .execute();
    }
}