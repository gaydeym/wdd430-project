import { Routes } from "@angular/router";
import { TempleListComponent } from "./components/temple-list/temple-list.component";
import { TempleDetailComponent } from "./components/temple-detail/temple-detail.component";
import { TempleFormComponent } from "./components/temple-form/temple-form.component";

export const routes: Routes = [
    { path: "", component: TempleListComponent },
    { path: "temple/:id", component: TempleDetailComponent },
    { path: "add", component: TempleFormComponent },
    { path: "edit/:id", component: TempleFormComponent },
    { path: "**", redirectTo: "" },
];
