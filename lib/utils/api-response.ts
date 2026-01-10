import { NextResponse } from 'next/server'

/**
 * Standardized API error response
 */
export interface ApiError {
  error: string
  code?: string
  details?: unknown
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  error: string,
  status: number = 500,
  code?: string,
  details?: unknown
): NextResponse<ApiError> {
  const response: ApiError = { error }
  if (code) response.code = code
  if (details) response.details = details

  return NextResponse.json(response, { status })
}

/**
 * Creates a standardized success response
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200
): NextResponse<{ success: true; data: T }> {
  return NextResponse.json({ success: true, data }, { status })
}

/**
 * Common error responses
 */
export const ApiErrors = {
  badRequest: (message: string = 'Hibás kérés') =>
    createErrorResponse(message, 400, 'BAD_REQUEST'),
  
  unauthorized: (message: string = 'Nincs jogosultság') =>
    createErrorResponse(message, 401, 'UNAUTHORIZED'),
  
  forbidden: (message: string = 'Hozzáférés megtagadva') =>
    createErrorResponse(message, 403, 'FORBIDDEN'),
  
  notFound: (message: string = 'Nem található') =>
    createErrorResponse(message, 404, 'NOT_FOUND'),
  
  tooManyRequests: (message: string = 'Túl sok kérés. Próbáld újra később.') =>
    createErrorResponse(message, 429, 'TOO_MANY_REQUESTS'),
  
  internalServerError: (message: string = 'Belső szerver hiba') =>
    createErrorResponse(message, 500, 'INTERNAL_SERVER_ERROR'),
  
  serviceUnavailable: (message: string = 'Szolgáltatás jelenleg nem elérhető') =>
    createErrorResponse(message, 503, 'SERVICE_UNAVAILABLE'),
}
