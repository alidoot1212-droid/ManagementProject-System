import 'package:flutter/material.dart';
import 'package:project_management/pages/calendar_page.dart';
import '../widgets/app_drawer.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,

      child: Scaffold(
        drawer: const AppDrawer(),
        appBar: AppBar(
          title: const Text("TaskFlow"),

          leading: Builder(
            builder: (context) {
              return IconButton(
                onPressed: () {
                  Scaffold.of(context).openDrawer();
                },

                icon: const Icon(Icons.menu_rounded),
              );
            },
          ),

          actions: [
            IconButton(
              onPressed: () {},

              icon: const Icon(Icons.notifications_none_rounded),
            ),
          ],
        ),

        floatingActionButton: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(30),

            boxShadow: [
              BoxShadow(
                color: const Color(0xff8B5CF6).withOpacity(.35),
                blurRadius: 25,
                offset: const Offset(0, 12),
              ),
            ],
          ),

          child: FloatingActionButton.extended(
            elevation: 0,

            backgroundColor: const Color(0xff8B5CF6),

            onPressed: () {
              Navigator.push(
                context,

                MaterialPageRoute(builder: (_) => const CalendarPage()),
              );
            },

            icon: Container(
              padding: const EdgeInsets.all(7),

              decoration: BoxDecoration(
                color: Colors.white.withOpacity(.2),

                borderRadius: BorderRadius.circular(14),
              ),

              child: const Icon(
                Icons.calendar_month_rounded,

                color: Colors.white,

                size: 22,
              ),
            ),

            label: const Text(
              "تقویم من",

              style: TextStyle(
                color: Colors.white,

                fontSize: 15,

                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),

        body: SingleChildScrollView(
          padding: const EdgeInsets.all(20),

          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,

            children: [
              Container(
                width: double.infinity,

                padding: const EdgeInsets.all(25),

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

                  borderRadius: BorderRadius.circular(30),

                  boxShadow: [
                    BoxShadow(
                      color: Colors.purple.withOpacity(.15),

                      blurRadius: 20,

                      offset: const Offset(0, 8),
                    ),
                  ],
                ),

                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,

                  children: [
                    const Text(
                      "سلام هانیا 👋",

                      style: TextStyle(
                        color: Colors.white,

                        fontSize: 28,

                        fontWeight: FontWeight.bold,
                      ),
                    ),

                    const SizedBox(height: 10),

                    Text(
                      "امروز چند تا کار مهم برای انجام داری ✨",

                      style: TextStyle(
                        color: Colors.white.withOpacity(.9),

                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 25),

              Row(
                children: [
                  statCard(
                    "5",
                    "کل وظایف",
                    Icons.assignment_rounded,
                    const Color(0xffEDE9FE),
                  ),

                  const SizedBox(width: 10),

                  statCard(
                    "3",
                    "انجام شده",
                    Icons.check_circle_rounded,
                    const Color(0xffD1FAE5),
                  ),

                  const SizedBox(width: 10),

                  statCard(
                    "2",
                    "در انتظار",
                    Icons.schedule_rounded,
                    const Color(0xffFCE7F3),
                  ),
                ],
              ),
              const SizedBox(height: 35),

              sectionTitle("پروژه‌های فعال"),

              const SizedBox(height: 15),

              projectCard("طراحی اپ مدیریت پروژه", .75),

              projectCard("ساخت اپ کتابخانه", .45),

              const SizedBox(height: 35),

              sectionTitle("وظایف امروز"),

              taskCard("طراحی صفحه تقویم", Colors.purple),

              taskCard("اتصال مدل Task", Colors.orange),

              taskCard("تست رابط کاربری", Colors.green),
            ],
          ),
        ),
      ),
    );
  }

  Widget sectionTitle(String title) {
    return Text(
      title,

      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
    );
  }

  Widget statCard(String number, String title, IconData icon, Color bg) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),

        decoration: BoxDecoration(
          color: bg,

          borderRadius: BorderRadius.circular(22),
        ),

        child: Column(
          children: [
            Icon(icon, color: const Color(0xff8B5CF6)),

            const SizedBox(height: 8),

            Text(
              number,

              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),

            Text(
              title,

              textAlign: TextAlign.center,

              style: const TextStyle(fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }

  Widget projectCard(String title, double progress) {
    return Container(
      margin: const EdgeInsets.only(bottom: 15),

      padding: const EdgeInsets.all(18),

      decoration: BoxDecoration(
        color: Colors.white,

        borderRadius: BorderRadius.circular(22),

        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(.04), blurRadius: 15),
        ],
      ),

      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,

        children: [
          Text(
            title,

            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),

          const SizedBox(height: 15),

          LinearProgressIndicator(
            value: progress,

            minHeight: 8,

            color: const Color(0xff8B5CF6),

            backgroundColor: const Color(0xffEDE9FE),

            borderRadius: BorderRadius.circular(20),
          ),
        ],
      ),
    );
  }

  Widget taskCard(String title, Color color) {
    return Container(
      margin: const EdgeInsets.only(top: 12),

      padding: const EdgeInsets.all(15),

      decoration: BoxDecoration(
        color: Colors.white,

        borderRadius: BorderRadius.circular(18),

        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(.03), blurRadius: 10),
        ],
      ),

      child: Row(
        children: [
          Container(
            height: 14,

            width: 14,

            decoration: BoxDecoration(
              color: color,

              shape: BoxShape.circle,

              boxShadow: [
                BoxShadow(color: color.withOpacity(.4), blurRadius: 8),
              ],
            ),
          ),

          const SizedBox(width: 12),

          Text(title, style: const TextStyle(fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}
