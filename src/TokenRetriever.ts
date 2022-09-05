import { TokenResponse } from './types';

const
  google = require('googleapis'),
  token = {
    type: 'service_account',
    project_id: 'dbl-cal-webhook',
    private_key_id: '',
    private_key: '',
    client_email: '',
    client_id: '',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/dbl-webhook%40dbl-cal-webhook.iam.gserviceaccount.com'
  },
  scopes = ['https://www.googleapis.com/auth/calendar.readonly', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.settings.readonly', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.events.readonly'];

export default class TokenRetriever {

  async getToken(): Promise<TokenResponse> {
    const googleJWTClient = new google.Auth.JWT(
      token.client_email,
      undefined,
      token.private_key,
      scopes,
      undefined,
    )

    const access_token = await googleJWTClient.authorize();

    return access_token as TokenResponse;
  }
}