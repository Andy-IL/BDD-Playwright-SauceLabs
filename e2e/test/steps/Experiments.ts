// Steps file for cucumber practice
// 
import { Given, When, Then,  AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import test from 'node:test';
import { chromium, Browser, Page  } from 'playwright';
import {expect } from '@playwright/test' ;

let browser: Browser;
let page: Page;
setDefaultTimeout (15000) ;
