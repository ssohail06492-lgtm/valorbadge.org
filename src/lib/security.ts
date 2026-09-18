/**
 * Security & Data Sanitization Library for ValorBadge
 * Provides XSS sanitization, form input validation, rate limiting, and classified data prevention.
 */

// HTML entity escaping for XSS prevention
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// Strips dangerous script tags and event handlers from formatted text
export function sanitizeRichText(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/on\w+=\S+/gi, '')
    .trim();
}

/**
 * Military Data Security Filter
 * Identifies potentially sensitive, restricted, classified, or operational terms
 * to prevent accidental violation of security protocols by veterans.
 */
const RESTRICTED_TERMS = [
  'classified',
  'top secret',
  'secret operational',
  'operation code',
  'warhead',
  'ballistic missile spec',
  'radar frequency array',
  'troop deployment grid',
  'tactical coordinate',
  'nuclear yield',
  'submarine acoustic signature',
  'encrypted cipher key',
  'raw intelligence report',
  'restricted grid reference'
];

export interface SecurityScreenResult {
  isClean: boolean;
  detectedTerms: string[];
  warningMessage?: string;
}

export function screenClassifiedInfo(text: string): SecurityScreenResult {
  if (!text) return { isClean: true, detectedTerms: [] };
  const lower = text.toLowerCase();
  const detected = RESTRICTED_TERMS.filter(term => lower.includes(term));

  if (detected.length > 0) {
    return {
      isClean: false,
      detectedTerms: detected,
      warningMessage: `Potential restricted/classified military terminology detected: "${detected.join(', ')}". For your national security and legal protection, please remove operational military codes before submitting.`
    };
  }

  return { isClean: true, detectedTerms: [] };
}

/**
 * Form Input Validators
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
}

export function validatePhone(phone: string): ValidationResult {
  if (!phone || !phone.trim()) {
    return { isValid: false, error: 'Phone number is required.' };
  }
  // Accepts standard Indian mobile numbers (10 digits optionally with +91)
  const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
  const cleanPhone = phone.replace(/[\s\-]/g, '');
  if (!phoneRegex.test(cleanPhone) && cleanPhone.length !== 10) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number.' };
  }
  return { isValid: true };
}

export function validateRequired(value: string, fieldName: string, minLength = 2, maxLength = 500): ValidationResult {
  if (!value || !value.trim()) {
    return { isValid: false, error: `${fieldName} is required.` };
  }
  const clean = value.trim();
  if (clean.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters.` };
  }
  if (clean.length > maxLength) {
    return { isValid: false, error: `${fieldName} cannot exceed ${maxLength} characters.` };
  }
  return { isValid: true };
}

/**
 * Client-Side Rate Limiter
 * Prevents spamming form submissions (e.g. applications, fraud reports, feedback).
 */
const rateLimitStore = new Map<string, number[]>();

export interface RateLimitStatus {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function checkRateLimit(actionKey: string, maxAttempts = 5, windowMs = 60000): RateLimitStatus {
  const now = Date.now();
  const timestamps = rateLimitStore.get(actionKey) || [];

  // Filter out timestamps outside window
  const recent = timestamps.filter(ts => now - ts < windowMs);

  if (recent.length >= maxAttempts) {
    const oldest = recent[0];
    const retryAfter = Math.ceil((windowMs - (now - oldest)) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, retryAfter)
    };
  }

  // Record this attempt
  recent.push(now);
  rateLimitStore.set(actionKey, recent);

  return {
    allowed: true,
    remaining: maxAttempts - recent.length,
    retryAfterSeconds: 0
  };
}

/**
 * Authentication & Role Access Guard
 */
export interface AuthSession {
  isAuthenticated: boolean;
  role: 'user' | 'employer' | 'admin';
  userEmail: string;
  userName: string;
  sessionExpiry: number;
}

const AUTH_STORAGE_KEY = 'valorbadge_auth_session';

export function getStoredAuthSession(): AuthSession {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data) as AuthSession;
      if (parsed.sessionExpiry && parsed.sessionExpiry > Date.now()) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  // Default active session for demonstration
  return {
    isAuthenticated: true,
    role: 'user',
    userEmail: 'rajesh.sharma@example.com',
    userName: 'Subedar Rajesh Sharma (Retd.)',
    sessionExpiry: Date.now() + 24 * 60 * 60 * 1000
  };
}

export function saveAuthSession(session: AuthSession): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore
  }
}

export function clearAuthSession(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Checks if a given role is allowed to view the requested route
 */
export function canAccessRoute(role: 'user' | 'employer' | 'admin', route: string): boolean {
  const adminRoutes = ['admin_dashboard', 'admin_verification', 'admin_logs', 'user_management', 'system_health'];
  const employerRoutes = ['employer_dashboard', 'company_profile', 'employer_candidates', 'employer_jobs', 'employer_applications', 'create_job', 'manage_jobs'];

  if (adminRoutes.includes(route)) {
    return role === 'admin';
  }
  if (employerRoutes.includes(route)) {
    return role === 'employer' || role === 'admin';
  }
  return true;
}
