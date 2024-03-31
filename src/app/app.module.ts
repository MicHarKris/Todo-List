import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule,
        BrowserModule,
        FormsModule, // Add FormsModule
        HttpClientModule, 
    ],
    providers: [],
})
export class AppModule { }
