// src/components/onboarding/steps/privacy-consent.tsx
'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface PrivacyConsentProps {
    data: {
        privacyConsent: boolean;
    };
    updateData: (field: string, value: any) => void;
}

export default function PrivacyConsent({ data, updateData }: PrivacyConsentProps) {
    const handleConsentChange = (checked: boolean) => {
        updateData('privacyConsent', checked)
    }

    return (
        <div className="space-y-6">
            <div className="rounded-md border p-4 bg-muted/50">
                <p className="text-sm mb-4">
                    By using our mental health services, you agree to our privacy policy and terms of service.
                    We take your privacy seriously and will only use your information to provide you with the
                    best possible care.
                </p>
                <p className="text-sm mb-4">
                    We may use anonymized data for research purposes to improve our services.
                    Your personal information will never be shared with third parties without your explicit consent.
                </p>
                <p className="text-sm">
                    You can request deletion of your data at any time by contacting our support team.
                </p>
            </div>

            <div className="flex items-start space-x-3 pt-2">
                <Checkbox
                    id="consent"
                    checked={data.privacyConsent}
                    onCheckedChange={(checked) => handleConsentChange(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                    <Label
                        htmlFor="consent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree to the privacy policy and terms of service
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        You must agree to continue
                    </p>
                </div>
            </div>
        </div>
    )
}