// src/types/profile.ts
export interface UserProfile {
    user_id: string;
    onboarding_completed: boolean;
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