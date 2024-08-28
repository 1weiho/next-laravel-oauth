<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    protected $allowedProviders = ['google', 'github'];

    public function redirect(string $provider): RedirectResponse|JsonResponse
    {
        if (! in_array($provider, $this->allowedProviders)) {
            return response()->json(['error' => 'Provider not supported.'], 400);
        }

        return Socialite::driver($provider)->redirect();
    }

    public function callback(string $provider): RedirectResponse|JsonResponse
    {
        if (! in_array($provider, $this->allowedProviders)) {
            return response()->json(['error' => 'Provider not supported.'], 400);
        }

        $oauthUser = Socialite::driver($provider)->user();

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
