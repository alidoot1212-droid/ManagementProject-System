import 'package:flutter/material.dart';
import '../pages/calendar_page.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: const Color(0xffF6F3FF),

      child: Directionality(
        textDirection: TextDirection.rtl,

        child: Column(
          children: [
            // Top Header
            Container(
              height: 270,

              width: double.infinity,

              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xffA855F7), Color(0xff6D28D9)],

                  begin: Alignment.topRight,

                  end: Alignment.bottomLeft,
                ),

                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(45),

                  bottomRight: Radius.circular(45),
                ),
              ),

              child: Stack(
                alignment: Alignment.center,

                children: [
                  Positioned(
                    top: -40,

                    left: -30,

                    child: Container(
                      width: 150,

                      height: 150,

                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(.08),

                        shape: BoxShape.circle,
                      ),
                    ),
                  ),

                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,

                    children: [
                      Container(
                        height: 95,

                        width: 95,

                        decoration: BoxDecoration(
                          color: Colors.white,

                          shape: BoxShape.circle,

                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(.15),

                              blurRadius: 20,

                              offset: const Offset(0, 10),
                            ),
                          ],
                        ),

                        child: const Icon(
                          Icons.task_alt_rounded,

                          size: 55,

                          color: Color(0xff8B5CF6),
                        ),
                      ),

                      const SizedBox(height: 18),

                      const Text(
                        "TaskFlow",

                        style: TextStyle(
                          color: Colors.white,

                          fontSize: 34,

                          fontWeight: FontWeight.w800,
                        ),
                      ),

                      const SizedBox(height: 8),

                      Text(
                        "برنامه‌ریزی، تمرکز، موفقیت ✨",

                        style: TextStyle(
                          color: Colors.white.withOpacity(.9),

                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 25),

            drawerItem(icon: Icons.home_rounded, title: "خانه", onTap: () {}),

            drawerItem(
              icon: Icons.calendar_month_rounded,

              title: "تقویم وظایف",

              active: true,

              onTap: () {
                Navigator.pop(context);

                Navigator.push(
                  context,

                  MaterialPageRoute(builder: (_) => const CalendarPage()),
                );
              },
            ),

            drawerItem(
              icon: Icons.check_circle_outline_rounded,

              title: "وظایف من",

              onTap: () {},
            ),

            drawerItem(
              icon: Icons.star_rounded,

              title: "مورد علاقه‌ها",

              onTap: () {},
            ),

            drawerItem(
              icon: Icons.settings_rounded,

              title: "تنظیمات",

              onTap: () {},
            ),

            const Spacer(),

            Container(
              margin: const EdgeInsets.all(18),

              padding: const EdgeInsets.all(18),

              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xffEDE9FE), Color(0xffFAE8FF)],
                ),

                borderRadius: BorderRadius.circular(25),
              ),

              child: Row(
                children: [
                  Container(
                    height: 45,

                    width: 45,

                    decoration: BoxDecoration(
                      color: Colors.white,

                      borderRadius: BorderRadius.circular(15),
                    ),

                    child: const Icon(
                      Icons.lightbulb_outline_rounded,

                      color: Color(0xff8B5CF6),
                    ),
                  ),

                  const SizedBox(width: 12),

                  const Expanded(
                    child: Text(
                      "امروز یک قدم کوچک بردار ✨",

                      style: TextStyle(
                        fontWeight: FontWeight.bold,

                        fontSize: 13,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget drawerItem({
    required IconData icon,

    required String title,

    required VoidCallback onTap,

    bool active = false,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 5),

      child: InkWell(
        onTap: onTap,

        borderRadius: BorderRadius.circular(22),

        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),

          decoration: BoxDecoration(
            color: active ? const Color(0xff8B5CF6) : Colors.white,

            borderRadius: BorderRadius.circular(22),

            boxShadow: active
                ? [
                    BoxShadow(
                      color: const Color(0xff8B5CF6).withOpacity(.25),

                      blurRadius: 15,

                      offset: const Offset(0, 8),
                    ),
                  ]
                : [
                    BoxShadow(
                      color: Colors.black.withOpacity(.03),

                      blurRadius: 8,
                    ),
                  ],
          ),

          child: Row(
            children: [
              Container(
                height: 44,

                width: 44,

                decoration: BoxDecoration(
                  color: active
                      ? Colors.white.withOpacity(.2)
                      : const Color(0xffF3E8FF),

                  borderRadius: BorderRadius.circular(15),
                ),

                child: Icon(
                  icon,

                  color: active ? Colors.white : const Color(0xff8B5CF6),
                ),
              ),

              const SizedBox(width: 15),

              Text(
                title,

                style: TextStyle(
                  fontSize: 16,

                  fontWeight: FontWeight.bold,

                  color: active ? Colors.white : const Color(0xff333333),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
