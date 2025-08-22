import React from "react";

function ErrorPage({ message = "Something went wrong", status, stack, error }) {
  // Handle different error formats
  const displayMessage = error?.message || message;
  const displayStatus = error?.status || status;
  const displayStack = error?.stack || stack;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="alert alert-danger">
            <h1 className="alert-heading">
              {displayStatus ? `Error ${displayStatus}` : 'Error'}
            </h1>
            <p className="mb-0">{displayMessage}</p>
          </div>
          
          {displayStack && process.env.NODE_ENV === 'development' && (
            <div className="card">
              <div className="card-header">
                <h5>Stack Trace (Development Only)</h5>
              </div>
              <div className="card-body">
                <pre
                  style={{
                    background: "#f8f8f8",
                    padding: "1rem",
                    borderRadius: "6px",
                    whiteSpace: "pre-wrap",
                    fontSize: "0.875rem",
                    maxHeight: "400px",
                    overflowY: "auto"
                  }}
                >
                  {displayStack}
                </pre>
              </div>
            </div>
          )}
          
          <div className="mt-3">
            <button 
              className="btn btn-primary me-2" 
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
            <button 
              className="btn btn-outline-secondary" 
              onClick={() => window.location.href = '/'}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;