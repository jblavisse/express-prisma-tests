// tests/models/Post.test.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Post model", () => {
  let createdAuthor;

  beforeAll(async () => {
    // Création d'un auteur pour le post
    createdAuthor = await prisma.user.create({
      data: {
        // Assure-toi de fournir les champs nécessaires pour créer un utilisateur
        name: "Auteur Test",
        email: "auteur@test.com",
        // Ajoute d'autres champs requis par le modèle User ici
      },
    });
  });

  it("should create and find a post", async () => {
    const postData = {
      title: "Mon super post",
      content: "Contenu de mon super post",
      published: false,
      authorId: createdAuthor.id,
    };

    // Création du post
    const createdPost = await prisma.post.create({
      data: postData,
    });

    expect(createdPost).toBeDefined();
    expect(createdPost.title).toBe(postData.title);
    expect(createdPost.content).toBe(postData.content);
    expect(createdPost.published).toBe(postData.published);
    expect(createdPost.authorId).toBe(postData.authorId);

    // Recherche du post
    const foundPost = await prisma.post.findUnique({
      where: { id: createdPost.id },
    });

    expect(foundPost).toBeDefined();
    expect(foundPost.title).toBe(postData.title);
    expect(foundPost.content).toBe(postData.content);
    expect(foundPost.published).toBe(postData.published);
    expect(foundPost.authorId).toBe(postData.authorId);
  });

  afterAll(async () => {
    // Nettoyage: Supprimer les données de test créées
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });
});
