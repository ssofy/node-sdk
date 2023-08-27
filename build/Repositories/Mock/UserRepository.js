"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const faker_1 = require("@faker-js/faker");
class UserRepository {
    create(user, password, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sampleUser();
        });
    }
    createToken(userId, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                token: '1234567890',
                ttl: 60 * 60,
            };
        });
    }
    deleteToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    find(field, value, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sampleUser();
        });
    }
    findByEmailOrCreate(user, password, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sampleUser();
        });
    }
    findById(id, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = this.sampleUser();
            user.id = id;
            return user;
        });
    }
    findBySocialLinkOrCreate(provider, user, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sampleUser();
        });
    }
    findByToken(token, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sampleUser();
        });
    }
    update(user, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return user;
        });
    }
    updatePassword(userId, password, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    verifyPassword(userId, password, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    sampleUser() {
        const locale = 'en';
        const timezones = ["Asia/Tokyo", "Europe/London"];
        const timezone = timezones[Math.floor(Math.random() * timezones.length)];
        const firstName = faker_1.faker.person.firstName();
        const lastName = faker_1.faker.person.lastName();
        const name = `${firstName} ${lastName}`;
        const genders = ['male', 'female'];
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const currentDate = new Date();
        const minAge = new Date(currentDate);
        minAge.setFullYear(minAge.getFullYear() - 18);
        const birthdate = minAge.toISOString().substring(0, 10);
        return {
            id: '1',
            hash: 'sandbox-user',
            display_name: name,
            name,
            username: faker_1.faker.internet.userName(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number('+440000000000'),
            picture: 'https://i.pravatar.cc/512',
            profile: 'https://example.com',
            given_name: faker_1.faker.person.firstName(gender),
            middle_name: 'NA',
            family_name: faker_1.faker.person.lastName(),
            nickname: faker_1.faker.person.firstName(gender),
            gender,
            birthdate,
            website: faker_1.faker.internet.domainName(),
            address: faker_1.faker.location.streetAddress(),
            location: faker_1.faker.location.latitude({ min: -90, max: 90 }) + ',' + faker_1.faker.location.longitude(),
            zoneinfo: timezone,
            locale,
            custom_1: faker_1.faker.lorem.text(),
            custom_2: faker_1.faker.lorem.text(),
            custom_3: faker_1.faker.lorem.text(),
            custom_4: faker_1.faker.lorem.text(),
            custom_5: faker_1.faker.lorem.text(),
            custom_6: faker_1.faker.lorem.text(),
            custom_7: faker_1.faker.lorem.text(),
            custom_8: faker_1.faker.lorem.text(),
            custom_9: faker_1.faker.lorem.text(),
            additional: {},
        };
    }
}
exports.UserRepository = UserRepository;
