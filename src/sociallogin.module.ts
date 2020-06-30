import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { SocialAuthService, SocialAuthServiceConfig } from './socialauth.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    SocialAuthService,
  ],
})
export class SocialLoginModule {
  public static initialize(config: SocialAuthServiceConfig): ModuleWithProviders {
    return {
      ngModule: SocialLoginModule,
      providers: [
        SocialAuthService,
        {
          provide: 'SocialAuthServiceConfig',
          useValue: config,
        },
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: SocialLoginModule) {
    if (parentModule) {
      throw new Error(
        'SocialLoginModule is already loaded. Import it in the AppModule only');
    }
  }
}
