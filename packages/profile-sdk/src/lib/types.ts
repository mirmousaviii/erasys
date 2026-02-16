export interface ProfilePicture {
  id: string;
  owner_id: string;
  url_token: string;
  width: number;
  height: number;
  rating: string;
  comment?: string;
  is_public: boolean;
}

export interface ProfileLocation {
  name: string;
  country: string;
  sensor: boolean;
  is_base_profile: boolean;
}

export interface TargetAge {
  min: number;
  max: number;
}

export interface GenderOrientation {
  gender: string;
  orientation: string;
  looking_for_gender: string[];
  looking_for_orientation: string[];
}

export interface PersonalInfo {
  profile_text: string;
  height: number;
  weight: number;
  target_age: TargetAge;
  spoken_languages: string[];
  beard: string;
  body_hair: string;
  body_type: string;
  ethnicity: string;
  eye_color: string;
  hair_length: string;
  hair_color: string;
  orientation: string;
  smoker: string;
  piercing: string;
  tattoo: string;
  gender_orientation: GenderOrientation;
  age: number;
}

export interface ServiceInfo {
  rate_hour: number;
  rate_night: number;
  currency: string;
  service_locations: string[];
  service_offerings: string[];
}

export interface SexualInfo {
  enabled: boolean;
  favored_position: string;
  anal_position: string;
  dick_size: string;
  concision: string;
  dirty_sex: string;
  sm: string;
  fisting: string;
  fetish: string[];
  safer_sex: string;
  kissing: string;
  oral: string;
}

export interface ReviewReply {
  id: number;
  review_id: number;
  text: string;
  updated_at: string;
}

export interface Review {
  id: string;
  comment: string;
  reviewer_id?: string;
  reviewer_name?: string;
  updated_at: string;
  is_reviewer_genuine: boolean;
  vote?: number;
  reply?: ReviewReply;
  is_reported: boolean;
}

export interface SocialLink {
  type: string;
  value: string;
}

export interface Profile {
  id: string;
  name: string;
  type: string;
  is_plus: boolean;
  online_status: string;
  preview_pic: ProfilePicture;
  headline: string;
  last_login: string;
  location: ProfileLocation;
  personal: PersonalInfo;
  service: ServiceInfo;
  sexual: SexualInfo;
  telephone: string;
  pictures: ProfilePicture[];
  reviews: Review[];
  travel_locations: string[];
  social_links: SocialLink[];
  is_public: boolean;
  is_new: boolean;
  creation_date: string;
}
