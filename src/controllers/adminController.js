import prisma from "../prisma.js";

export async function getAllUsers(req, res) {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.json(users);
}

export async function deleteUser(req, res) {
  const { id } = req.params;

  await prisma.user.delete({ where: { id: Number(id) } });
  res.json({ message: "User deleted" });
}

export async function deletePostAdmin(req, res) {
  const { id } = req.params;

  await prisma.post.delete({ where: { id: Number(id) } });
  
  res.json({ message: "Post deleted by admin" });
}
