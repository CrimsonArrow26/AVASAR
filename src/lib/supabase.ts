import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
      service_providers: {
        Row: {
          id: string
          user_id: string
          full_name: string
          phone: string
          address: string
          photo_url: string | null
          category_id: string
          experience_years: number
          hourly_rate: number
          available_days: string[]
          available_hours: string
          verification_status: 'pending' | 'approved' | 'rejected'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          phone: string
          address: string
          photo_url?: string | null
          category_id: string
          experience_years: number
          hourly_rate: number
          available_days: string[]
          available_hours: string
          verification_status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          phone?: string
          address?: string
          photo_url?: string | null
          category_id?: string
          experience_years?: number
          hourly_rate?: number
          available_days?: string[]
          available_hours?: string
          verification_status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          customer_id: string
          provider_id: string
          service_date: string
          service_time: string
          duration_hours: number
          total_amount: number
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          special_requests: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          provider_id: string
          service_date: string
          service_time: string
          duration_hours: number
          total_amount: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          special_requests?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          provider_id?: string
          service_date?: string
          service_time?: string
          duration_hours?: number
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          special_requests?: string | null
          created_at?: string
        }
      }
    }
  }
}