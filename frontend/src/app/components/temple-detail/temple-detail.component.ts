import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TempleService } from "../../../services/temple.service";
import { Temple } from "../../../models/temple.model";

@Component({
    selector: "app-temple-detail",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./temple-detail.component.html",
    styleUrls: ["./temple-detail.component.css"],
})
export class TempleDetailComponent implements OnInit {
    temple: Temple | null = null;
    loading: boolean = true;
    error: string = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private templeService: TempleService
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        if (id) {
            this.loadTemple(id);
        }
    }

    loadTemple(id: string): void {
        this.templeService.getTempleById(id).subscribe({
            next: (data) => {
                this.temple = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = "Failed to load temple details";
                this.loading = false;
                console.error("Error loading temple:", err);
            },
        });
    }

    deleteTemple(): void {
        if (!this.temple || !this.temple._id) return;

        if (confirm(`Are you sure you want to delete ${this.temple.name}?`)) {
            this.templeService.deleteTemple(this.temple._id).subscribe({
                next: () => {
                    this.router.navigate(["/"]);
                },
                error: (err) => {
                    alert("Failed to delete temple");
                    console.error("Error deleting temple:", err);
                },
            });
        }
    }

    getStatusLabel(status: string): string {
        const labels: { [key: string]: string } = {
            OPERATING: "Operating",
            RENOVATION: "Under Renovation",
            ANNOUNCED: "Announced",
            CONSTRUCTION: "Under Construction",
        };
        return labels[status] || status;
    }

    getStatusClass(status: string): string {
        const classes: { [key: string]: string } = {
            OPERATING: "status-operating",
            RENOVATION: "status-renovation",
            ANNOUNCED: "status-announced",
            CONSTRUCTION: "status-construction",
        };
        return classes[status] || "";
    }
}
