/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("workers", {
    id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
    },
    user_id: {
      type: "uuid",
      notNull: true,
    },
    job_type: {
      type: "VARCHAR(55)",
    },
    job_desk: {
      type: "VARCHAR(55)",
    },
    skills: {
      type: "text[]",
      default: "{}",
    },
  });

  pgm.addConstraint(
    "workers",
    "fk-workers.user_id-users.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE",
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("workers", "fk-workers.user_id-users.id");
  pgm.dropTable("workers");
};
