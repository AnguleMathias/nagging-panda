import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(task: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  findAll(userId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user_id: userId },
      relations: ['user'],
    });
  }

  findOne(id: string): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksRepository.save({ ...updateTaskDto, id });
  }

  remove(id: string): Promise<void> {
    return this.tasksRepository.delete(id).then(() => undefined);
  }

  async getDashboard(userId: string) {
    const tasks = await this.tasksRepository.find({
      where: { user_id: userId },
    });
    const overdueTasks = tasks.filter(
      (task) =>
        new Date(task.due_date) < new Date() && task.status !== 'Completed',
    );
    const overdueDays = overdueTasks.map((task) => ({
      ...task,
      overdueDays: Math.ceil(
        (new Date().getTime() - new Date(task.due_date).getTime()) /
          (1000 * 3600 * 24),
      ),
    }));
    const outstandingTasks = tasks.filter(
      (task) => task.status !== 'Completed',
    ).length;

    return {
      totalTasks: tasks.length,
      outstandingTasks,
      overdueTasks: overdueDays.length,
      overdueTaskDetails: overdueDays,
    };
  }

  async searchAndFilter(userId: string, searchParams: any): Promise<Task[]> {
    const where: any = { user_id: userId };

    if (searchParams.title) {
      where.title = searchParams.title;
    }
    if (searchParams.status) {
      where.status = searchParams.status;
    }
    if (searchParams.priority) {
      where.priority = searchParams.priority;
    }
    if (searchParams.dueDate) {
      where.due_date = Between(new Date(searchParams.dueDate), new Date());
    }

    return this.tasksRepository.find({ where });
  }
}
