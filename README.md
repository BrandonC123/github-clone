Prototype version [Link Here](https://github-clone-5883f.web.app/)  
Demonstration GIF:  
<img src="/example-images/signin.gif">
  
Implemented Features By Route:  
Route: "/signup" Signup
 - Custom signup form mimicking actual GitHub signup interface  
 - Firebase authentication automatically detects if there is duplicate email  
 - Validation for relevant form types (email, username, password)  
  
Route: "/signin" Signin  
 - Main signin page with validation checking if account exists or not  
 - Links to redirect to create an account or login with a demo account  
  
Route: "/" Home
- UnAuthenticated (no user):  
    - Landing page with filler text and image  
    - Option to signup with pre-filled in email or options in header  
- Authenticated (user signed-in):  
    - Left sidebar: Display recent repositories and button for creating new repositories  
    - Main section displays recently created repositories from followed users  
  
Route: "/:username" View user profile  
 - View recently created repositories in a 3x2 grid  
 - Display user profile information along with a form to edit information using "Edit Profile" button   
 - Display contributions calendar showing when the user made changes to a repository  
 - If viewing another person's profile option to Follow/Unfollow user will be displayed instead of Edit Profile  

Route: "/:username/settings" Edit user profile  
 - Displays current user details with option to update  
 - Right column displays option to upload an image to crop and serve as profile image  
  
Route: ":/username/repositories" View user repositories  
 - View all user created repositories  
 - Option search, sort (last updated, name, stars), or create a new repository  
  
Route: Route: ":/username/stars" View user stars  
 - View all repositories that are starred by the user including repositories not owned by user  
 - Unstarring a repository displays animation with option to undo action as well as detailing what repository has been unstarred  
  
Route: "/new" Create new repository
 - Create a new repository with optional description field
 - Option to click checkbox for creating repository with README
 - Custom form validation checking for duplicate repository names and disables button if error is present  
  
Route: "/:username/:repoName" View repository  
 - Based on username and repository name the repository is fetched from Firestore Database and displayed  
 - Displays repository files that are stored in Firebase storage  
 - Depending on if the user is the owner of the repository an "Add File" dropdown will be present to allow users to upload files to it  

Route: "/:username/:repoName/upload" Upload file  
 - Utilize react-drag-drop-files for file upload  
 - Option to drag drop files to upload area or manually choose files to upload  
 - Display current files to be uploaded in list  
   


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
