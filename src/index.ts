import TokenRetriever from './TokenRetriever';
import { Context, S3Event } from 'aws-lambda';
import Axios from 'axios';
import { v4 } from 'uuid';

const tokenRetriever = new TokenRetriever();
const calendarId = 'nosquish.com_qnc0aue18807gi2j7gn7m5hdhg%40group.calendar.google.com';
const googleWatchApiEndpoint = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/watch`;

export const handler = async (e: S3Event, ctx: Context): Promise<void> => {
  const token = await tokenRetriever.getToken(),
    bearer = token.access_token,
    // create a data object object with unique id
    data = {
      "id": v4(),
      "type": "web_hook",
      "address": "https://avvmlahm0i.execute-api.us-west-2.amazonaws.com/dbl-goog-cal-webhook-listener"
    };

  const response = await Axios.post(googleWatchApiEndpoint,
    data,
    { headers: { Authorization: `Bearer ${bearer}` } });

  console.log(response?.data);

}
