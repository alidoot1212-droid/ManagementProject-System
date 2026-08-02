<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkBlock extends Model
{
    protected $fillable = [
        'team_id',
        'name',
        'start_date',
        'end_date',
        'status_id',
        'description',
    ];
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];


    public function team()
    {
        return $this->belongsTo(Team::class);
    }


    public function status()
    {
        return $this->belongsTo(Status::class);
    }


    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function statuses()
    {
        return $this->belongsTo(Status::class);
    }
}
