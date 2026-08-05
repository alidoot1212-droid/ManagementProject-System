<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeamRequest;
use App\Http\Resources\TeamResource;
use App\Models\Team;
use App\Models\TeamMember;

class TeamController extends Controller
{
    /**
     * نمایش لیست تیم‌ها
     */
    public function index()
    {
        $teams = Team::with([
            'members',
            'leader',
        ])
            ->latest()
            ->get();

        return TeamResource::collection($teams);
    }

    /**
     * ایجاد تیم
     */
    public function store(TeamRequest $request)
    {
        $validated = $request->validated();

        $team = Team::create([
            'name' => $validated['name'],
            'leader_id' => $validated['leader_id'] ?? null,
        ]);

        // member_ids از فرانت به صورت آرایه می‌آید
        $memberIds = $validated['member_ids'] ?? [];

        // اگر سرگروه انتخاب شده، حتماً عضو تیم هم باشد
        if (!empty($validated['leader_id'])) {
            $memberIds[] = $validated['leader_id'];
        }

        // حذف IDهای تکراری و ثبت تمام اعضا
        $team->members()->sync(
            array_values(array_unique($memberIds))
        );

        return new TeamResource(
            $team->load([
                'members',
                'leader',
            ])
        );
    }

    /**
     * نمایش یک تیم
     */
    public function show(Team $team)
    {
        $team->load([
            'members',
            'leader',
        ]);

        return new TeamResource($team);
    }

    /**
     * ویرایش تیم
     */
    public function update(TeamRequest $request, Team $team)
    {
        $validated = $request->validated();

        $team->update([
            'name' => $validated['name'],
            'leader_id' => $validated['leader_id'] ?? null,
        ]);

        // member_ids آرایه‌ای است
        $memberIds = $validated['member_ids'] ?? [];

        // سرگروه هم باید عضو تیم باشد
        if (!empty($validated['leader_id'])) {
            $memberIds[] = $validated['leader_id'];
        }

        // اعضای قبلی را با لیست جدید جایگزین می‌کند
        $team->members()->sync(
            array_values(array_unique($memberIds))
        );

        return new TeamResource(
            $team->load([
                'members',
                'leader',
            ])
        );
    }

    /**
     * حذف تیم
     */
    public function destroy(Team $team)
    {
        $team->members()->detach();

        $team->delete();

        return response()->json([
            'success' => true,
            'message' => 'تیم با موفقیت حذف شد.',
        ]);
    }

    /**
     * اطلاعات مورد نیاز فرم ایجاد / ویرایش
     */
    public function upsertData()
    {
        $members = TeamMember::query()
            ->select([
                'id',
                'name',
            ])
            ->orderBy('name')
            ->get();

        $responsibilities = TeamMember::query()
            ->whereNotNull('responsibility')
            ->where('responsibility', '!=', '')
            ->select('responsibility')
            ->distinct()
            ->orderBy('responsibility')
            ->get()
            ->values()
            ->map(function ($item, $index) {
                return [
                    'id' => $index + 1,
                    'name' => $item->responsibility,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'members' => $members,
                'responsibilities' => $responsibilities,
            ],
        ]);
    }
}
