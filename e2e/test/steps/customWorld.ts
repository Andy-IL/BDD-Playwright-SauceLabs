//  part of trying to establish a global page session usable in multiple steps files 
//
import { chromium, ChromiumBrowser , Page } from 'playwright';

class CustomWorld {
  public browser: any ;
  public page: any ;

  public async init(): Promise<void> {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
  }

  public async close(): Promise<void> {
    await this.browser.close();
  }
}

export const world = new CustomWorld();