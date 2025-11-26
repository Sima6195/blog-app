import prisma from "../prisma.js";

export async function getAllPosts(req, res) {
  const posts = await prisma.posts.findMany({
 
    orderBy: { createdAt: "desc" }
  });
  res.json(posts);
}

export async function createPost(req, res) {
  const post = await prisma.posts.create({
    data: {
        title: req.body.title,
      content: req.body.content,
      authorId: req.user.id
    }
  });
  res.json(post);
}
export async function updatePost(req, res) {
  const { id } = req.params;

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });

  if (!post || post.authorId !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  const updated = await prisma.post.update({
    where: { id: Number(id) },
    data: { content: req.body.content }
  });

  res.json(updated);
}

export async function deletePost(req, res) {
  const { id } = req.params;

  const post = await prisma.post.findUnique({ where: { id: Number(id) } });

  if (!post || post.authorId !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  await prisma.post.delete({ where: { id: Number(id) } });
  res.json({ message: "Post deleted" });
}
