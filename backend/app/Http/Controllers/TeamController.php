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

        $syncData = [];

        foreach ($validated['members'] ?? [] as $member) {
            $syncData[$member['member_id']] = [
                'responsibility_id' => $member['responsibility_id'],
            ];
        }

        // ذخیره تمام اعضا در جدول واسط
        if (!empty($syncData)) {
            $team->members()->sync($syncData);
        }

        // دوباره از دیتابیس اعضا و سرگروه را بخوان
        $team->load([
            'members',
            'leader',
        ]);

        return new TeamResource($team);
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

        $syncData = [];

        foreach ($validated['members'] ?? [] as $member) {
            $syncData[$member['member_id']] = [
                'responsibility_id' => $member['responsibility_id'],
            ];
        }

        // اعضای قبلی با اعضای جدید جایگزین می‌شوند
        $team->members()->sync($syncData);

        $team->load([
            'members',
            'leader',
        ]);

        return new TeamResource($team);
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
     * اطلاعات مورد نیاز فرم ایجاد / ویرایش تیم
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
