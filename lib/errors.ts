export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly userMessage: string;

  constructor(message: string, statusCode = 400, code = "BAD_REQUEST", userMessage?: string) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.userMessage = userMessage || message;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, userMessage?: string) {
    super(message, 400, "VALIDATION_ERROR", userMessage || "The provided input is invalid.");
  }
}

export class MediaNotFoundError extends AppError {
  constructor(message = "Media not found or is private.", userMessage?: string) {
    super(message, 404, "NOT_FOUND", userMessage || "This media could not be found or is set to private.");
  }
}

export class UnsupportedPlatformError extends AppError {
  constructor(message = "Unsupported platform.", userMessage?: string) {
    super(
      message,
      400,
      "UNSUPPORTED_PLATFORM",
      userMessage || "Only YouTube and Instagram URLs are currently supported."
    );
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Too many requests. Please try again shortly.", userMessage?: string) {
    super(
      message,
      429,
      "RATE_LIMIT_EXCEEDED",
      userMessage || "You have reached the temporary request limit. Please wait a moment before trying again."
    );
  }
}

export class ProcessingError extends AppError {
  constructor(message = "Failed to process media.", userMessage?: string) {
    super(
      message,
      500,
      "PROCESSING_ERROR",
      userMessage || "An error occurred while preparing your download. Please try again."
    );
  }
}

export function formatErrorResponse(err: unknown) {
  if (err instanceof AppError) {
    return {
      success: false,
      error: err.userMessage,
      code: err.code,
    };
  }

  const message = err instanceof Error ? err.message : "An unexpected error occurred.";
  return {
    success: false,
    error: "An unexpected error occurred. Please try again later.",
    code: "INTERNAL_SERVER_ERROR",
    details: process.env.NODE_ENV === "development" ? message : undefined,
  };
}

