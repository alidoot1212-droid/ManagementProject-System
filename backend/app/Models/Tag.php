<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'color_code',
    ];


    public function tasks()
    {
        return $this->belongsToMany(Tag::class);
    }
}
