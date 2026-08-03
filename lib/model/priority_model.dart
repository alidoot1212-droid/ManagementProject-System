class PriorityModel {
  final int id;

  final String name;

  PriorityModel({required this.id, required this.name});

  factory PriorityModel.fromJson(Map<String, dynamic> json) {
    return PriorityModel(id: json['id'], name: json['name']);
  }
}
