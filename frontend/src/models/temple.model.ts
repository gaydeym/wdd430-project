export interface Temple {
    _id?: string;
    name: string;
    location: string;
    status: "OPERATING" | "RENOVATION" | "ANNOUNCED" | "CONSTRUCTION";
    dedicatedDate: string;
    imageUrl: string;
}
