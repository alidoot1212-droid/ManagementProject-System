import 'package:flutter/material.dart';
import 'package:project_management/core/theme/app_theme.dart';
import 'package:project_management/pages/home_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,

      theme: AppTheme.lightTheme,

      home: const HomePage(),
    );
  }
}
