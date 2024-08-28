<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function googleRedirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback(): RedirectResponse
    {
        $oauthUser = Socialite::driver('google')->user();

        $provider = 'google';
        $providerId = $oauthUser->getId();

        $userProvider = UserProvider::where('provider', $provider)
            ->where('provider_id', $providerId)
            ->first();

        if ($userProvider) {
            $user = $userProvider->user;
            Auth::login($user);

            return redirect()->intended(config('app.frontend_url'));
        }

        $user = User::where('email', $oauthUser->getEmail())->first();

        if (! $user) {
            $user = User::create([
                'name' => $oauthUser->getName(),
                'email' => $oauthUser->getEmail(),
            ]);
        }

        $user->userProviders()->create([
            'provider' => $provider,
            'provider_id' => $providerId,
        ]);

        Auth::login($user);

        return redirect()->intended(config('app.frontend_url'));
    }
}
