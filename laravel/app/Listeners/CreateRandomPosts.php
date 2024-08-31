<?php

namespace App\Listeners;

use App\Models\Post;
use Illuminate\Auth\Events\Registered;

class CreateRandomPosts
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        Post::factory(10)->create([
            'user_id' => $event->user->id,
        ]);
    }
}
