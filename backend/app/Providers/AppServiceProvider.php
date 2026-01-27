<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Inventario\Equipo;
use App\Models\Inventario\ActivoAsignado;
use App\Observers\EquipoObserver;
use App\Observers\ActivoAsignadoObserver;

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
        ActivoAsignado::observe(ActivoAsignadoObserver::class);

        $this->loadMigrationsFrom([
            database_path('migrations'),
            database_path('migrations/Administracion'),
            database_path('migrations/Gestion'),
            database_path('migrations/Hardware'),
            database_path('migrations/Inventario'),
        ]);
    }
}
