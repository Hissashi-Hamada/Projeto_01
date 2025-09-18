<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Meu Site')</title>
    <link rel="stylesheet" href="{{ asset('css/menu.css') }}">
    <title>Laravel com React + Vite</title>
<body>

    @include('partials.menu')

    <div class="content">
        @yield('content')
    </div>

</body>
</html>