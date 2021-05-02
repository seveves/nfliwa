module.exports = (req, res) => {
  res.json({ datocms: process.env.DATOCMS_API_TOKEN });
};
