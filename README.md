WallApp
===

This is my first Django, Django REST Framework, and React project. 


Requirements
---

 - `python3`
 - `pip`
 - `npm`


Setup
---

 - `./install.sh`


Test
---

 - `./test.sh`


Use
---
 - `./run.sh`
   - This runs both the Django backend (through `pipenv`, at `localhost:8000`)
     and React (through `npm`, at `localhost:3000`)
 - Navigate to [http://localhost:3000](http://localhost:3000) if it didn't open
   automatically


Known issues
---

 - General
   - `core` is probably a bad name for the backend Django app
   - For as simple of functionality as this app has, `core` could be rolled into
     `wallapp` directly
   - I'm unsure as to whether or not it's a good idea to have a React app
     sitting within the Django project directory
   - The client-side app is unrefined and ugly
   - **User and Post detail views do not yet work.**
 - Testing
   - As I'm new to Django, Django REST Framework, React, and REST API design in
     general, I'm not really sure what needs to be tested and whether or not my
     existing tests are redundant
 - Signup
   - Email addresses are not required
   - Email addresses are not checked for validity
   - Welcome emails are output to the terminal using
     `EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'`
   - No client-side feedback for failure
 - Login
   - No client-side feedback for failure
   - Restarting the server leaves client in a state where it thinks it's logged
     in but its authentication has expired. (Logging out and back in again fixes
     the problem)
