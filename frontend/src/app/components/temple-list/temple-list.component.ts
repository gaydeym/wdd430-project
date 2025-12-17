import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TempleService } from "../../../services/temple.service";
import { Temple } from "../../../models/temple.model";

@Component({
    selector: "app-temple-list",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./temple-list.component.html",
    styleUrls: ["./temple-list.component.css"],
})
export class TempleListComponent implements OnInit {
    temples: Temple[] = [];
    filteredTemples: Temple[] = [];
    selectedStatus: string = "ALL";
    loading: boolean = true;
    error: string = "";

    constructor(private templeService: TempleService) {}

    ngOnInit(): void {
        this.loadTemples();
    }

    loadTemples(): void {
        this.loading = true;
        this.templeService.getAllTemples().subscribe({
            next: (data) => {
                this.temples = data;
                this.filteredTemples = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = "Failed to load temples. Please try again later.";
                this.loading = false;
                console.error("Error loading temples:", err);
            },
        });
    }

    filterByStatus(status: string): void {
        this.selectedStatus = status;
        if (status === "ALL") {
            this.filteredTemples = this.temples;
        } else {
            this.filteredTemples = this.temples.filter(
                (temple) => temple.status === status
            );
        }
    }

    deleteTemple(id: string | undefined): void {
        if (!id) return;

        if (confirm("Are you sure you want to delete this temple?")) {
            this.templeService.deleteTemple(id).subscribe({
                next: () => {
                    this.loadTemples();
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
