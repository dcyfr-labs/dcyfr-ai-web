import { eq } from 'drizzle-orm';
import { db, posts, type Post, type AppDb } from '@/db';
import { slugify } from '@dcyfr/utils';
import { NotFoundError, ForbiddenError } from '@/lib/errors';

export class PostService {
  constructor(private database: AppDb = db) {}

  async findPublished(): Promise<Post[]> {
    return this.database.select().from(posts).where(eq(posts.published, true));
  }

  async findByAuthor(authorId: number): Promise<Post[]> {
    return this.database.select().from(posts).where(eq(posts.authorId, authorId));
  }

  async findById(id: number): Promise<Post> {
    const [post] = await this.database.select().from(posts).where(eq(posts.id, id));
    if (!post) throw new NotFoundError('Post', id);
    return post;
  }

  async findBySlug(slug: string): Promise<Post> {
    const [post] = await this.database.select().from(posts).where(eq(posts.slug, slug));
    if (!post) throw new NotFoundError('Post');
    return post;
  }

  async create(data: {
    title: string;
    content: string;
    excerpt?: string;
    published?: boolean;
    authorId: number;
  }): Promise<Post> {
    const slug = slugify(data.title);

    const [post] = await this.database
      .insert(posts)
      .values({
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt || null,
        published: data.published ?? false,
        authorId: data.authorId,
      })
      .returning();

    return post;
  }

  async update(
    id: number,
    authorId: number,
    data: Partial<{ title: string; content: string; excerpt: string; published: boolean }>,
  ): Promise<Post> {
    const post = await this.findById(id);
    if (post.authorId !== authorId) throw new ForbiddenError('Not the post owner');

    const updateData: Record<string, unknown> = {
      ...data,
      updatedAt: new Date(),
    };
    if (data.title) {
      updateData.slug = slugify(data.title);
    }

    const [updated] = await this.database
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, id))
      .returning();

    return updated;
  }

  async delete(id: number, authorId: number): Promise<void> {
    const post = await this.findById(id);
    if (post.authorId !== authorId) throw new ForbiddenError('Not the post owner');
    await this.database.delete(posts).where(eq(posts.id, id));
  }
}
