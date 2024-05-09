import { supabase } from ".";
import { Database } from "./database.types";

export const fetchFilterData = async (name: string) => {
  let query = supabase.from("Models").select("*, Types(name), Items(count)");

  if (name !== "all") {
    query = query.filter("Types.name", "eq", name);
  }

  const { data } = await query;

  // TODO: Refactor this line
  return data?.filter((i) => i.Types);
};

export const loadFilterData = async ({ params }: any) => {
  return fetchFilterData(params.name);
};

export const getItemsToSell = async (modelId: string, count: number) => {
  return supabase.from("Items").select().eq("modelId", modelId).limit(count);
};

export const sellItems = async (
  payload: Database["public"]["Tables"]["BuyItems"]["Insert"][],
  id: string,
) => {
  return Promise.all([
    supabase.from("BuyItems").insert(payload),
    supabase
      .from("Items")
      .delete({ count: "exact" })
      .eq("modelId", id)
      .limit(payload.length)
      .order("id"),
  ]);
};

const fetchProductData = async (id: string) => {
  const { data } = await supabase.from("Models").select().eq("id", id);

  return data;
};

export const loadProductData = async ({ params }: any) => {
  const product = await fetchProductData(params.id);
  return { product };
};

export const getStorages = async () => {
  const { data } = await supabase.from("Storages").select();

  return data;
};

export const buyProducts = async (data: any) => {
  return Promise.all([
    supabase.from("Items").insert(data),
    supabase
      .from("SellItems")
      .insert(data.map(({ modelId: model_id }: any) => ({ model_id }))),
  ]);
};

export const getProviders = async () => {
  const { data } = await supabase.from("Providers").select();

  return data;
};
