exports.up = function (knex) {
  return knex.schema.createTable("shareLink", (table) => {
    table.increments();
    table.string("link");
    table.string("author");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("shareLink");
};
