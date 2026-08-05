<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\WorkBlock;
use App\Models\Task;

class Status extends Model
{
    protected $fillable = [
        'name',
    ];


    public function workBlocks()
    {
        return $this->hasMany(WorkBlock::class);
    }


    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
