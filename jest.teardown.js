const { execSync } = require("child_process");

module.exports = async () => {
  // Ici, tu pourrais ajouter une logique pour nettoyer ou remettre à zéro la base de données
  // Par exemple, supprimer toutes les tables ou exécuter un script SQL spécifique
  execSync("npx prisma migrate reset --preview-feature --force", {
    stdio: "inherit",
  });
};
