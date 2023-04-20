/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("projects", {
    id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
    },
    user_id: {
      type: "uuid",
      notNull: true,
    },
    title: {
      type: "VARCHAR(105)",
    },
    app_type: {
      type: "VARCHAR(55)",
    },
    repo: {
      type: "VARCHAR(255)",
    },
    photo: {
      type: "VARCHAR(205)",
    },
    created_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint(
    "projects",
    "fk-projects.user_id-users.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE",
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint("projects", "fk-projects.user_id-users.id");
  pgm.dropTable("projects");
};
