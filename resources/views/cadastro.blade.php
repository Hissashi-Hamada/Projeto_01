<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cadastro — Avaliador de Senha</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- CSS do projeto -->
    <link rel="stylesheet" href="{{ asset('css/cadastro.css') }}">
</head>
<body>

<div class="card card-register">
    <div class="card-header">
        <h5 class="mb-0">Criar conta</h5>
        <small>Preencha os campos para se cadastrar</small>
    </div>

    <div class="card-body">
        <div id="alertArea" class="alert-area mb-3" aria-live="polite"></div>

        <form id="registerForm" action="{{ route('usuarios.store') }}" method="POST" novalidate>
            @csrf

            <div class="mb-3">
                <label for="inputName" class="form-label">Nome completo</label>
                <input type="text" name="nome" class="form-control" id="inputName" required minlength="3" placeholder="Seu nome" />
                <div class="invalid-feedback">Informe seu nome (mínimo 3 caracteres).</div>
            </div>

            <div class="mb-3">
                <label for="inputTelefone" class="form-label">Telefone</label>
                <input type="text" name="telefone" class="form-control" id="inputTelefone" required placeholder="(XX) XXXXX-XXXX" />
                <div class="invalid-feedback">Informe um telefone válido.</div>
            </div>

            <div class="mb-3">
                <label for="inputCPF" class="form-label">CPF</label>
                <input type="text" name="cpf" class="form-control" id="inputCPF" required placeholder="XXX.XXX.XXX-XX" />
                <div class="invalid-feedback">Informe um CPF válido.</div>
            </div>

            <div class="mb-3">
                <label for="inputNascimento" class="form-label">Data de nascimento</label>
                <input type="text" name="data_nascimento" class="form-control" id="inputNascimento" required placeholder="DD/MM/AAAA" />
                <div class="invalid-feedback">Informe a data de nascimento.</div>
            </div>

            <div class="mb-3">
                <label for="inputEmail" class="form-label">E-mail</label>
                <input type="email" name="email" class="form-control" id="inputEmail" required placeholder="seu@exemplo.com" />
                <div class="invalid-feedback">Informe um e-mail válido.</div>
            </div>

            <div class="mb-3">
                <label for="inputPassword" class="form-label">Senha</label>
                <div class="input-group">
                    <input type="password" name="password" class="form-control" id="inputPassword" required minlength="6" placeholder="Senha" />
                    <button class="btn btn-outline-secondary password-toggle" type="button" id="togglePassword">Mostrar</button>
                    <div class="invalid-feedback">Senha mínima de 6 caracteres.</div>
                </div>

                <div class="mt-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <small id="strengthLabel" class="fw-semibold">Força da senha: —</small>
                        <small id="strengthScore" class="text-muted">0/4</small>
                    </div>
                    <div class="strength-bar mb-2" aria-hidden="true">
                        <div id="strengthFill" class="strength-fill"></div>
                    </div>
                    <div id="suggestions" class="suggestions" aria-live="polite"></div>
                </div>
            </div>

            <div class="mb-3">
                <label for="inputConfirmPassword" class="form-label">Confirmar senha</label>
                <input type="password" name="password_confirmation" class="form-control" id="inputConfirmPassword" required placeholder="Repita a senha" />
                <div class="invalid-feedback">As senhas precisam coincidir.</div>
            </div>

            <button type="submit" class="btn btn-Primary" id="submitBtn">Cadastrar</button>
        </form>

        <div class="mt-3 text-center small">
            Já tem conta? <a href="login.html">Entrar</a>
        </div>
    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- JS do projeto -->
<script src="{{ asset('js/cadastro.js') }}"></script>
</body>
</html>
