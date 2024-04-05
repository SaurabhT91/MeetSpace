import React from "react";
import { useRouteError } from "react-router-dom";
import "../styles/error-page.css"; // Import CSS file

function ErrorPage() {
    const error = useRouteError();

    // Check if error object exists and extract error message
    const errorMessage = error ? (error.statusText || error.message || "Unknown error occurred") : "Unknown error occurred";

    return (
        <div id="error-page">
            <h1>Oops! Something went wrong</h1>
            <p>We apologize, but an unexpected error has occurred.</p>
            <p className="error-message">
                <strong>Error:</strong> {errorMessage}
            </p>
        </div>
    );
}

export default ErrorPage;
