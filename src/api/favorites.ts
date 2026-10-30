import { supabase } from "../utils/supabase";

async function getCurrentUser() {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (sessionData.session?.user) {
    return sessionData.session.user;
  }

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("Supabase n'a pas créé d'utilisateur anonyme.");
  }

  return data.user;
}

export async function getFavoriteEventIds(): Promise<number[]> {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from("favorite")
    .select("id_event")
    .eq("id_user", user.id);

  if (error) {
    throw error;
  }

  return (data ?? [])
    .map((favorite) => Number(favorite.id_event))
    .filter((id) => Number.isInteger(id));
}

export async function addFavorite(idEvent: number): Promise<void> {
  const user = await getCurrentUser();
  const { error } = await supabase.from("favorite").upsert(
    {
      id_event: idEvent,
      id_user: user.id,
      timestamp: new Date().toISOString(),
    },
    { onConflict: "id_event,id_user" },
  );

  if (error) {
    throw error;
  }
}

export async function removeFavorite(idEvent: number): Promise<void> {
  const user = await getCurrentUser();
  const { error } = await supabase
    .from("favorite")
    .delete()
    .eq("id_event", idEvent)
    .eq("id_user", user.id);

  if (error) {
    throw error;
  }
}
