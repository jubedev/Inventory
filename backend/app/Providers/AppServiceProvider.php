<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Inventario\Equipo;
use App\Observers\EquipoObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Equipo::observe(EquipoObserver::class);

        $this->loadMigrationsFrom([
            database_path('migrations'),
            database_path('migrations/Administracion'),
            database_path('migrations/Gestion'),
            database_path('migrations/Hardware'),
            database_path('migrations/Inventario'),
        ]);
    }
}
