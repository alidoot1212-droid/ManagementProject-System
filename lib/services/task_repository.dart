import '../model/task_model.dart';
import '../services/task_service.dart';

class TaskRepository {
  final TaskService service;

  TaskRepository({required this.service});

  Future<List<TaskModel>> getTasksByUser(int userId) {
    return service.getTasksByUser(userId);
  }

  Future<TaskModel> changeTaskStatus(int id, int statusId) {
    return service.changeTaskStatus(id, statusId);
  }
}
