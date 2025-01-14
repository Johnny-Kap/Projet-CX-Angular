import { AuthConfig } from "angular-oauth2-oidc";


export const authConfig: AuthConfig = {
    issuer: 'http://192.168.3.35:8080/o/oauth2/token',
    redirectUri: 'http://localhost:4200/',
    clientId: 'id-496e15b0-4768-3865-ba7f-5e79f0a473c3',
    responseType: 'code',
    scope: 'Liferay.Headless.Admin.User.everything',
    showDebugInformation: true,
    strictDiscoveryDocumentValidation: false,
  };