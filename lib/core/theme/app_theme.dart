import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData lightTheme = ThemeData(
    fontFamily: "IranSans",

    brightness: Brightness.light,

    scaffoldBackgroundColor: const Color(0xffF8F8FC),

    colorScheme: const ColorScheme.light(
      primary: Color(0xff8B5CF6),

      secondary: Color(0xffA78BFA),

      surface: Colors.white,
    ),

    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.white,

      elevation: 0,

      centerTitle: true,

      titleTextStyle: TextStyle(
        fontFamily: "IranSans",

        fontSize: 20,

        fontWeight: FontWeight.bold,

        color: Color(0xff222222),
      ),
    ),

    textTheme: const TextTheme(
      bodyMedium: TextStyle(
        fontFamily: "IranSans",

        fontSize: 14,

        color: Color(0xff333333),
      ),

      titleLarge: TextStyle(
        fontFamily: "IranSans",

        fontSize: 22,

        fontWeight: FontWeight.bold,

        color: Color(0xff111111),
      ),
    ),
  );
}
