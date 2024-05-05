export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      BuyItems: {
        Row: {
          created_at: string
          id: string
          model_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          model_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          model_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "BuyItems_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "modelinfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BuyItems_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "Models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BuyItems_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "modelsview"
            referencedColumns: ["id"]
          },
        ]
      }
      Items: {
        Row: {
          createdAt: string
          id: string
          manufacturerId: string
          modelId: string | null
          storageId: string
          typeId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          manufacturerId: string
          modelId?: string | null
          storageId: string
          typeId: string
        }
        Update: {
          createdAt?: string
          id?: string
          manufacturerId?: string
          modelId?: string | null
          storageId?: string
          typeId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Items_manufacturerId_fkey"
            columns: ["manufacturerId"]
            isOneToOne: false
            referencedRelation: "Manufacturers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Items_modelId_fkey"
            columns: ["modelId"]
            isOneToOne: false
            referencedRelation: "modelinfo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Items_modelId_fkey"
            columns: ["modelId"]
            isOneToOne: false
            referencedRelation: "Models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Items_modelId_fkey"
            columns: ["modelId"]
            isOneToOne: false
            referencedRelation: "modelsview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Items_storageId_fkey"
            columns: ["storageId"]
            isOneToOne: false
            referencedRelation: "Storages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Items_typeId_fkey"
            columns: ["typeId"]
            isOneToOne: false
            referencedRelation: "Types"
            referencedColumns: ["id"]
          },
        ]
      }
      Manufacturers: {
        Row: {
          createdAt: string
          id: string
          name: string
        }
        Insert: {
          createdAt?: string
          id?: string
          name: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      Models: {
        Row: {
          color: string | null
          createdAt: string
          description: string | null
          id: string
          imageUrl: string | null
          manufacturer_name: string | null
          name: string | null
          ramSizeGB: number | null
          sellPrice: number | null
          stockPrice: number | null
          storageSizeGB: number | null
        }
        Insert: {
          color?: string | null
          createdAt?: string
          description?: string | null
          id?: string
          imageUrl?: string | null
          manufacturer_name?: string | null
          name?: string | null
          ramSizeGB?: number | null
          sellPrice?: number | null
          stockPrice?: number | null
          storageSizeGB?: number | null
        }
        Update: {
          color?: string | null
          createdAt?: string
          description?: string | null
          id?: string
          imageUrl?: string | null
          manufacturer_name?: string | null
          name?: string | null
          ramSizeGB?: number | null
          sellPrice?: number | null
          stockPrice?: number | null
          storageSizeGB?: number | null
        }
        Relationships: []
      }
      Providers: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      SellItems: {
        Row: {
          created_at: string
          id: string
          item_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          item_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SellItems_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "Items"
            referencedColumns: ["id"]
          },
        ]
      }
      Storages: {
        Row: {
          createdAt: string
          id: string
          location: string
        }
        Insert: {
          createdAt?: string
          id?: string
          location: string
        }
        Update: {
          createdAt?: string
          id?: string
          location?: string
        }
        Relationships: []
      }
      Types: {
        Row: {
          createdAt: string
          id: string
          name: string
        }
        Insert: {
          createdAt?: string
          id?: string
          name: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      modelinfo: {
        Row: {
          id: string | null
          manufacturer_name: string | null
          model_name: string | null
          sell_price: number | null
          stock_price: number | null
          total_items: number | null
          type_name: string | null
        }
        Relationships: []
      }
      modelsview: {
        Row: {
          id: string | null
          manufacturer_name: string | null
          model_name: string | null
          sell_price: number | null
          stock_price: number | null
          total_items: number | null
          type_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_items_by_type: {
        Args: {
          type_id: string
        }
        Returns: {
          id: string
          model_name: string
          manufacturer_name: string
          type_name: string
          stock_price: number
          sell_price: number
          total_items: number
        }[]
      }
      sell_items: {
        Args: {
          model_id_to_delete: string
          count_to_delete: number
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
