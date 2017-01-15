      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '574128354356-nve60tdeu0bt4v3jr06lmt2ke9e2lj5u.apps.googleusercontent.com';
      var SCOPES = ["https://www.googleapis.com/auth/calendar"];
      var authPrompt = false;
      /**
       * Check if current user has authorized this application.
       */
      function checkInitAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleInitAuthResult);
      }

      function checkAuth(event) {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': authPrompt
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
       function handleInitAuthResult(authResult){
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authPrompt=true;

        } else {
          authPrompt=false;
        }
       }
      function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          gapi.client.load('calendar', 'v3', handleAddClick);

        } else {
        }
      }

      /**
       * Initiate auth flow in response to user clicking add button.
       *
       * @param {Event} event Button click event.
       */
      function handleAddClick(){
        var event = {
          'summary': 'Abhishek\'s Birthday',
          'description': 'OK',
          'start': {
            'date' : '2017-08-01',
            'timeZone': 'Asia/Kolkata'
          },
          'end': {
            'date' : '2017-08-02',
            'timeZone': 'Asia/Kolkata'
          },
          'recurrence': [
            'RRULE:FREQ=YEARLY;',
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        };

      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });

      request.execute(function(event) {
        authPrompt = true;
      	document.getElementById('confirmation').style.visibility='visible';
      	document.getElementById('confirm').href = event.htmlLink;
      });
  } 