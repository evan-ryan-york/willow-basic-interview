# Instructions For This Task

First, clone this project onto your machine and run npm install to install all the dependencies.

This is a basic project that has a profile card for a user displaying their first and last name, birthday, and email. 

Add a button to the profile card that says edit. 

When you click edit, a dialog should pop up using Material UI's Dialog component (https://mui.com/material-ui/react-dialog/)

In the dialog there should be a form to edit each of the four fields and a submit button. 

The form validation should ensure no field is left blank and that the email is a valid email. The user should not be able to submit the form if those criteria are not met.

Use the Material UI Date Picker to edit the birthday (https://mui.com/x/react-date-pickers/date-picker/). 

When the user hits submit, you should use firebase to update the "user" collection (firebase is already installed with the package.json file) in the database and update the state holding the user information. Once the database and state have been updated, the dialog should close and you should be able to see the updated information on the card without hitting refresh.

Once you are done, submit your code as a pull request via github and then message me on upwork to notify me you're ready for me to review your work.

** Please note other people may also be working with this task, which means the data in the database for this user may change periodically.
