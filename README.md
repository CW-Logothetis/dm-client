# Cognitiv+ Assignment – Full Stack Engineer

Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Deploy Link](#deploy)
4. [Dependencies](#dependencies)
5. [Log](#log)
6. [Bugs](#bugs)
7. [To Do List](#todo)
8. [Running the Project](#runproject)


## OVERVIEW <a name="overview"></a>

Build a small project called DocumentManager - a document catalog where the user can:
- upload,
- browse,
- delete and 
- possibly search and filter their documents.


## FEATURES <a name="features"></a>

a. DOCUMENT LIST
- Users can see a list of uploaded documents (10 docs per page) with: Name; Type; Upload date; and Assignees.
- The document list should also provide a delete action per document.

b. FILE UPLOAD

- To upload: PDF and HTML files
- Select and upload multiple documents
- Add 1+ Assignees on selection (to the whole batch, not per document)

### Missing Features
- Paginated table (Document List) uses dummy data (not connected to server - see Log below). On form submit the table does not update.
- Progress bar on upload (for multiple documents, attempt upload progress per document)
- Bad UX experience - missing messages to notify of upload success or errors


## DEPLOY LINK

INSERT Netlify link:


## DEPENDENCIES <a name="dependencies"></a>

- React
- React-DOM

DataTable
- react-table.tanstack.com

Assignee Tags
- react-tagsinput


## LOG <a name="log"></a>

1. I first drafted a simple form with a text input for assignees and a file input.
2. As the project would not have a back-end, I wrote some dummy data in makeData.json, which populated a simple table as Initial State. On file submit, state would update with the text and file input.
3. Added multiple file input.
4. Added tags from react-tagsinput, to replace the simple text input.
5. Added a table component (react-table) to allow for pagination, search and filter. 

Here was my first big problem: the table initialises with the dummy data from makeData.json, but on submission of a new form I cannot find a way to pass state into this component. With the original, simple table it was straightforward; it passed with props from the form into the table rows. The paginated table component is more complicated and it has defeated me. I attempted to update the makeData.json with the updated form state, but could not. I realised the night before submission that it needs converting to a .js file from .json. But I ran out of time.
Therefore, in the deployed app the paginated table does not update.

6. Progress bar onload - Axios has built in functionality for this. Here, I went down a rabbit hole. I should have added Axios and tried testing it with a simple connection to a free image/file host. However, I decided that I wanted to connect a back-end, which would enable me to send updated data to the paginated table too. I was not successful, but learnt a lot trying the following:

a. MongoDb has a MERN tutorial involving a simple form. I set-up the project with a Mongoose schema and it worked, but my adapation of the simple form in the tutorial with the tags and file input failed. It was interesting to see how React-Axios-Express-Mongoose-Mongo all connect though.

b. Set-up express/multer/cors. This worked and I was able to upload and download multiple documents with a progress bar (see attached image). But again, I could not pass state from the tags and paginated table.


## BUGS <a name="bugs"></a>

- Paginated table does not update on form submit. Cannot find a way to pass updated form state to the table component.


## TO DO <a name="todo"></a>

- at least change the makeData.json file to allow the form to add to the dummy data, which will update the table component.



## RUNNING THE PROJECT <a name="runproject"></a>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
