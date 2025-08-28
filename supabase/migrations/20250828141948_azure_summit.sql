/*
# Initial Schema Setup for ServiceConnect Platform

1. New Tables
   - `categories` - Service categories (cleaning, cooking, etc.)
     - `id` (uuid, primary key)
     - `name` (text, unique)
     - `description` (text)
     - `icon` (text) - emoji or icon identifier
     - `created_at` (timestamp)
   
   - `service_providers` - Provider profiles and information
     - `id` (uuid, primary key)
     - `user_id` (uuid, foreign key to auth.users)
     - `full_name` (text)
     - `phone` (text)
     - `address` (text)
     - `photo_url` (text, nullable) - verification photo
     - `category_id` (uuid, foreign key to categories)
     - `experience_years` (integer)
     - `hourly_rate` (integer) - rate in rupees
     - `available_days` (text array) - days of week
     - `available_hours` (text) - time slots
     - `verification_status` (enum: pending, approved, rejected)
     - `created_at` (timestamp)
   
   - `bookings` - Service bookings and appointments
     - `id` (uuid, primary key)
     - `customer_id` (uuid, foreign key to auth.users)
     - `provider_id` (uuid, foreign key to service_providers)
     - `service_date` (date)
     - `service_time` (text)
     - `duration_hours` (integer)
     - `total_amount` (integer)
     - `status` (enum: pending, confirmed, completed, cancelled)
     - `special_requests` (text, nullable)
     - `created_at` (timestamp)

2. Security
   - Enable RLS on all tables
   - Add policies for authenticated users to manage their own data
   - Add policies for service providers to manage their profiles
   - Add policies for customers to view approved providers and manage bookings

3. Storage
   - Create bucket for verification photos
   - Set up policies for photo uploads
*/

-- Create custom types
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT '🔧',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Service providers table
CREATE TABLE IF NOT EXISTS service_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  photo_url text,
  category_id uuid REFERENCES categories(id) ON DELETE RESTRICT NOT NULL,
  experience_years integer DEFAULT 0,
  hourly_rate integer NOT NULL,
  available_days text[] DEFAULT '{}',
  available_hours text DEFAULT '',
  verification_status verification_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  provider_id uuid REFERENCES service_providers(id) ON DELETE CASCADE NOT NULL,
  service_date date NOT NULL,
  service_time text NOT NULL,
  duration_hours integer DEFAULT 1,
  total_amount integer NOT NULL,
  status booking_status DEFAULT 'pending',
  special_requests text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Categories: Public read access
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT TO authenticated, anon
  USING (true);

-- Service providers: Public read for approved providers, providers can manage their own
CREATE POLICY "Anyone can view approved providers" ON service_providers
  FOR SELECT TO authenticated, anon
  USING (verification_status = 'approved');

CREATE POLICY "Providers can manage own profile" ON service_providers
  FOR ALL TO authenticated
  USING (auth.uid() = user_id);

-- Bookings: Users can only see their own bookings
CREATE POLICY "Customers can view own bookings" ON bookings
  FOR SELECT TO authenticated
  USING (auth.uid() = customer_id);

CREATE POLICY "Providers can view their bookings" ON bookings
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM service_providers WHERE id = provider_id
    )
  );

CREATE POLICY "Customers can create bookings" ON bookings
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update own bookings" ON bookings
  FOR UPDATE TO authenticated
  USING (auth.uid() = customer_id);

CREATE POLICY "Providers can update their bookings" ON bookings
  FOR UPDATE TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM service_providers WHERE id = provider_id
    )
  );

-- Create storage bucket for verification photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('verification-photos', 'verification-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload verification photos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'verification-photos');

CREATE POLICY "Users can view verification photos" ON storage.objects
  FOR SELECT TO authenticated, anon
  USING (bucket_id = 'verification-photos');

-- Insert default categories
INSERT INTO categories (name, description, icon) VALUES
  ('House Cleaning', 'Professional home cleaning services', '🏠'),
  ('Laundry Services', 'Washing, drying, and ironing clothes', '👕'),
  ('Cooking Help', 'Meal preparation and cooking assistance', '👨‍🍳'),
  ('Elderly Care', 'Caring for elderly family members', '👵'),
  ('Child Care', 'Babysitting and child supervision', '👶'),
  ('Pet Care', 'Pet feeding, walking, and basic care', '🐕'),
  ('Gardening', 'Garden maintenance and plant care', '🌱'),
  ('Waste Management', 'Garbage collection and disposal', '♻️'),
  ('Vehicle Cleaning', 'Car and bike washing services', '🚗'),
  ('Appliance Repair', 'Basic repair of household appliances', '🔧')
ON CONFLICT (name) DO NOTHING;