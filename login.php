<?php
session_start();

// Jika sudah login, redirect ke dashboard
if (isset($_SESSION['username'])) {
    header('Location: dashboard.php');
    exit;
}

// Proses login jika form disubmit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Autentikasi sederhana (gantilah dengan sistem yang lebih aman di produksi)
    if ($username === 'admin' && $password === 'password') {
        $_SESSION['username'] = $username;
        header('Location: dashboard.php');
        exit;
    } else {
        header('Location: login.php?status=gagal');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login - AyoBasket</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-body">
    <header class="border-bottom bg-white">
        <div class="container py-3">
            <a href="index.php" class="navbar-brand fw-bold text-primary fs-4 m-0">AyoBasket</a>
        </div>
    </header>

    <main class="d-flex align-items-center py-5" style="min-height: 80vh;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-4">
                    <div class="card shadow-sm">
                        <div class="card-body p-4">
                            <h1 class="h3 mb-3 fw-bold text-center">User Login</h1>
                            
                            <?php if (isset($_GET['status']) && $_GET['status'] === 'gagal'): ?>
                                <div class="alert alert-danger" role="alert">
                                    Username atau password salah.
                                </div>
                            <?php endif; ?>

                            <form action="login.php" method="POST">
                                <div class="mb-3">
                                    <label for="username" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="username" name="username" required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" name="password" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="bg-dark text-light py-4">
        <div class="container text-center">
            <p class="mb-0 small">&copy; <span id="year"></span> AyoBasket</p>
        </div>
    </footer>
    <script>
        document.getElementById('year').textContent = new Date().getFullYear();
    </script>
</body>
</html>