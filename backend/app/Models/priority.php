<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Task;

class priority extends Model
{
    protected $fillable = [
        'name',
    ];


    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
