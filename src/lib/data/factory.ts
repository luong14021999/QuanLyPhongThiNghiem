import {
  readCollection,
  writeCollection,
  appendItem,
  updateItem,
  deleteItem,
} from "@/lib/storage/file-storage";
import {
  createServerClient,
  createAdminClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export type EntityStore<T extends { id: string }> = {
  collection: string;
  list: () => Promise<T[]>;
  create: (item: T) => Promise<T>;
  update: (id: string, patch: Partial<T>) => Promise<T | null>;
  remove: (id: string) => Promise<boolean>;
  replaceAll: (items: T[]) => Promise<void>;
};

/**
 * Cấu hình mapping camelCase TS ↔ snake_case Postgres.
 * Khi cấu hình + env Supabase OK → CRUD đi qua DB, ngược lại fallback file.
 */
export type SupabaseMapping<T> = {
  table: string;
  select: string;
  toEntity: (row: Record<string, unknown>) => T;
  toRow: (entity: Partial<T>) => Record<string, unknown>;
};

/**
 * Convert empty string → null cho date/timestamp columns.
 * Postgres không nhận "" cho type date/timestamptz.
 */
export const dateOrNull = (v?: string | null) =>
  v && v !== "" ? v : null;

export function createEntityStore<T extends { id: string }>(
  collection: string,
  mockData: T[],
  supabase?: SupabaseMapping<T>,
): EntityStore<T> {
  const useSupabase = () => Boolean(supabase) && isSupabaseConfigured();

  return {
    collection,

    async list() {
      if (useSupabase() && supabase) {
        const client = createServerClient();
        const { data, error } = await client
          .from(supabase.table)
          .select(supabase.select);
        if (!error && data) {
          return (data as unknown as Record<string, unknown>[]).map(supabase.toEntity);
        }
        if (error) {
          console.error(
            `[${collection}] supabase list error:`,
            error.message,
          );
        }
      }
      return readCollection<T>(collection, mockData);
    },

    async create(item: T) {
      if (useSupabase() && supabase) {
        const client = createAdminClient();
        const { data, error } = await client
          .from(supabase.table)
          .insert(supabase.toRow(item))
          .select(supabase.select)
          .single();
        if (error) throw new Error(error.message);
        return supabase.toEntity(data as unknown as Record<string, unknown>);
      }
      return appendItem<T>(collection, item, mockData);
    },

    async update(id, patch) {
      if (useSupabase() && supabase) {
        const client = createAdminClient();
        const { data, error } = await client
          .from(supabase.table)
          .update(supabase.toRow(patch))
          .eq("id", id)
          .select(supabase.select)
          .single();
        if (error) return null;
        return supabase.toEntity(data as unknown as Record<string, unknown>);
      }
      return updateItem<T>(collection, id, patch, mockData);
    },

    async remove(id) {
      if (useSupabase() && supabase) {
        const client = createAdminClient();
        const { error } = await client
          .from(supabase.table)
          .delete()
          .eq("id", id);
        return !error;
      }
      return deleteItem<T>(collection, id, mockData);
    },

    replaceAll: (items) => writeCollection<T>(collection, items),
  };
}
