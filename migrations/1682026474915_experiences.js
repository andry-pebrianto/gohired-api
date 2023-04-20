/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("experiences", {
    id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
    },
    user_id: {
      type: "uuid",
      notNull: true,
    },
    position: {
      type: "VARCHAR(55)",
    },
    photo: {
      type: "VARCHAR(205)",
    },
    company: {
      type: "VARCHAR(105)",
    },
    description: {
      type: "VARCHAR(255)",
    },
    start_date: {
      type: "DATE",
    },
    end_date: {
      type: "DATE",
    },
    created_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint(
    "experiences",
    "fk-experiences.user_id-users.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE",
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("experiences", "fk-experiences.user_id-users.id");
  pgm.dropTable("experiences");
};
