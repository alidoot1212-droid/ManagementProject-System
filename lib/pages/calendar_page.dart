import 'package:flutter/material.dart';
import '../widgets/calendar_grid.dart';

class CalendarPage extends StatelessWidget {
  const CalendarPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,

      child: Scaffold(
        backgroundColor: const Color(0xffF8F7FF),

        appBar: AppBar(
          elevation: 0,

          centerTitle: true,

          title: const Text(
            "تقویم وظایف",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20,
              color: Colors.white,
            ),
          ),

          iconTheme: const IconThemeData(color: Colors.white),

          flexibleSpace: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xff6D28D9), Color(0xffC084FC)],

                begin: Alignment.topRight,

                end: Alignment.bottomLeft,
              ),
            ),
          ),
        ),

        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16),

          child: Column(
            children: [
              // Header Card
              Container(
                width: double.infinity,

                padding: const EdgeInsets.all(22),

                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [
                      Color(0xff6D28D9),

                      Color(0xff8B5CF6),

                      Color(0xffC084FC),
                    ],

                    begin: Alignment.topRight,

                    end: Alignment.bottomLeft,
                  ),

                  borderRadius: BorderRadius.circular(35),

                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xff7C3AED).withOpacity(.35),

                      blurRadius: 25,

                      offset: const Offset(0, 12),
                    ),
                  ],
                ),

                child: Stack(
                  children: [
                    Positioned(
                      right: -30,

                      top: -30,

                      child: Container(
                        width: 130,

                        height: 130,

                        decoration: BoxDecoration(
                          shape: BoxShape.circle,

                          color: Colors.white.withOpacity(.08),
                        ),
                      ),
                    ),

                    Positioned(
                      left: -40,

                      bottom: -40,

                      child: Container(
                        width: 150,

                        height: 150,

                        decoration: BoxDecoration(
                          shape: BoxShape.circle,

                          color: Colors.white.withOpacity(.06),
                        ),
                      ),
                    ),

                    Row(
                      children: [
                        Container(
                          width: 75,

                          height: 75,

                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(.18),

                            shape: BoxShape.circle,

                            border: Border.all(
                              color: Colors.white.withOpacity(.3),

                              width: 1.5,
                            ),
                          ),

                          child: const Icon(
                            Icons.event_note_rounded,

                            color: Colors.white,

                            size: 40,
                          ),
                        ),

                        const SizedBox(width: 18),

                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,

                            children: [
                              Text(
                                "مدیریت وظایف ✨",

                                style: TextStyle(
                                  color: Colors.white,

                                  fontSize: 24,

                                  fontWeight: FontWeight.bold,
                                ),
                              ),

                              SizedBox(height: 8),

                              Text(
                                "برنامه‌ریزی کن، انجام بده و پیشرفت پروژه را ببین 🚀",

                                style: TextStyle(
                                  color: Colors.white70,

                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // Calendar Card
              Container(
                padding: const EdgeInsets.all(12),

                decoration: BoxDecoration(
                  color: Colors.white,

                  borderRadius: BorderRadius.circular(30),

                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(.05),

                      blurRadius: 20,

                      offset: const Offset(0, 8),
                    ),
                  ],
                ),

                child: const CalendarGrid(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
