import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MatToolbar } from "@angular/material/toolbar";
import { MatAnchor } from "@angular/material/button";
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { LanguageSwitcherComponent } from './public/components/language-switcher/language-switcher.component';
import { PageCreateGroupComponent } from './group/pages/page-create-group/page-create-group.component';
import { FormCreateGroupComponent } from './group/components/form-create-group/form-create-group.component';
import { HomeComponent } from './pockets/pages/home/home.component';
import { MatIcon } from "@angular/material/icon";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatListItem, MatListItemAvatar, MatListItemLine, MatNavList } from "@angular/material/list";
import { PageGroupComponent } from './group/pages/page-group/page-group.component';
import { GroupService } from './group/services/group.service';
import { IncomingComponent } from './payments/incoming/pages/incoming.component';
import { OutgoingComponent } from './payments/outgoing/pages/outgoing.component';
import { MatCard, MatCardHeader, MatCardModule, MatCardTitleGroup } from "@angular/material/card";
import { ContactComponent } from './contacts/pages/contact/contact.component';
import { FormCreateContactComponent } from './contacts/components/form-create-contact/form-create-contact.component';
import { TransactionsTimelineComponent } from './pockets/components/transactions-timeline/transactions-timeline.component';
import { ChartComponent } from './pockets/components/chart/chart.component';
import { ChartModule } from "angular-highcharts";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatRadioButton } from "@angular/material/radio";
import { PageExpensesComponent } from './expenses/pages/page-expenses/page-expenses.component';
import { ExpenseCardComponent } from './expenses/components/expense-card/expense-card.component';
import { AddExpenseComponent } from './expenses/pages/add-expense/add-expense.component';
import { FormExpenseComponent } from './expenses/components/form-expense/form-expense.component';
import { HeaderComponent } from './public/components/header/header.component';
import { PageGroupDetailsComponent } from './group/pages/page-group-details/page-group-details.component';
import { FormPaymentComponent } from "./payments/components/form-payment/form-payment.component";
import { AddPaymentComponent } from "./payments/incoming/pages/add-payment/add-payment.component";
import { SignInComponent } from "./iam/pages/sign-in/sign-in.component";
import { SignUpComponent } from "./iam/pages/sign-up/sign-up.component";
import { AuthenticationSectionComponent } from "./iam/components/authentication-section/authentication-section.component";
import { authenticationInterceptor } from './iam/services/authentication.interceptor';
import { DarkModeSwitcherComponent } from './public/components/dark-mode-switcher/dark-mode-switcher.component';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LanguageSwitcherComponent,
    PageCreateGroupComponent,
    FormCreateGroupComponent,
    HomeComponent,
    PageGroupComponent,
    IncomingComponent,
    OutgoingComponent,
    ContactComponent,
    FormCreateContactComponent,
    TransactionsTimelineComponent,
    ChartComponent,
    PageExpensesComponent,
    ExpenseCardComponent,
    AddExpenseComponent,
    AddPaymentComponent,
    FormExpenseComponent,
    FormPaymentComponent,
    PageGroupDetailsComponent,
    AuthenticationSectionComponent,
    SignInComponent,
    SignUpComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatAnchor,
    HeaderComponent,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatSidenavContent,
    MatListItemAvatar,
    MatListItemLine,
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    MatSidenav,
    MatCard,
    MatCardModule,
    MatCardHeader,
    MatCardTitleGroup,
    MatDialogModule,
    MatIconModule,
    MatCheckbox,
    MatRadioButton,
    ChartModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggle,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    GroupService,
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
