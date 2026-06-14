export interface QuizAnswers {
  name: string;
  age: string;
  mainPreoccupation: string;
  bellyType: string;
  situation: string;
  
  // Ramo A - Pós-Parto
  lastBirthTime?: string;
  birthType?: string;
  
  // Ramo B - Pós-Emagrecimento
  weightLost?: string;
  weightLossMethod?: string;
  
  // Ramo C - Idade / Geral
  ageSkinSymptoms?: string;
  
  // General Section
  timeSuffering: string;
  triedSolutions: string[];
  feelLookingSide: string;
  restrictedActions: string[];
  
  // Health Metrics
  hydration: string;
  sleep: string;
  diet: string;
  activityLevel: string;
  commitment: string;
}

export type ScreenState = 
  | 'landing' 
  | 'p1_age' 
  | 'p2_concern' 
  | 'p3_belly_type' 
  | 'p4_situation'
  | 'ramo_a_1' | 'ramo_a_2'
  | 'ramo_b_1' | 'ramo_b_2'
  | 'ramo_c_1'
  | 'testimonials_carousel'
  | 'p5_time_suffering'
  | 'p6_tried_solutions'
  | 'p7_mirror_feeling'
  | 'p8_restricted_actions'
  | 'p9_hydration'
  | 'p9_sleep'
  | 'p9_diet'
  | 'p9_activity'
  | 'p10_commitment'
  | 'p11_name'
  | 'analyzing'
  | 'diagnosis'
  | 'sales_page';
