import { PROFILE_CONSTRAINTS } from '@/data/constants';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateProfileData = (profileData: {
  name: string;
  age: number;
  favoriteCharacters?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate name
  if (!profileData.name || profileData.name.trim().length === 0) {
    errors.push({
      field: 'name',
      message: 'Name is required'
    });
  } else if (profileData.name.length < PROFILE_CONSTRAINTS.name.minLength) {
    errors.push({
      field: 'name',
      message: `Name must be at least ${PROFILE_CONSTRAINTS.name.minLength} character`
    });
  } else if (profileData.name.length > PROFILE_CONSTRAINTS.name.maxLength) {
    errors.push({
      field: 'name',
      message: `Name must be less than ${PROFILE_CONSTRAINTS.name.maxLength} characters`
    });
  } else if (!PROFILE_CONSTRAINTS.name.pattern.test(profileData.name)) {
    errors.push({
      field: 'name',
      message: 'Name must contain only letters, numbers, and spaces'
    });
  }

  // Validate age
  if (!profileData.age) {
    errors.push({
      field: 'age',
      message: 'Age is required'
    });
  } else if (profileData.age < PROFILE_CONSTRAINTS.age.min || profileData.age > PROFILE_CONSTRAINTS.age.max) {
    errors.push({
      field: 'age',
      message: `Please select an age between ${PROFILE_CONSTRAINTS.age.min}-${PROFILE_CONSTRAINTS.age.max}`
    });
  }

  // Validate favorite characters (optional)
  if (profileData.favoriteCharacters && profileData.favoriteCharacters.length > PROFILE_CONSTRAINTS.favoriteCharacters.maxLength) {
    errors.push({
      field: 'favoriteCharacters',
      message: `Favorite characters must be less than ${PROFILE_CONSTRAINTS.favoriteCharacters.maxLength} characters`
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRequired = (value: string, fieldName: string): ValidationError | null => {
  if (!value || value.trim().length === 0) {
    return {
      field: fieldName,
      message: `${fieldName} is required`
    };
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationError | null => {
  if (value.length < minLength) {
    return {
      field: fieldName,
      message: `${fieldName} must be at least ${minLength} characters`
    };
  }
  return null;
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationError | null => {
  if (value.length > maxLength) {
    return {
      field: fieldName,
      message: `${fieldName} must be less than ${maxLength} characters`
    };
  }
  return null;
};