import 'package:project_management/model/priority_model.dart';
import 'package:project_management/model/status_model.dart';
import 'package:project_management/model/tag_model.dart';
import 'package:project_management/model/team_member_model.dart';

class TaskModel {
  final int id;
  final int workBlockId;

  final String name;

  final int weight;
  final int value;

  final String? description;

  final PriorityModel priority;

  final StatusModel status;

  final TeamMemberModel teamMember;

  final String assignedAt;

  final String dueDate;

  final String? completedAt;

  final List<TagModel> tags;

  final String createdAt;

  final String updatedAt;

  TaskModel({
    required this.id,
    required this.workBlockId,
    required this.name,
    required this.weight,
    required this.value,
    this.description,

    required this.priority,
    required this.status,
    required this.teamMember,

    required this.assignedAt,
    required this.dueDate,

    this.completedAt,

    required this.tags,

    required this.createdAt,
    required this.updatedAt,
  });

  factory TaskModel.fromJson(Map<String, dynamic> json) {
    return TaskModel(
      id: json['id'],

      workBlockId: json['work_block']['id'],

      name: json['name'],

      weight: json['weight'],

      value: json['value'],

      description: json['description'],

      priority: PriorityModel.fromJson(json['priority']),

      status: StatusModel.fromJson(json['status']),

      teamMember: TeamMemberModel.fromJson(json['team_member']),

      assignedAt: json['assigned_at'],

      dueDate: json['due_date'],

      completedAt: json['completed_at'],

      tags: json['tags'] != null
          ? List<TagModel>.from(json['tags'].map((x) => TagModel.fromJson(x)))
          : [],

      createdAt: json['created_at'],

      updatedAt: json['updated_at'],
    );
  }
}
