const { execSync } = require("child_process");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.test" });

module.exports = async () => {
  // Exécuter les migrations sur la base de données de test
  execSync("npx prisma migrate deploy --preview-feature", { stdio: "inherit" });
};
