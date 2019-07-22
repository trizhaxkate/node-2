# Project Summary

In this project you'll build an API that with the following entities

- Users
- User Profiles
- Posts
- Comments

The instructions in this readme are going to inform you what endpoints are going
to be necessary to power the desired functionality. It will be your job to then
implement these endpoints so they satisfy the specification.

Below are the 4 entities your API will need to interact with.

### Users

- id
- Email
- Password

### Profiles

- userId
- thumbnail - img url
- about - small summary about user

### Posts

- userId
- content

### Comments

- userId
- postId
- comment

## Before You Start
1. Fork this repository
2. Clone your fork to your local machine.

## Step 1 - Setup API server

This step is just typical project setup, installing librarys, adding boilerplate
code etc...

1.  Use `npm` to initialize a `package.json` file so we can track our project's
    dependencies

        npm init -y

2.  Let's install the necessary npm packages for this project. We'll use
    `express` as we have in previous projects.

        npm install --save express

3.  Let's create a `server` directory at the root of this project, and add an
    `index.js`

        mkdir server

        # also create an index.js file in the server directory

        touch server/index.js

4.  Now add the necessary code to get a new `express` server up and running.
    Refer to the documentation or previous projects if you don't recall how to
    accomplish that.

5.  Now run the server to make sure things are working as expected. If you
    encounter issues start debugging.

        node server/index.js

        # or if you have nodemon installed

        nodemon server/index.js

## Step 2 - Persist Data

We need a way to persist data for our API, we haven't gotten to the point where
we're going to use a database so we're just going to use a plain JavaScript
object as our datastore.

1.  Above where you defined your express app create an object called `db`. This
    object should have keys corresponding to the entities that were defined at
    the beginning of the README.

        const db = {
          users: {
            id: 0,
            data: [],
          },
          profiles: {
            id: 0,
            data: [],
          },
          posts: {
            id: 0,
            data: [],
          },
          comments: {
            id: 0,
            data: [],
          },
        };

    We'll use and manipulate this object to persist data with our API. Obviously
    this would not be a good idea for a real production application.

2.  To give ourselves access to this object throughout the applications we can
    use some functionality provided by `express`. Below where you first
    initialize the `app` in `index.js`

        const app = express();

        app.set('db', db);

    This will allow us to access the db object throughout our application,
    you'll see how to utilize it in future steps.

## Step 3 - Creating Users

Our application is not going to be very sophisticated, our sign-up and sign-in
flow is going to be very simple.

1.  We're going to create a `/sign-up` endpoint. It's going to be a `POST`
    request that takes in an `email` address and a `password`. When we recieve
    this data we're going to store it in our `db` object.

    Remember how we made it so we could access our `db` object throughout the
    application. Here's how you'd do that in a request handler.

         function(req, res) {
            const db = req.app.get('db')
         }

    > Hint: Remember to make the datastore operate correctly when adding new
    > users we're going to have to increment the `id` value on every new
    > creation. This is so we get a unique id for every new user. You'll have to
    > do this in any request handler that creates new entities.

    You don't have to, but you should consider implementing your request
    handlers in their own modules. Go on now, setup your endpoint :)

2.  Now that you have that endpoint created, you better test it. But we have a
    bit of a problem, there's no way to inspect the current state of the `db`
    object. Let's create a `debug` endpoint that just dumps the current state of
    the `db`. Add the following code to your app so you can easily inspect the
    updates to the `db`.

          app.get('/debug', (req, res) => {
            res.status(200).json(req.app.get('db'))
          })

    Now you can `sign-up` and then check that the state of the `db` is as you
    expect.

## Step 4 - Creating User Profiles

Now that our user has signed up they want to add some data about who they are.
We're going to store this data in a different place, the profiles part of our
`db`.

1. This has introduced an interesting flaw in our user creation, we created a
   `user` object, but didn't create a corresponding `profile` object. I think it
   makes sense to always create a `profile` object when a user is created, even
   though it will initially be empty. Modify your user creation endpoint to also
   create a `profile` when a new `user` is created.

   > Hint: The user `id` is how we connect the relationship between these
   > entities.

2. Now let's create an endpoint that can update a `profile`. We'll target
   `profiles` using a `user.id` as part of our URL path. Create `PATCH` request
   that updates the `profile` for a `user`

   > Hint: remember you can use path parameters in express, look at the
   > documentation if you need a reminder. Also, when you recieve those
   > parameters they will be Strings, remember that when doing comparisons.

## Step 5 - Creating Posts

Let's continue adding functionality to the API. Now we want to have an endpoint
that will allow users to create `posts`. Refer to the entities at the beginning
of the README for the data required for a post. Let's have the URL path be
`/posts`, and use a `POST` request to send the data to the API.

1. Create the endpoint in your express app.

2. Create the handler that will create `posts` with the data sent to the API.

3. Test to make sure your endpoint behaves as expected.

## Step 5 - Adding Comments To Posts

We want other users and ourselves to be able to comment on the posts we create.
Let's setup an endpoint that will enable that functionality.

1. Create an endpoint for creating comments. You should know by now that it
   should be a `POST` request. Let's have the URL Path be `/comments`.

2. When creating a comment you'll need to send a `userId` as well as the id of
   the post you're creating the comment for.

3. Create your handler for your endpoint.

4. Test your endpoint.

## Step 6 - Fetching our Profile

We want to be able to view our own profile, other users may want to be able to
view our profile as well, let's add an endpoint!

1. Create an endpoint that allows us to query user profiles by a users email
   address. This is a little tricky because `profiles` don't include an `email`
   field, but I'm confident you can solve the problem. Let's utilize a query
   parameter in this request, the URL path could be `/profile` then add your
   query parameter to the end of that path.

   > Hint: if you don't remember how to utilize query paremeters in express take
   > a look at the documentation.

2. Write your handler for that endpoint.
3. Test the endpoint.
4. Let's also make it so we can query that endpoint by `userId`. Modify your
   handler for this case as well.

## Step 7 - Fetching all of our posts

Our users want a way to view all of their posts, let's setup another endpoint.

1. The URL path should be `/user/:userId/posts`
2. Setup your endpoint, it sould be a `GET` request
3. Implement the handler for your endpoint.
4. Test your implementation.

## Step 8 - Viewing a Post

Let's setup an endpoint for viewing a single post.

1. The URL path should be `/posts/:postId`
2. Setup your endpoint, it should be a `GET` request
3. A requirement of this endpoint is that we can add a query parameter
   `comments` and based on that parameter we need to either return all comments
   related to the post or just return the post.
4. Implement your handler.
5. Test your implementation.

## Finished

Had enough? You should be feeling pretty comfortable with setting up endpoints
utilizing the express server framework.

In this project we are using a very primitive datastore, but in real
applications we'd use a real database to take care of persisting the data we're
interested in.

As for the endpoints, they are very indicative of what you'd be writing for a backend API.
