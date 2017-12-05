import { Component } from '@angular/core';

import { AboutPage,ContactPage, HomePage, PropertiesPage, SettingsPage } from '../pages';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = SettingsPage;
  tab5Root = PropertiesPage;

  constructor() {

  }
}
