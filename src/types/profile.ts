// src/types/profile.ts
export interface UserProfile {
    user_id: string;
    onboarding_completed: boolean;
    subscription_id?: string;
    subscription_status?: 'active' | 'canceled' | 'past_due' | 'unpaid' | null;
    subscription_plan?: 'free' | 'starter' | 'professional' | 'premium';
    created_at: string;
    updated_at: string;
    assessment?: {
        currentMood?: number;
        // Add other assessment fields as needed
    };
    therapy_preferences?: {
        style?: string;
        approach?: string[];
        // Add other therapy preference fields
    };
    // Add other profile fields as needed
}