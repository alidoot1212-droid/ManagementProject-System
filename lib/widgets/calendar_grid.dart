import 'package:flutter/material.dart';
import 'package:project_management/model/task_model.dart';
import 'package:project_management/widgets/task_sheet.dart';
import 'package:shamsi_date/shamsi_date.dart';

class CalendarGrid extends StatefulWidget {
  final List<TaskModel> tasks;

  final Function(TaskModel) onTaskUpdated;

  const CalendarGrid({
    super.key,
    required this.tasks,
    required this.onTaskUpdated,
  });
  @override
  State<CalendarGrid> createState() => _CalendarGridState();
}

class _CalendarGridState extends State<CalendarGrid> {
  Jalali currentMonth = Jalali.now();

  int? selectedDay;

  final List<String> monthNames = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  final List<String> weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  final List<Color> weekColors = [
    const Color(0xff8B5CF6),
    const Color(0xffEC4899),
    const Color(0xff3B82F6),
    const Color(0xff10B981),
    const Color(0xffF97316),
    const Color(0xff06B6D4),
    const Color(0xffEF4444),
  ];

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,

      child: Container(
        padding: const EdgeInsets.all(15),

        decoration: BoxDecoration(
          color: const Color(0xffFAF9FF),

          borderRadius: BorderRadius.circular(30),

          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(.04), blurRadius: 20),
          ],
        ),

        child: Column(
          children: [
            buildHeader(),

            const SizedBox(height: 20),

            buildWeekDays(),

            const SizedBox(height: 15),

            buildDays(),
          ],
        ),
      ),
    );
  }

  Widget buildHeader() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 14),

      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xff7C3AED), Color(0xffC084FC)],

          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
        ),

        borderRadius: BorderRadius.circular(28),

        boxShadow: [
          BoxShadow(
            color: const Color(0xff8B5CF6).withOpacity(.25),

            blurRadius: 18,

            offset: const Offset(0, 6),
          ),
        ],
      ),

      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,

        children: [
          monthButton(Icons.chevron_left, () {
            setState(() {
              currentMonth = currentMonth.addMonths(-1);
            });
          }),

          Column(
            children: [
              Text(
                monthNames[currentMonth.month - 1],

                style: const TextStyle(
                  color: Colors.white,

                  fontSize: 23,

                  fontWeight: FontWeight.bold,
                ),
              ),

              Text(
                currentMonth.year.toString(),

                style: TextStyle(color: Colors.white.withOpacity(.8)),
              ),
            ],
          ),

          monthButton(Icons.chevron_right, () {
            setState(() {
              currentMonth = currentMonth.addMonths(1);
            });
          }),
        ],
      ),
    );
  }

  Widget monthButton(IconData icon, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,

      child: Container(
        width: 45,

        height: 45,

        decoration: BoxDecoration(
          color: Colors.white.withOpacity(.25),

          shape: BoxShape.circle,
        ),

        child: Icon(icon, color: Colors.white),
      ),
    );
  }

  Widget buildWeekDays() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,

      children: List.generate(weekDays.length, (index) {
        return Container(
          width: 42,

          height: 38,

          alignment: Alignment.center,

          decoration: BoxDecoration(
            color: weekColors[index].withOpacity(.12),

            borderRadius: BorderRadius.circular(14),
          ),

          child: Text(
            weekDays[index],

            style: TextStyle(
              color: weekColors[index],

              fontSize: 15,

              fontWeight: FontWeight.bold,
            ),
          ),
        );
      }),
    );
  }

  Widget buildDays() {
    final today = Jalali.now();

    final firstDay = Jalali(currentMonth.year, currentMonth.month, 1);

    final start = firstDay.weekDay;

    final days = currentMonth.monthLength;

    List<Widget> items = [];

    // خانه های خالی اول ماه
    for (int i = 1; i < start; i++) {
      items.add(const SizedBox());
    }

    for (int day = 1; day <= days; day++) {
      final isToday =
          today.year == currentMonth.year &&
          today.month == currentMonth.month &&
          today.day == day;

      final hasTask = widget.tasks.any((task) {
        final taskDate = parseJalaliDate(task.dueDate);

        return taskDate.year == currentMonth.year &&
            taskDate.month == currentMonth.month &&
            taskDate.day == day;
      });

      final isSelected = selectedDay == day;

      items.add(
        GestureDetector(
          onTap: () {
            setState(() {
              selectedDay = day;
            });

            final selectedDate = Jalali(
              currentMonth.year,

              currentMonth.month,

              day,
            );

            final selectedTasks = widget.tasks.where((task) {
              final date = parseJalaliDate(task.dueDate);

              return date.year == selectedDate.year &&
                  date.month == selectedDate.month &&
                  date.day == selectedDate.day;
            }).toList();

            showModalBottomSheet(
              context: context,

              isScrollControlled: true,

              backgroundColor: Colors.transparent,

              builder: (context) {
                return TaskBottomSheet(
                  date: selectedDate,

                  tasks: selectedTasks,

                  onTaskUpdated: widget.onTaskUpdated,
                );
              },
            );
          },

          child: AnimatedContainer(
            duration: const Duration(milliseconds: 250),

            margin: const EdgeInsets.all(5),

            decoration: BoxDecoration(
              color: isSelected
                  ? const Color(0xffEDE9FE)
                  : hasTask
                  ? const Color(0xffFAF5FF)
                  : Colors.white,

              borderRadius: BorderRadius.circular(22),

              border: Border.all(
                color: isSelected
                    ? const Color(0xff8B5CF6)
                    : const Color(0xffEEE7FF),
              ),

              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(.04),

                  blurRadius: 10,

                  offset: const Offset(0, 4),
                ),
              ],
            ),

            child: Stack(
              alignment: Alignment.center,

              children: [
                Container(
                  width: isToday ? 42 : null,

                  height: isToday ? 42 : null,

                  alignment: Alignment.center,

                  decoration: BoxDecoration(
                    color: isToday
                        ? const Color(0xff8B5CF6)
                        : Colors.transparent,

                    shape: BoxShape.circle,

                    boxShadow: isToday
                        ? [
                            BoxShadow(
                              color: const Color(0xff8B5CF6).withOpacity(.35),

                              blurRadius: 15,

                              offset: const Offset(0, 5),
                            ),
                          ]
                        : [],
                  ),

                  child: Text(
                    day.toString(),

                    style: TextStyle(
                      fontSize: 16,

                      fontWeight: FontWeight.bold,

                      color: isToday ? Colors.white : const Color(0xff374151),
                    ),
                  ),
                ),

                if (hasTask)
                  Positioned(
                    bottom: 8,

                    child: Container(
                      width: 8,

                      height: 8,

                      decoration: BoxDecoration(
                        shape: BoxShape.circle,

                        color: getTaskDotColor(day),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      );
    }

    return GridView.count(
      shrinkWrap: true,

      physics: const NeverScrollableScrollPhysics(),

      crossAxisCount: 7,

      childAspectRatio: .85,

      children: items,
    );
  }

  Jalali parseJalaliDate(String date) {
    final datePart = date.split(" ")[0];

    final parts = datePart.split("/");

    return Jalali(
      int.parse(parts[0]),
      int.parse(parts[1]),
      int.parse(parts[2]),
    );
  }

  Color getTaskDotColor(int day) {
    final dayTasks = widget.tasks.where((task) {
      final taskDate = parseJalaliDate(task.dueDate);

      return taskDate.year == currentMonth.year &&
          taskDate.month == currentMonth.month &&
          taskDate.day == day;
    }).toList();

    if (dayTasks.isEmpty) {
      return Colors.transparent;
    }

    final allDone = dayTasks.every((task) => task.status.id == 4);

    if (allDone) {
      return Colors.green;
    }

    return const Color(0xff8B5CF6);
  }
}
