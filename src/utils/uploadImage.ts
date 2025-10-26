import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`;
    const { error } = await supabase.storage.from("products").upload(fileName, file);
    if (error) throw error;

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    return data.publicUrl;
  });

  return await Promise.all(uploadPromises);
}
