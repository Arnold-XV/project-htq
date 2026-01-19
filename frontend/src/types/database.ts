// Database Type Definitions
// Generated from Supabase schema

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          bio: string | null;
          photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          bio?: string | null;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          bio?: string | null;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_questions: {
        Row: {
          id: string;
          juz_number: number;
          question_text: string;
          dimension: string;
          order_number: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          juz_number: number;
          question_text: string;
          dimension: string;
          order_number: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          juz_number?: number;
          question_text?: string;
          dimension?: string;
          order_number?: number;
          created_at?: string;
        };
      };
      quiz_options: {
        Row: {
          id: string;
          question_id: string;
          option_text: string;
          trait_value: string;
          order_number: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          question_id: string;
          option_text: string;
          trait_value: string;
          order_number: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          question_id?: string;
          option_text?: string;
          trait_value?: string;
          order_number?: number;
          created_at?: string;
        };
      };
      personality_types: {
        Row: {
          id: string;
          type_code: string;
          juz_number: number;
          name: string;
          description: string;
          traits: string[];
          strengths: string[];
          weaknesses: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          type_code: string;
          juz_number: number;
          name: string;
          description: string;
          traits?: string[];
          strengths?: string[];
          weaknesses?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          type_code?: string;
          juz_number?: number;
          name?: string;
          description?: string;
          traits?: string[];
          strengths?: string[];
          weaknesses?: string[];
          created_at?: string;
        };
      };
      quiz_results: {
        Row: {
          id: string;
          user_id: string;
          personality_type: string;
          juz_number: number;
          scores: Record<string, number>;
          completed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          personality_type: string;
          juz_number: number;
          scores: Record<string, number>;
          completed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          personality_type?: string;
          juz_number?: number;
          scores?: Record<string, number>;
          completed_at?: string;
          created_at?: string;
        };
      };
      quiz_answers: {
        Row: {
          id: string;
          result_id: string;
          question_id: string;
          option_id: string;
          trait_value: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          result_id: string;
          question_id: string;
          option_id: string;
          trait_value: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          result_id?: string;
          question_id?: string;
          option_id?: string;
          trait_value?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

export type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row'];
export type QuizQuestionInsert = Database['public']['Tables']['quiz_questions']['Insert'];
export type QuizQuestionUpdate = Database['public']['Tables']['quiz_questions']['Update'];

export type QuizOption = Database['public']['Tables']['quiz_options']['Row'];
export type QuizOptionInsert = Database['public']['Tables']['quiz_options']['Insert'];
export type QuizOptionUpdate = Database['public']['Tables']['quiz_options']['Update'];

export type PersonalityType = Database['public']['Tables']['personality_types']['Row'];
export type PersonalityTypeInsert = Database['public']['Tables']['personality_types']['Insert'];
export type PersonalityTypeUpdate = Database['public']['Tables']['personality_types']['Update'];

export type QuizResult = Database['public']['Tables']['quiz_results']['Row'];
export type QuizResultInsert = Database['public']['Tables']['quiz_results']['Insert'];
export type QuizResultUpdate = Database['public']['Tables']['quiz_results']['Update'];

export type QuizAnswer = Database['public']['Tables']['quiz_answers']['Row'];
export type QuizAnswerInsert = Database['public']['Tables']['quiz_answers']['Insert'];
export type QuizAnswerUpdate = Database['public']['Tables']['quiz_answers']['Update'];
