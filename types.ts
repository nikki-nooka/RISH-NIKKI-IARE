


export interface User {
  phone: string; // Used as the unique username
  name: string;
  date_of_birth: string;
  email?: string | null;
  gender?: string | null;
  place?: string | null;
  created_at?: string;
  last_login_at?: string;
}

export type Page = 'home' | 'about' | 'contact' | 'explore' | 'welcome' | 'image-analysis' | 'checkup' | 'prescription-analysis' | 'mental-health' | 'symptom-checker' | 'health-briefing' | 'activity-history' | 'admin-dashboard' | 'profile' | 'live-alerts';

export type BotCommandAction = 'navigate' | 'speak';

export interface BotCommandResponse {
    action: BotCommandAction;
    page?: Page;
    responseText: string;
}


export interface Hazard {
    hazard: string;
    description: string;
}

export interface Disease {
    name: string;
    cause: string;
    precautions: string[];
}

export interface AnalysisResult {
    hazards: Hazard[];
    diseases: Disease[];
    summary: string;
}

export interface LocationAnalysisResult extends AnalysisResult {
    locationName: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'bot';
    text: string;
}

export interface Facility {
  name: string;
  type: 'Hospital' | 'Pharmacy' | 'Clinic';
  lat: number;
  lng: number;
  distance?: string;
}

export interface MapPoint {
  lat: number;
  lng: number;
  name: string;
  kind: 'analysis_point' | 'facility';
  type?: 'Hospital' | 'Pharmacy' | 'Clinic';
}

export interface Medicine {
  name: string;
  dosage: string;
}

export interface PrescriptionAnalysisResult {
  summary: string;
  medicines: Medicine[];
  precautions: string[];
}

export interface RiskFactor {
    name: string;
    level: 'Low' | 'Moderate' | 'High' | 'Very High';
    description: string;
}

export interface HealthForecast {
    locationName: string;
    summary: string;
    riskFactors: RiskFactor[];
    recommendations: string[];
}

export interface CopingStrategy {
  title: string;
  description: string;
}

export interface PotentialConcern {
  name: string;
  explanation: string;
}

export interface MentalHealthResult {
  summary: string;
  potentialConcerns: PotentialConcern[];
  copingStrategies: CopingStrategy[];
  recommendation: string;
}

export interface PotentialCondition {
  name: string;
  description: string;
}

export interface SymptomAnalysisResult {
  summary: string;
  triageRecommendation: string;
  potentialConditions: PotentialCondition[];
  nextSteps: string[];
  disclaimer: string;
}

export interface ActivityLogItem {
  id: string;
  type: 'image-analysis' | 'prescription-analysis' | 'mental-health' | 'symptom-checker' | 'login';
  timestamp: number;
  title: string;
  userPhone: string;
  data: AnalysisResult | PrescriptionAnalysisResult | MentalHealthResult | SymptomAnalysisResult | { message: string };
  // FIX: Add optional language property for symptom checker history.
  language?: string;
}

export type AlertCategory = 'disease' | 'air' | 'heat' | 'environmental' | 'other';

export interface AlertSource {
    uri: string;
    title: string;
}

export interface Alert {
    id: string;
    title: string;
    location: string;
    category: AlertCategory;
    detailedInfo: string;
    threatAnalysis: string;
    sources: AlertSource[];
    lat?: number;
    lng?: number;
    locationDetails?: string;
    country?: string;
    fetchedAt: number;
}