class TagModel {
  final int id;

  final String name;

  final String colorCode;

  TagModel({required this.id, required this.name, required this.colorCode});

  factory TagModel.fromJson(Map<String, dynamic> json) {
    return TagModel(
      id: json['id'],

      name: json['name'],

      colorCode: json['color_code'],
    );
  }
}
