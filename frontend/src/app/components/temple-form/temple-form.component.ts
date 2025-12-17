import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TempleService } from "../../../services/temple.service";
import { Temple } from "../../../models/temple.model";

@Component({
    selector: "app-temple-form",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: "./temple-form.component.html",
    styleUrls: ["./temple-form.component.css"],
})
export class TempleFormComponent implements OnInit {
    templeForm: FormGroup;
    isEditMode: boolean = false;
    templeId: string | null = null;
    loading: boolean = false;
    error: string = "";

    statuses = [
        { value: "OPERATING", label: "Operating" },
        { value: "RENOVATION", label: "Under Renovation" },
        { value: "ANNOUNCED", label: "Announced" },
        { value: "CONSTRUCTION", label: "Under Construction" },
    ];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private templeService: TempleService
    ) {
        this.templeForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(3)]],
            location: ["", [Validators.required, Validators.minLength(3)]],
            status: ["OPERATING", Validators.required],
            dedicatedDate: [""],
            imageUrl: ["", Validators.required],
        });
    }

    ngOnInit(): void {
        this.templeId = this.route.snapshot.paramMap.get("id");
        if (this.templeId) {
            this.isEditMode = true;
            this.loadTemple(this.templeId);
        }
    }

    loadTemple(id: string): void {
        this.loading = true;
        this.templeService.getTempleById(id).subscribe({
            next: (temple) => {
                this.templeForm.patchValue({
                    name: temple.name,
                    location: temple.location,
                    status: temple.status,
                    dedicatedDate: temple.dedicatedDate || "",
                    imageUrl: temple.imageUrl,
                });
                this.loading = false;
            },
            error: (err) => {
                this.error = "Failed to load temple data";
                this.loading = false;
                console.error("Error loading temple:", err);
            },
        });
    }

    onSubmit(): void {
        if (this.templeForm.invalid) {
            this.templeForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        const templeData: Temple = this.templeForm.value;

        if (this.isEditMode && this.templeId) {
            this.templeService
                .updateTemple(this.templeId, templeData)
                .subscribe({
                    next: () => {
                        this.router.navigate(["/temple", this.templeId]);
                    },
                    error: (err) => {
                        this.error = "Failed to update temple";
                        this.loading = false;
                        console.error("Error updating temple:", err);
                    },
                });
        } else {
            this.templeService.createTemple(templeData).subscribe({
                next: (temple) => {
                    this.router.navigate(["/temple", temple._id]);
                },
                error: (err) => {
                    this.error = "Failed to create temple";
                    this.loading = false;
                    console.error("Error creating temple:", err);
                },
            });
        }
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.templeForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getErrorMessage(fieldName: string): string {
        const field = this.templeForm.get(fieldName);
        if (field?.hasError("required")) {
            return `${
                fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
            } is required`;
        }
        if (field?.hasError("minlength")) {
            return `${
                fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
            } must be at least ${
                field.errors?.["minlength"].requiredLength
            } characters`;
        }
        return "";
    }
}
