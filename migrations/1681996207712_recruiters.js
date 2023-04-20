/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("recruiters", {
    id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
    },
    user_id: {
      type: "uuid",
      notNull: true,
    },
    company_name: {
      type: "VARCHAR(105)",
      notNull: true,
    },
    position: {
      type: "VARCHAR(55)",
      notNull: true,
    },
  });

  pgm.addConstraint(
    "recruiters",
    "fk-recruiters.user_id-users.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE",
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("recruiters", "fk-recruiters.user_id-users.id");
  pgm.dropTable("recruiters");
};
