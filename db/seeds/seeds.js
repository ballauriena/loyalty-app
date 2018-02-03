var faker = require('faker');

var fakeUsers = []
for (i = 0; i < 30; i++) {
    fakeUsers.push({
        id: i,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber()
    });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createInitialCheckin(knex, user) {
    return knex('checkins').insert({
        user_id: user.id,
        points: 50
    })
}

function createOtherCheckin(knex, user) {
    return knex('checkins').insert({
        user_id: user.id,
        points: 20
    })
}

exports.seed = function(knex, Promise) {
    return knex('checkins').del()
        .then(function() {
            return knex('users').del()
        })
        .then(function() {
            return knex('users').insert(fakeUsers);
        })
        .then(function () {

            var promises = [];
            fakeUsers.forEach(function(user) {
                promises.push(createInitialCheckin(knex, user));

                var num = randomInt(1, 5)
                for (var i = 0; i <= num; i++) {
                    promises.push(createOtherCheckin(knex, user));
                }
            });

            return Promise.all(promises);
        });
};
