# Meme Maker 🤡

Meme Maker is a fun and interactive web application that allows users to create, edit, save  and share hilarious memes effortlessly! Built with modern web technologies, it provides a seamless user experience for meme enthusiasts. [Meme-Maker](https://mememake.netlify.app/)

## Overview 🌟

- **Frontend**: Built with [React](https://reactjs.org/) for a dynamic and responsive user interface.
- **Backend**: Powered by [Back4App](https://www.back4app.com/) for managing data and APIs.
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

## Key Features 🚀

- **Responsive Design**: Fully responsive and mobile-friendly.
- **Interactive UI**: Smooth user interactions with Ant Design components.
- **API Integration**: Communicates with Back4App REST API with CRUD operations.
- **Reusable Components**: Modular and reusable React components for scalability.
- **Abortable Requests**: Uses `AbortController` to handle request cancellations.
- **AI-Powered Meme Ideas Generator**: Generate creative meme text ideas using AI-powered prompts.

## How It Works 🛠️

1. **Choose an Image**: Choose an image URL.
2. **Add Text**: Customize your meme with top and bottom text.
3. **Customize**: Adjust text size and color.
4. **Save & Share**: Save your meme and share it with the world!

## Meme Generator Ideas 💡

The application includes an **AI-powered Meme Ideas Generator** that helps users create funny meme text suggestions:

1. **Enter a Prompt**: Type a meme topic or idea as a text prompt (e.g., "funny cat moments", "office humor").
2. **Generate Ideas**: Click the "View response" button to send the prompt to the AI API.
3. **View Results**: The AI returns creative meme text suggestions with top and bottom text ideas.

### API Integration

- **Endpoint**: Integrates with [Jina AI](https://jina.ai/) API via `useGenerateIdea()` hook
- **Service**: Jina AI's generative models for creative text generation
- **Request**: Sends user's prompt to generate meme ideas
- **Loading State**: Shows "Generating..." status while waiting for AI response

## Tech Stack 🧰

- **Frontend**: React, React Router, Ant Design
- **Backend**: Back4App
- **State Management**: React Hooks
- **Styling**: CSS Modules
- **API**: REST API with Back4App

## API Requests 🌐

The application communicates with the Back4App REST API to perform CRUD operations for managing memes and user data. Below are the key API requests used in the application:

### Endpoints

1. **Get Memes (Paginated)**
   - **Endpoint**: `GET /classes/class`
   - **Description**: Fetches a paginated list of memes.
   - **Example**:
     ```json
     GET /classes/class?limit=10&skip=20
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

5. **Generate Meme Ideas (Jina AI)**
   - **Endpoint**: Jina AI API
   - **Description**: Generates creative meme text suggestions based on a user prompt using Jina AI.
   - **Request Body**:
     ```json
     {
       "prompt": "funny cat moments"
     }
     ```
   - **Response Body**:
     ```json
     {
       "choices": [
         {
           "message": {
             "content": {
               "Response"
             }
           }
         }
       ]
     }
     ```

6. **User Authentication**
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
- **REST API Key**: `X-Parse-REST-API-Key: YOUR_API_KEY`
- **Content-Type**: `application/json`

### Error Handling

The application handles API errors gracefully by displaying user-friendly pop-up.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.