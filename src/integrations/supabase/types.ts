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
      aircraft: {
        Row: {
          created_at: string | null
          engine_type_id: string | null
          fuel_capacity: number | null
          fuel_type_id: string | null
          id: string
          latitude: number | null
          longitude: number | null
          manufacturer: string
          max_range: number | null
          model: string | null
          tail_number: string
          type_id: string | null
          updated_at: string | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          created_at?: string | null
          engine_type_id?: string | null
          fuel_capacity?: number | null
          fuel_type_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          manufacturer?: string
          max_range?: number | null
          model?: string | null
          tail_number: string
          type_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          created_at?: string | null
          engine_type_id?: string | null
          fuel_capacity?: number | null
          fuel_type_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          manufacturer?: string
          max_range?: number | null
          model?: string | null
          tail_number?: string
          type_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "aircraft_engine_type_id_fkey"
            columns: ["engine_type_id"]
            isOneToOne: false
            referencedRelation: "aircraft_engine_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aircraft_fuel_type_id_fkey"
            columns: ["fuel_type_id"]
            isOneToOne: false
            referencedRelation: "fuel_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aircraft_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "aircraft_types"
            referencedColumns: ["id"]
          },
        ]
      }
      aircraft_engine_types: {
        Row: {
          created_at: string | null
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      aircraft_size_categories: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      aircraft_types: {
        Row: {
          "3d": string | null
          cabin_size_cubic_feet: number | null
          category: string
          created_at: string | null
          id: string
          manufacturer: string
          manufacturer_id: string
          name: string
          range_nautical_miles: number | null
          size_category_id: string
        }
        Insert: {
          "3d"?: string | null
          cabin_size_cubic_feet?: number | null
          category: string
          created_at?: string | null
          id?: string
          manufacturer: string
          manufacturer_id: string
          name: string
          range_nautical_miles?: number | null
          size_category_id: string
        }
        Update: {
          "3d"?: string | null
          cabin_size_cubic_feet?: number | null
          category?: string
          created_at?: string | null
          id?: string
          manufacturer?: string
          manufacturer_id?: string
          name?: string
          range_nautical_miles?: number | null
          size_category_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          contact_email: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          contact_email: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          contact_email?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      contract_signatures: {
        Row: {
          contract_id: string | null
          id: string
          ip_address: unknown | null
          signature_data: string
          signed_at: string | null
          signer_id: string | null
          signer_role: string
        }
        Insert: {
          contract_id?: string | null
          id?: string
          ip_address?: unknown | null
          signature_data: string
          signed_at?: string | null
          signer_id?: string | null
          signer_role: string
        }
        Update: {
          contract_id?: string | null
          id?: string
          ip_address?: unknown | null
          signature_data?: string
          signed_at?: string | null
          signer_id?: string | null
          signer_role?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_signatures_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "fbo_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_terms: {
        Row: {
          content: string
          contract_id: string | null
          created_at: string | null
          id: string
          section_name: string
        }
        Insert: {
          content: string
          contract_id?: string | null
          created_at?: string | null
          id?: string
          section_name: string
        }
        Update: {
          content?: string
          contract_id?: string | null
          created_at?: string | null
          id?: string
          section_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_terms_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "fbo_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      fbo_contracts: {
        Row: {
          base_price_per_gallon: number
          cancellation_terms: string | null
          contract_number: string
          created_at: string | null
          effective_date: string
          environmental_requirements: string | null
          expiration_date: string
          fbo_counterparty_id: string | null
          force_majeure_terms: string | null
          fuel_type_id: string | null
          id: string
          insurance_requirements: string | null
          into_plane_fee: number | null
          maximum_volume: number
          minimum_volume: number
          operator_counterparty_id: string | null
          payment_terms: Database["public"]["Enums"]["payment_terms"] | null
          price_adjustment_formula: string | null
          quality_control_terms: string | null
          special_terms: string | null
          status: Database["public"]["Enums"]["contract_status"] | null
          storage_fee: number | null
          taxes_and_fees: Json | null
          updated_at: string | null
        }
        Insert: {
          base_price_per_gallon: number
          cancellation_terms?: string | null
          contract_number: string
          created_at?: string | null
          effective_date: string
          environmental_requirements?: string | null
          expiration_date: string
          fbo_counterparty_id?: string | null
          force_majeure_terms?: string | null
          fuel_type_id?: string | null
          id?: string
          insurance_requirements?: string | null
          into_plane_fee?: number | null
          maximum_volume: number
          minimum_volume: number
          operator_counterparty_id?: string | null
          payment_terms?: Database["public"]["Enums"]["payment_terms"] | null
          price_adjustment_formula?: string | null
          quality_control_terms?: string | null
          special_terms?: string | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          storage_fee?: number | null
          taxes_and_fees?: Json | null
          updated_at?: string | null
        }
        Update: {
          base_price_per_gallon?: number
          cancellation_terms?: string | null
          contract_number?: string
          created_at?: string | null
          effective_date?: string
          environmental_requirements?: string | null
          expiration_date?: string
          fbo_counterparty_id?: string | null
          force_majeure_terms?: string | null
          fuel_type_id?: string | null
          id?: string
          insurance_requirements?: string | null
          into_plane_fee?: number | null
          maximum_volume?: number
          minimum_volume?: number
          operator_counterparty_id?: string | null
          payment_terms?: Database["public"]["Enums"]["payment_terms"] | null
          price_adjustment_formula?: string | null
          quality_control_terms?: string | null
          special_terms?: string | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          storage_fee?: number | null
          taxes_and_fees?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbo_contracts_fbo_counterparty_id_fkey"
            columns: ["fbo_counterparty_id"]
            isOneToOne: false
            referencedRelation: "fbos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbo_contracts_fuel_type_id_fkey"
            columns: ["fuel_type_id"]
            isOneToOne: false
            referencedRelation: "fuel_types"
            referencedColumns: ["id"]
          },
        ]
      }
      fbo_person_statuses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      fbo_person_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      fbo_persons: {
        Row: {
          cell: string
          created_at: string
          email: string
          fbo_id: string
          id: string
          person_id: string
          status_id: string | null
          type_id: string
          updated_at: string
        }
        Insert: {
          cell: string
          created_at?: string
          email: string
          fbo_id: string
          id?: string
          person_id: string
          status_id?: string | null
          type_id: string
          updated_at?: string
        }
        Update: {
          cell?: string
          created_at?: string
          email?: string
          fbo_id?: string
          id?: string
          person_id?: string
          status_id?: string | null
          type_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fbo_persons_fbo_id_fkey"
            columns: ["fbo_id"]
            isOneToOne: false
            referencedRelation: "fbos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbo_persons_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbo_persons_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "fbo_person_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbo_persons_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "fbo_person_types"
            referencedColumns: ["id"]
          },
        ]
      }
      fbo_tenders: {
        Row: {
          counter_price: number | null
          counter_taxes_and_fees: number | null
          counter_total_cost: number | null
          created_at: string | null
          description: string | null
          fbo_id: string | null
          id: string
          offer_price: number
          status: string | null
          taxes_and_fees: number
          tender_id: string | null
          total_cost: number
          updated_at: string | null
        }
        Insert: {
          counter_price?: number | null
          counter_taxes_and_fees?: number | null
          counter_total_cost?: number | null
          created_at?: string | null
          description?: string | null
          fbo_id?: string | null
          id?: string
          offer_price?: number
          status?: string | null
          taxes_and_fees?: number
          tender_id?: string | null
          total_cost?: number
          updated_at?: string | null
        }
        Update: {
          counter_price?: number | null
          counter_taxes_and_fees?: number | null
          counter_total_cost?: number | null
          created_at?: string | null
          description?: string | null
          fbo_id?: string | null
          id?: string
          offer_price?: number
          status?: string | null
          taxes_and_fees?: number
          tender_id?: string | null
          total_cost?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbo_tenders_fbo_id_fkey"
            columns: ["fbo_id"]
            isOneToOne: false
            referencedRelation: "fbos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fbo_tenders_tender_id_fkey"
            columns: ["tender_id"]
            isOneToOne: false
            referencedRelation: "tenders"
            referencedColumns: ["id"]
          },
        ]
      }
      fbos: {
        Row: {
          address: string | null
          city: string | null
          country: string
          created_at: string | null
          email: string | null
          email_secondary: string | null
          icao_id: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          state: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country: string
          created_at?: string | null
          email?: string | null
          email_secondary?: string | null
          icao_id?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name: string
          state?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string
          created_at?: string | null
          email?: string | null
          email_secondary?: string | null
          icao_id?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fbos_icao_id_fkey"
            columns: ["icao_id"]
            isOneToOne: false
            referencedRelation: "icaos"
            referencedColumns: ["id"]
          },
        ]
      }
      fleet: {
        Row: {
          aircraft_type: string
          company_id: string | null
          created_at: string | null
          fuel_capacity: number
          id: string
          registration: string
        }
        Insert: {
          aircraft_type: string
          company_id?: string | null
          created_at?: string | null
          fuel_capacity: number
          id?: string
          registration: string
        }
        Update: {
          aircraft_type?: string
          company_id?: string | null
          created_at?: string | null
          fuel_capacity?: number
          id?: string
          registration?: string
        }
        Relationships: [
          {
            foreignKeyName: "fleet_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      fuel_types: {
        Row: {
          created_at: string | null
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      icao_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      icaos: {
        Row: {
          city: string | null
          code: string
          continent: string | null
          country: string | null
          created_at: string | null
          icao_type_id: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          state: string | null
        }
        Insert: {
          city?: string | null
          code: string
          continent?: string | null
          country?: string | null
          created_at?: string | null
          icao_type_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          state?: string | null
        }
        Update: {
          city?: string | null
          code?: string
          continent?: string | null
          country?: string | null
          created_at?: string | null
          icao_type_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "icaos_icao_type_id_fkey"
            columns: ["icao_type_id"]
            isOneToOne: false
            referencedRelation: "icao_types"
            referencedColumns: ["id"]
          },
        ]
      }
      legs: {
        Row: {
          actual_arrival: string | null
          actual_departure: string | null
          auth_id: string | null
          created_at: string | null
          destination_id: string
          id: string
          notes: string | null
          origin_id: string
          route_id: string | null
          scheduled_arrival: string
          scheduled_departure: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          actual_arrival?: string | null
          actual_departure?: string | null
          auth_id?: string | null
          created_at?: string | null
          destination_id: string
          id?: string
          notes?: string | null
          origin_id: string
          route_id?: string | null
          scheduled_arrival: string
          scheduled_departure: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_arrival?: string | null
          actual_departure?: string | null
          auth_id?: string | null
          created_at?: string | null
          destination_id?: string
          id?: string
          notes?: string | null
          origin_id?: string
          route_id?: string | null
          scheduled_arrival?: string
          scheduled_departure?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legs_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "icaos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legs_origin_id_fkey"
            columns: ["origin_id"]
            isOneToOne: false
            referencedRelation: "icaos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legs_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      manufacturers: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo?: string | null
          name?: string | null
        }
        Relationships: []
      }
      persons: {
        Row: {
          auth_id: string
          cell_phone: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          name: string
          updated_at: string
        }
        Insert: {
          auth_id: string
          cell_phone?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          auth_id?: string
          cell_phone?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          auth_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          transit_type_id: string | null
          trip_id: string | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          transit_type_id?: string | null
          trip_id?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          transit_type_id?: string | null
          trip_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_transit_type_id_fkey"
            columns: ["transit_type_id"]
            isOneToOne: false
            referencedRelation: "transit_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      service_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number
          type_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          type_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          type_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      tender_offers: {
        Row: {
          company_id: string | null
          created_at: string | null
          end_date: string
          fuel_type: string
          id: string
          price_per_gallon: number
          start_date: string
          status: string | null
          volume_per_year: number
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          end_date: string
          fuel_type: string
          id?: string
          price_per_gallon: number
          start_date: string
          status?: string | null
          volume_per_year: number
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          end_date?: string
          fuel_type?: string
          id?: string
          price_per_gallon?: number
          start_date?: string
          status?: string | null
          volume_per_year?: number
        }
        Relationships: [
          {
            foreignKeyName: "tender_offers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      tenders: {
        Row: {
          aircraft_id: string | null
          auth_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          gallons: number
          icao_id: string | null
          id: string
          start_date: string
          status: string | null
          target_price: number
          updated_at: string | null
        }
        Insert: {
          aircraft_id?: string | null
          auth_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          gallons: number
          icao_id?: string | null
          id?: string
          start_date?: string
          status?: string | null
          target_price: number
          updated_at?: string | null
        }
        Update: {
          aircraft_id?: string | null
          auth_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          gallons?: number
          icao_id?: string | null
          id?: string
          start_date?: string
          status?: string | null
          target_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenders_aircraft_id_fkey"
            columns: ["aircraft_id"]
            isOneToOne: false
            referencedRelation: "aircraft"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenders_icao_id_fkey"
            columns: ["icao_id"]
            isOneToOne: false
            referencedRelation: "icaos"
            referencedColumns: ["id"]
          },
        ]
      }
      transit_types: {
        Row: {
          category: string | null
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      trips: {
        Row: {
          auth_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_fbos: {
        Row: {
          created_at: string | null
          fbo_id: string | null
          id: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          fbo_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          fbo_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_fbos_fbo_id_fkey"
            columns: ["fbo_id"]
            isOneToOne: false
            referencedRelation: "fbos"
            referencedColumns: ["id"]
          },
        ]
      }
      work_order_fbos: {
        Row: {
          created_at: string | null
          fbo_id: string | null
          id: string
          price: number | null
          status: string
          updated_at: string | null
          work_order_id: string | null
        }
        Insert: {
          created_at?: string | null
          fbo_id?: string | null
          id?: string
          price?: number | null
          status?: string
          updated_at?: string | null
          work_order_id?: string | null
        }
        Update: {
          created_at?: string | null
          fbo_id?: string | null
          id?: string
          price?: number | null
          status?: string
          updated_at?: string | null
          work_order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_order_fbos_fbo_id_fkey"
            columns: ["fbo_id"]
            isOneToOne: false
            referencedRelation: "fbos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_order_fbos_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      work_orders: {
        Row: {
          aircraft_id: string
          arrival_date: string | null
          auth_id: string | null
          completed_date: string | null
          created_at: string | null
          crew_count: number | null
          departure_date: string | null
          description: string
          id: string
          passenger_count: number | null
          pet_count: number | null
          quantity: number
          requested_date: string
          service_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          aircraft_id: string
          arrival_date?: string | null
          auth_id?: string | null
          completed_date?: string | null
          created_at?: string | null
          crew_count?: number | null
          departure_date?: string | null
          description: string
          id?: string
          passenger_count?: number | null
          pet_count?: number | null
          quantity: number
          requested_date: string
          service_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          aircraft_id?: string
          arrival_date?: string | null
          auth_id?: string | null
          completed_date?: string | null
          created_at?: string | null
          crew_count?: number | null
          departure_date?: string | null
          description?: string
          id?: string
          passenger_count?: number | null
          pet_count?: number | null
          quantity?: number
          requested_date?: string
          service_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_orders_aircraft_id_fkey"
            columns: ["aircraft_id"]
            isOneToOne: false
            referencedRelation: "aircraft"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_fbo_tender_access: {
        Args: {
          tender_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      contract_status:
        | "draft"
        | "pending_operator"
        | "pending_fbo"
        | "active"
        | "expired"
        | "terminated"
      payment_terms:
        | "net_15"
        | "net_30"
        | "net_45"
        | "net_60"
        | "prepaid"
        | "cod"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
