export interface User {
    id: string;
    extAuthId: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    accessCode: string;
    memberId: string | null;
    groupNumber: string | null;
    benefitCard: string | null;
    providerId: string | null;
}