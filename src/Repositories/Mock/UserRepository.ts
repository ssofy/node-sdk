import {Repositories} from "..";
import {Models} from "../../Models";
import {faker} from '@faker-js/faker';

export class UserRepository implements Repositories.UserRepository {
    async create(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity> {
        return this.sampleUser();
    }

    async createToken(userId: string, ttl?: number): Promise<Models.TokenEntity> {
        return {
            token: '1234567890',
            ttl: 60 * 60,
        };
    }

    async deleteToken(token: string): Promise<void> {
        return;
    }

    async find(field: string, value: string, ip?: string): Promise<Models.UserEntity | null> {
        return this.sampleUser();
    }

    async findByEmailOrCreate(user: Models.UserEntity, password?: string, ip?: string): Promise<Models.UserEntity> {
        return this.sampleUser();
    }

    async findById(id: string, ip?: string): Promise<Models.UserEntity | null> {
        let user = this.sampleUser();
        user.id = id;

        return user;
    }

    async findBySocialLinkOrCreate(provider: string, user: Models.UserEntity, ip?: string): Promise<Models.UserEntity> {
        return this.sampleUser();
    }

    async findByToken(token: string, ip?: string): Promise<Models.UserEntity | null> {
        return this.sampleUser();
    }

    async update(user: Models.UserEntity, ip?: string): Promise<Models.UserEntity> {
        return user;
    }

    async updatePassword(userId: string, password: string, ip?: string): Promise<void> {
        return;
    }

    async verifyPassword(userId: string, password?: string, ip?: string): Promise<boolean> {
        return true;
    }

    private sampleUser(): Models.UserEntity {
        const locale = 'en';

        const timezones: string[] = ["Asia/Tokyo", "Europe/London"];
        const timezone = timezones[Math.floor(Math.random() * timezones.length)];

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const name = `${firstName} ${lastName}`;

        const genders = ['male', 'female'];
        const gender = genders[Math.floor(Math.random() * genders.length)] as "male" | "female";

        const currentDate = new Date();
        const minAge = new Date(currentDate);
        minAge.setFullYear(minAge.getFullYear() - 18);
        const birthdate = minAge.toISOString().substring(0, 10);

        return {
            id: '1',
            hash: 'sandbox-user',
            display_name: name,
            name,
            username: faker.internet.userName(),
            email: faker.internet.email(),
            phone: faker.phone.number('+440000000000'),
            picture: 'https://i.pravatar.cc/512',
            profile: 'https://example.com',
            given_name: faker.person.firstName(gender),
            middle_name: 'NA',
            family_name: faker.person.lastName(),
            nickname: faker.person.firstName(gender),
            gender,
            birthdate,
            website: faker.internet.domainName(),
            address: faker.location.streetAddress(),
            location: faker.location.latitude({min: -90, max: 90}) + ',' + faker.location.longitude(),
            zoneinfo: timezone,
            locale,
            custom_1: faker.lorem.text(),
            custom_2: faker.lorem.text(),
            custom_3: faker.lorem.text(),
            custom_4: faker.lorem.text(),
            custom_5: faker.lorem.text(),
            custom_6: faker.lorem.text(),
            custom_7: faker.lorem.text(),
            custom_8: faker.lorem.text(),
            custom_9: faker.lorem.text(),
            additional: {},
        };
    }
}
