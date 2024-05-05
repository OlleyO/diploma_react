import { types } from "../helpers/types";
import { supabase } from "./index";

export const getAll = async () => {
  const { data } = await supabase.from("modelinfo").select();

  return data;
};

export const getItemByType = async (type: string) => {
  const { data } = await supabase.rpc("get_items_by_type", {
    type_id: type,
  });

  return data;
};

const fetchFilterData = async (name: string) => {
  const type = types(name);

  return !type ? getAll() : getItemByType(type);
};

export async function loadFilterData({ params }: any) {
  const filteredProducts = await fetchFilterData(params.name);
  return { filteredProducts };
}

export const sellProduct = async (id: string, count: number) =>
  await supabase.rpc("sell_items", {
    model_id_to_delete: id,
    count_to_delete: count,
  });

export const fetchProductData = async (id: string) => {
  const { data } = await supabase.from("Models").select().eq("id", id);

  return data;
};

export async function loadProductData({ params }: any) {
  const product = await fetchProductData(params.id);
  return { product };
}
