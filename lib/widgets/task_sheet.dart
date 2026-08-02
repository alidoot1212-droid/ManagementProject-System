import 'package:flutter/material.dart';
import 'package:project_management/model/task_model.dart';
import 'package:shamsi_date/shamsi_date.dart';

class TaskBottomSheet extends StatefulWidget {
  final Jalali date;
  final List<TaskModel> tasks;

  const TaskBottomSheet({super.key, required this.date, required this.tasks});

  @override
  State<TaskBottomSheet> createState() => _TaskBottomSheetState();
}

class _TaskBottomSheetState extends State<TaskBottomSheet> {
  late List<TaskModel> selectedTasks;

  @override
  void initState() {
    super.initState();

    selectedTasks = widget.tasks.where((task) {
      final taskDate = Jalali.fromDateTime(task.startDate);

      return taskDate.year == widget.date.year &&
          taskDate.month == widget.date.month &&
          taskDate.day == widget.date.day;
    }).toList();
  }

  void toggleTask(int index) {
    setState(() {
      selectedTasks[index] = selectedTasks[index].copyWith(
        isDone: !selectedTasks[index].isDone,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final now = TimeOfDay.now();

    return Directionality(
      textDirection: TextDirection.rtl,

      child: Container(
        height: MediaQuery.of(context).size.height * .75,

        padding: const EdgeInsets.fromLTRB(20, 15, 20, 25),

        decoration: const BoxDecoration(
          color: Color(0xffF8F7FF),

          borderRadius: BorderRadius.vertical(top: Radius.circular(40)),
        ),

        child: Column(
          children: [
            // handle
            Container(
              width: 50,

              height: 5,

              decoration: BoxDecoration(
                color: Colors.grey.shade300,

                borderRadius: BorderRadius.circular(20),
              ),
            ),

            const SizedBox(height: 20),

            // header
            Container(
              width: double.infinity,

              padding: const EdgeInsets.all(22),

              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xff6D28D9), Color(0xffC084FC)],

                  begin: Alignment.topRight,

                  end: Alignment.bottomLeft,
                ),

                borderRadius: BorderRadius.circular(30),

                boxShadow: [
                  BoxShadow(
                    color: const Color(0xff8B5CF6).withOpacity(.35),

                    blurRadius: 20,

                    offset: const Offset(0, 8),
                  ),
                ],
              ),

              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,

                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,

                    children: [
                      Text(
                        "${widget.date.day} ${monthName(widget.date.month)}",

                        style: const TextStyle(
                          color: Colors.white,

                          fontSize: 26,

                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      const SizedBox(height: 8),

                      Text(
                        "${widget.date.year}",

                        style: TextStyle(
                          color: Colors.white.withOpacity(.8),

                          fontSize: 15,
                        ),
                      ),

                      const SizedBox(height: 12),

                      Row(
                        children: [
                          const Icon(
                            Icons.access_time_rounded,
                            color: Colors.white,
                            size: 18,
                          ),

                          const SizedBox(width: 6),

                          Text(
                            "${now.hour}:${now.minute.toString().padLeft(2, '0')}",

                            style: TextStyle(
                              color: Colors.white.withOpacity(.9),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),

                  Container(
                    width: 70,

                    height: 70,

                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(.2),

                      shape: BoxShape.circle,
                    ),

                    child: const Icon(
                      Icons.calendar_month_rounded,

                      color: Colors.white,

                      size: 38,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            Align(
              alignment: Alignment.centerRight,

              child: Text(
                "${selectedTasks.length} وظیفه امروز",

                style: const TextStyle(
                  fontSize: 18,

                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            const SizedBox(height: 15),

            Expanded(
              child: selectedTasks.isEmpty
                  ? Center(
                      child: Container(
                        padding: const EdgeInsets.all(30),

                        decoration: BoxDecoration(
                          color: Colors.white,

                          borderRadius: BorderRadius.circular(30),
                        ),

                        child: const Text(
                          "برای این روز کاری وجود ندارد 🎉",
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                      ),
                    )
                  : ListView.builder(
                      itemCount: selectedTasks.length,

                      itemBuilder: (context, index) {
                        final task = selectedTasks[index];

                        return GestureDetector(
                          onTap: () {
                            toggleTask(index);
                          },

                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 250),

                            margin: const EdgeInsets.only(bottom: 14),

                            padding: const EdgeInsets.all(18),

                            decoration: BoxDecoration(
                              color: task.isDone
                                  ? const Color(0xffDCFCE7)
                                  : Colors.white,

                              borderRadius: BorderRadius.circular(25),

                              border: Border.all(
                                color: task.isDone
                                    ? Colors.green.withOpacity(.4)
                                    : const Color(0xffEDE9FE),
                              ),

                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(.05),
                                  blurRadius: 15,
                                  offset: const Offset(0, 5),
                                ),
                              ],
                            ),

                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,

                              children: [
                                Row(
                                  children: [
                                    Container(
                                      width: 45,
                                      height: 45,

                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,

                                        color: task.isDone
                                            ? Colors.green
                                            : const Color(0xffEDE9FE),
                                      ),

                                      child: Icon(
                                        task.isDone
                                            ? Icons.check_rounded
                                            : Icons.circle_outlined,

                                        color: task.isDone
                                            ? Colors.white
                                            : const Color(0xff8B5CF6),
                                      ),
                                    ),

                                    const SizedBox(width: 14),

                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,

                                        children: [
                                          Text(
                                            task.name,

                                            style: TextStyle(
                                              fontSize: 16,

                                              fontWeight: FontWeight.bold,

                                              decoration: task.isDone
                                                  ? TextDecoration.lineThrough
                                                  : null,
                                            ),
                                          ),

                                          const SizedBox(height: 5),

                                          Text(
                                            task.assignment,

                                            style: TextStyle(
                                              color: Colors.grey.shade600,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),

                                    Icon(
                                      task.isDone
                                          ? Icons.done_all
                                          : Icons.pending_actions,

                                      color: task.isDone
                                          ? Colors.green
                                          : Colors.orange,
                                    ),
                                  ],
                                ),

                                const SizedBox(height: 15),

                                Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 12,
                                    vertical: 10,
                                  ),

                                  decoration: BoxDecoration(
                                    color: const Color(0xffF8F7FF),

                                    borderRadius: BorderRadius.circular(15),
                                  ),

                                  child: Row(
                                    children: [
                                      const Icon(
                                        Icons.calendar_today_rounded,

                                        size: 18,

                                        color: Color(0xff8B5CF6),
                                      ),

                                      const SizedBox(width: 8),

                                      Text(
                                        "${task.startDate.year}/${task.startDate.month}/${task.startDate.day}",

                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 13,
                                        ),
                                      ),

                                      const Spacer(),

                                      const Icon(
                                        Icons.access_time_rounded,

                                        size: 18,

                                        color: Color(0xff8B5CF6),
                                      ),

                                      const SizedBox(width: 6),

                                      Text(
                                        "${task.startDate.hour}:${task.startDate.minute.toString().padLeft(2, '0')}",

                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 13,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),

            const SizedBox(height: 15),

            SizedBox(
              width: double.infinity,

              height: 55,

              child: ElevatedButton.icon(
                onPressed: () {},

                icon: const Icon(Icons.add, color: Colors.white),

                label: const Text(
                  "افزودن وظیفه جدید",

                  style: TextStyle(
                    color: Colors.white,

                    fontWeight: FontWeight.bold,

                    fontSize: 16,
                  ),
                ),

                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xff8B5CF6),

                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(22),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String monthName(int month) {
    const months = [
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

    return months[month - 1];
  }
}
