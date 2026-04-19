import { eq } from 'drizzle-orm';
import { db, users, type User, type NewUser, type AppDb } from '@/db';
import { hashPassword } from '@/lib/auth';
import { NotFoundError, ConflictError } from '@/lib/errors';

type SafeUser = Omit<User, 'passwordHash'>;

function omitPassword(user: User): SafeUser {
  const { passwordHash: _, ...safe } = user;
  return safe;
}

export class UserService {
  constructor(private database: AppDb = db) {}

  async findAll(): Promise<SafeUser[]> {
    const allUsers = await this.database.select().from(users);
    return allUsers.map(omitPassword);
  }

  async findById(id: number): Promise<SafeUser> {
    const [user] = await this.database.select().from(users).where(eq(users.id, id));
    if (!user) throw new NotFoundError('User', id);
    return omitPassword(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.database.select().from(users).where(eq(users.email, email));
    return user;
  }

  async create(data: { email: string; name: string; password: string }): Promise<SafeUser> {
    const existing = await this.findByEmail(data.email);
    if (existing) throw new ConflictError('Email already registered');

    const [user] = await this.database
      .insert(users)
      .values({
        email: data.email,
        name: data.name,
        passwordHash: hashPassword(data.password),
      })
      .returning();

    return omitPassword(user);
  }

  async update(id: number, data: Partial<Pick<User, 'name' | 'email'>>): Promise<SafeUser> {
    await this.findById(id); // throws if not found

    const [updated] = await this.database
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return omitPassword(updated);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // throws if not found
    await this.database.delete(users).where(eq(users.id, id));
  }
}
