import 'dart:convert';

import 'package:http/http.dart' as http;

import '../model/task_model.dart';

class TaskService {
  final String baseUrl = "http://192.168.1.143:8000/api";

  Future<List<TaskModel>> getTasksByUser(int userId) async {
    final url = Uri.parse("$baseUrl/tasks/user/$userId/tasks");

    final response = await http.get(
      url,
      headers: {"Accept": "application/json"},
    );

    print("TASK URL => $url");
    print("TASK STATUS => ${response.statusCode}");
    print("TASK BODY => ${response.body}");

    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);

      final List data = json['data'];

      return data.map((e) => TaskModel.fromJson(e)).toList();
    } else {
      throw Exception("دریافت وظایف ناموفق بود");
    }
  }

  Future<TaskModel> changeTaskStatus(int id, int statusId) async {
    final url = Uri.parse("$baseUrl/tasks/change-status/$id");

    final response = await http.post(
      url,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: jsonEncode({"status_id": statusId}),
    );

    print("CHANGE STATUS CODE => ${response.statusCode}");
    print("CHANGE STATUS BODY => ${response.body}");

    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);

      return TaskModel.fromJson(json["data"]);
    }

    throw Exception("Failed to change task status");
  }
}
