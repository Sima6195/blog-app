import prisma from "../prisma.js";

export async function getProfile(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { posts: true }
  });
  res.json(user);
}

export async function updateProfile(req, res) {
  const { name, email } = req.body;

  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: { name, email }
  });
  res.json(updated);
}
