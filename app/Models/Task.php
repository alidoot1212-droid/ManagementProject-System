<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'work_block_id',
        'name',
        'weight',
        'value',
        'description',
        'priority_id',
        'status_id',
        'team_member_id',
        'assigned_at',
        'due_date',
        'completed_at',
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
        'due_date' => 'datetime',
        'completed_at' => 'datetime',
    ];


    public function workBlock()
    {
        return $this->belongsTo(WorkBlock::class);
    }


    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }


    public function status()
    {
        return $this->belongsTo(Status::class);
    }


    public function teamMember()
    {
        return $this->belongsTo(TeamMember::class);
    }


    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'task_tag');
    }
}
