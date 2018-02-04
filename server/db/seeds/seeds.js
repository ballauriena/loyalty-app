const faker = require('faker');
const phoneNumberUtils = require('../../utils/phoneNumber.js');
const User = require('../../models/user.js');

const fakeUsers = []
for (i = 1; i < 31; i++) {
    fakeUsers.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone: phoneNumberUtils.sanitize(faker.phone.phoneNumber()),
        email: faker.internet.email()
    });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createUser(knex, user) {
    return knex
        .table('users')
        .returning('id')
        .insert(user)
        .then(function(ids) {
            const promises = [];

            promises.push(createInitialCheckin(knex, ids[0]));
            for (var i = 0; i <= randomInt(1,5); i++) {
                promises.push(createOtherCheckin(knex, ids[0]));
            }

            return Promise.all(promises);
        })
}

function createInitialCheckin(knex, userId) {
    return knex('checkins').insert({
        user_id: userId,
        points: 50
    })
}

function createOtherCheckin(knex, userId) {
    return knex('checkins').insert({
        user_id: userId,
        points: 20
    })
}

exports.seed = function(knex, Promise) {
    const promises = [];
    fakeUsers.forEach(function(user) {
        promises.push(createUser(knex, user));
    });

    return Promise.all(promises);
}
