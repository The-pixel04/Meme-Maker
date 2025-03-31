# Meme Maker 🎨🧬

Meme Maker is a fun and interactive web application that allows users to create, edit, save  and share hilarious memes effortlessly! Built with modern web technologies, it provides a seamless user experience for meme enthusiasts.

## Overview 🌟

- **Frontend**: Built with [React](https://reactjs.org/) for a dynamic and responsive user interface.
- **Backend**: Powered by [Back4App](https://www.back4app.com/) (Parse Server) for managing data and APIs.
- **State Management**: Utilizes React **hooks** 🪝 (`useState`, `useEffect`, `useContext`) for efficient state and lifecycle management + custom hooks.
- **Routing**: Implements client-side routing with [React Router](https://reactrouter.com/).
- **Styling**: Styled with CSS Modules and Ant Design for a clean and modern look.
- **Pagination**: Includes pagination for browsing memes in the catalog.
- **Error Handling**: Centralized error handling with a custom `ErrorContext`.
- **Authentication**: Features user authentication (login, register, logout) with protected routes.
- **Meme Features**:
  - Create memes with custom text.
  - View the latest memes.
  - Edit and delete your memes.
  - Browse memes in a paginated catalog.

## API Requests 🌐

The application communicates with the Back4App REST API to perform CRUD operations for managing memes and user data. Below are the key API requests used in the application:

### Endpoints

1. **Get Memes (Paginated)**
   - **Endpoint**: `GET /classes/slass`
   - **Description**: Fetches a paginated list of memes.
   - **Example**:
     ```json
     GET /classes/Memes?limit=10&skip=20
     ```

2. **Create Meme**
   - **Endpoint**: `POST /classes/class`
   - **Description**: Creates a new meme with custom text and image.
   - **Request Body**:
     ```json
     {
       "imageUrl": "https://example.com/meme.jpg",
       "topText": "Top Text",
       "bottomText": "Bottom Text",
       "textSize": 20,
       "topTextColor": "#FFFFFF",
       "bottomTextColor": "#000000"
     }
     ```

3. **Edit Meme**
   - **Endpoint**: `PUT /classes/class/:objectId`
   - **Description**: Updates an existing meme.
   - **Request Body**:
     ```json
     {
       "topText": "Updated Top Text",
       "bottomText": "Updated Bottom Text"
     }
     ```

4. **Delete Meme**
   - **Endpoint**: `DELETE /classes/class/:objectId`
   - **Description**: Deletes a meme by its `objectId`.

5. **User Authentication**
   - **Login**:
     - **Endpoint**: `POST /login`
     - **Request Body**:
       ```json
       {
         "username": "user123",
         "password": "password123"
       }
       ```
   - **Register**:
     - **Endpoint**: `POST /users`
     - **Request Body**:
       ```json
       {
         "username": "user123",
         "password": "password123",
         "email": "user@example.com"
       }
       ```

### Headers

All requests include the following headers:
- **Application ID**: `X-Parse-Application-Id: YOUR_APP_ID`
- **REST  KeyAPI**: `X-Parse-REST-API-Key: YOUR_API_KEY`
- **Content-Type**: `application/json`

### Error Handling

The application handles API errors gracefully by displaying user-friendly

## Key Features 🚀

- **Responsive Design**: Fully responsive and mobile-friendly.
- **Interactive UI**: Smooth user interactions with Ant Design components.
- **API Integration**: Communicates with Back4App REST API with CRUD operations.
- **Reusable Components**: Modular and reusable React components for scalability.
- **Abortable Requests**: Uses `AbortController` to handle request cancellations.

## How It Works 🛠️

1. **Choose an Image**: Choose an image URL.
2. **Add Text**: Customize your meme with top and bottom text.
3. **Customize**: Adjust text size and color.
4. **Save & Share**: Save your meme and share it with the world!

## Tech Stack 🧰

- **Frontend**: React, React Router, Ant Design
- **Backend**: Back4App (Parse Server)
- **State Management**: React Hooks
- **Styling**: CSS Modules
- **API**: REST API with Back4App
