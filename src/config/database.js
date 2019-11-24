module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'adsoft',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
