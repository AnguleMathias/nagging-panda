/**
 * Interface representing a task
 * @interface
 */
export interface ITask {
  /**
   * The unique identifier for the task
   * @example '123e4567-e89b-12d3-a456-426614174000'
   * @type {string}
   */
  id: string;

  /**
   * The title of the task
   * @example 'Finish the report'
   * @type {string}
   */
  title: string;

  /**
   * A detailed description of the task
   * @example 'Complete the quarterly report by end of the week'
   * @type {string}
   */
  description: string;

  /**
   * The due date of the task
   * @example '2024-05-26T00:00:00Z'
   * @type {Date}
   */
  due_date: Date;

  /**
   * The priority of the task
   * @example 'High'
   * @enum ['Low', 'Medium', 'High']
   * @type {string}
   */
  priority: 'Low' | 'Medium' | 'High';

  /**
   * The status of the task
   * @example 'Pending'
   * @enum ['Pending', 'In Progress', 'Completed']
   * @type {string}
   */
  status: 'Pending' | 'In Progress' | 'Completed';

  /**
   * The identifier of the user assigned to the task
   * @example '123e4567-e89b-12d3-a456-426614174001'
   * @type {string}
   */
  assignee: string;

  /**
   * The date and time when the task was created
   * @example '2024-05-01T00:00:00Z'
   * @type {Date}
   */
  createdAt: Date;

  /**
   * The date and time when the task was last updated
   * @example '2024-05-20T00:00:00Z'
   * @type {Date}
   */
  updatedAt: Date;
}

/**
 * Interface for creating a new task
 * @interface
 */
export interface ICreateTaskDto {
  /**
   * The title of the task
   * @type {string}
   */
  title: string;

  /**
   * A detailed description of the task
   * @type {string}
   */
  description: string;

  /**
   * The due date of the task
   * @type {Date}
   */
  due_date: Date;

  /**
   * The priority of the task
   * @enum ['Low', 'Medium', 'High']
   * @type {string}
   */
  priority: 'Low' | 'Medium' | 'High';

  /**
   * The status of the task
   * @enum ['Pending', 'In Progress', 'Completed']
   * @type {string}
   */
  status: 'Pending' | 'In Progress' | 'Completed';

  /**
   * The identifier of the user assigned to the task
   * @type {string}
   */
  assignee: string;
}

/**
 * Interface for updating an existing task
 * @interface
 */
export interface IUpdateTaskDto {
  /**
   * The title of the task
   * @type {string}
   */
  title?: string;

  /**
   * A detailed description of the task
   * @type {string}
   */
  description?: string;

  /**
   * The due date of the task
   * @type {Date}
   */
  due_date?: Date;

  /**
   * The priority of the task
   * @enum ['Low', 'Medium', 'High']
   * @type {string}
   */
  priority?: 'Low' | 'Medium' | 'High';

  /**
   * The status of the task
   * @enum ['Pending', 'In Progress', 'Completed']
   * @type {string}
   */
  status?: 'Pending' | 'In Progress' | 'Completed';

  /**
   * The identifier of the user assigned to the task
   * @type {string}
   */
  assignee?: string;
}
