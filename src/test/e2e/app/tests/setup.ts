import 'reflect-metadata';
import 'nativescript-angular/zone-js/dist/zone-nativescript';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy'; // since zone.js 0.6.15
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch'; // put here since zone.js 0.6.14
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { platformBrowserDynamicTesting, BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TestBed, } from '@angular/core/testing';
import { NS_COMPILER_PROVIDERS } from 'nativescript-angular/platform';

// config TestBed with TNS provider
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(NS_COMPILER_PROVIDERS)
);
