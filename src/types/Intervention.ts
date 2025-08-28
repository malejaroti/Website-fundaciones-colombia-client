export type Intervention = {
    id?: string | number;
    foundationId: string | number;
    foundation?: {
        id?: string | number;
        name: string;
        logo: string;
    };
    description: string;
    // underscore style fields used in components
    intervention_date_year?: string;
    intervention_date_month?: string;
    intervention_date_day?: string;
    // hyphen style fields as they may appear in JSON
    "intervention-date-year"?: string;
    "intervention-date-month"?: string;
    "intervention-date-day"?: string;
}
