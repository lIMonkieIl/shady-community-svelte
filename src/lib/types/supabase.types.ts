export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar: string | null
          discord_id: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar?: string | null
          discord_id?: string | null
          id: string
          username?: string | null
        }
        Update: {
          avatar?: string | null
          discord_id?: string | null
          id?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

