<?php

namespace App\Http\Controllers\Meeting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Meeting\MeetingRequest;
use App\Models\Team\Team;
use App\Models\Meeting\Meeting;
use App\Services\SkyroomService;
use Illuminate\Support\Facades\DB;

class MeetingController extends Controller
{
    protected SkyroomService $skyroom;


    public function __construct(SkyroomService $skyroom)
    {
        $this->skyroom = $skyroom;
    }


    /**
     * ایجاد جلسه و Room در Skyroom
     */
    public function createRoom(MeetingRequest $request)
    {
        $validated = $request->validated();


        DB::beginTransaction();


        try {


            // پیدا کردن تیم
            $team = Team::where(
                'name',
                $validated['team_name']
            )->firstOrFail();



            // ساخت Room در Skyroom
            $response = $this->skyroom
                ->createRoom($validated);



            if (!isset($response['result'])) {

                throw new \Exception(
                    'Room was not created.'
                );

            }



            // ذخیره room_id در تیم

            $team->update([

                'room_id' => $response['result']

            ]);



            // لینک سرتیم

            $leaderLink =
                $this->skyroom
                ->getLeaderLoginUrl($team);



            // لینک اعضای تیم

            $memberLink =
                $this->skyroom
                ->getMemberLoginUrl($team);




            // ذخیره اطلاعات جلسه

            $meeting = Meeting::create([

                'team_id' => $team->id,

                'room_id' => $team->room_id,

                'title' => $validated['title'],

                'description' =>
                    $validated['description'] ?? null,

                'start_time' =>
                    $validated['start_time'],

                'end_time' =>
                    $validated['end_time'],

                'leader_link' =>
                    json_encode($leaderLink),

                'member_link' =>
                    json_encode($memberLink),

            ]);



            DB::commit();



            return response()->json([

                'status' => 'success',

                'message' =>
                    'Meeting created successfully.',


                'data' => [

                    'meeting_id' =>
                        $meeting->id,

                    'room_id' =>
                        $team->room_id,


                    'leader_link' =>
                        $leaderLink,


                    'member_link' =>
                        $memberLink,

                ]

            ],201);



        } catch (\Throwable $e) {


            DB::rollBack();


            return response()->json([

                'status' => 'error',

                'message' =>
                    $e->getMessage(),

            ],500);

        }

    }




    /**
     * حذف جلسه و Room
     */
    public function deleteRoom(Team $team)
    {

        DB::beginTransaction();


        try {


            if ($team->room_id) {

                $this->skyroom
                    ->deleteRoom($team->room_id);

            }



            $team->update([

                'room_id'=>null

            ]);



            DB::commit();



            return response()->json([

                'status'=>'success',

                'message'=>
                    'Room deleted successfully.',

            ]);



        } catch (\Throwable $e) {


            DB::rollBack();


            return response()->json([

                'status'=>'error',

                'message'=>
                    $e->getMessage(),

            ],500);

        }

    }
}