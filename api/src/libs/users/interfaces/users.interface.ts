/**
 * Interface representing a user
 * @interface
 */
export interface IUser {
  /**
   * The unique identifier for the user
   * @example '123e4567-e89b-12d3-a456-426614174000'
   * @type {string}
   */
  id: string;

  /**
   * The username of the user
   * @example 'john_doe'
   * @type {string}
   */
  username: string;

  /**
   * The email address of the user
   * @example 'john_doe@example.com'
   * @type {string}
   */
  email: string;

  /**
   * The hashed password of the user
   * @example '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36T8EnzO3W7hdA2kB18Y.yC'
   * @type {string}
   */
  password: string;

  /**
   * The date and time when the user was created
   * @example '2024-05-01T00:00:00Z'
   * @type {Date}
   */
  createdAt: Date;

  /**
   * The date and time when the user was last updated
   * @example '2024-05-20T00:00:00Z'
   * @type {Date}
   */
  updatedAt: Date;
}

/**
 * Interface for creating a new user
 * @interface
 */
export interface ICreateUserDto {
  /**
   * The username of the user
   * @type {string}
   */
  username: string;

  /**
   * The email address of the user
   * @type {string}
   */
  email: string;

  /**
   * The password of the user
   * @type {string}
   */
  password: string;
}

/**
 * Interface for updating an existing user
 * @interface
 */
export interface IUpdateUserDto {
  /**
   * The username of the user
   * @type {string}
   */
  username?: string;

  /**
   * The email address of the user
   * @type {string}
   */
  email?: string;

  /**
   * The password of the user
   * @type {string}
   */
  password?: string;
}
