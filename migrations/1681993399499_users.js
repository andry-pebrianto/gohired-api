/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
    },
    name: {
      type: "VARCHAR(105)",
      notNull: true,
    },
    photo: {
      type: "VARCHAR(205)",
    },
    email: {
      type: "VARCHAR(55)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "VARCHAR(205)",
      notNull: true,
    },
    phone: {
      type: "VARCHAR(15)",
    },
    address: {
      type: "VARCHAR(105)",
    },
    description: {
      type: "VARCHAR(255)",
    },
    email_token: {
      type: "VARCHAR(205)",
    },
    instagram: {
      type: "VARCHAR(255)",
    },
    github: {
      type: "VARCHAR(255)",
    },
    linkedin: {
      type: "VARCHAR(255)",
    },
    level: {
      type: "INTEGER",
      default: 2,
    },
    is_verified: {
      type: "INTEGER",
      default: 0,
    },
    created_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
