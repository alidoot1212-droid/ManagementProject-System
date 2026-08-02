class TaskModel {
  final int id;

  final String blockCode;

  final String name;

  final int weight;

  final int value;

  final int teamMemberId;

  final int duration;

  final String assignment;

  final DateTime startDate;

  final DateTime dueDate;

  final DateTime? deliveryTime;

  final bool isDone;

  TaskModel({
    required this.id,
    required this.blockCode,
    required this.name,
    required this.weight,
    required this.value,
    required this.teamMemberId,
    required this.duration,
    required this.assignment,
    required this.startDate,
    required this.dueDate,

    this.deliveryTime,

    this.isDone = false,
  });

  factory TaskModel.fromJson(Map<String, dynamic> json) {
    return TaskModel(
      id: json['id'],

      blockCode: json['block_code'],

      name: json['name'],

      weight: json['weight'],

      value: json['value'],

      teamMemberId: json['team_member_id'],

      duration: json['duration'],

      assignment: json['assignment'],

      startDate: DateTime.parse(json['start_date']),

      dueDate: DateTime.parse(json['due_date']),

      deliveryTime: json['delivery_time'] != null
          ? DateTime.parse(json['delivery_time'])
          : null,

      isDone: json['is_done'] ?? false,
    );
  }

  TaskModel copyWith({
    int? id,

    String? blockCode,

    String? name,

    int? weight,

    int? value,

    int? teamMemberId,

    int? duration,

    String? assignment,

    DateTime? startDate,

    DateTime? dueDate,

    DateTime? deliveryTime,

    bool? isDone,
  }) {
    return TaskModel(
      id: id ?? this.id,

      blockCode: blockCode ?? this.blockCode,

      name: name ?? this.name,

      weight: weight ?? this.name.length,

      value: value ?? this.value,

      teamMemberId: teamMemberId ?? this.teamMemberId,

      duration: duration ?? this.duration,

      assignment: assignment ?? this.assignment,

      startDate: startDate ?? this.startDate,

      dueDate: dueDate ?? this.dueDate,

      deliveryTime: deliveryTime ?? this.deliveryTime,

      isDone: isDone ?? this.isDone,
    );
  }
}
