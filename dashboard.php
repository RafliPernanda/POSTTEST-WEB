<?php
session_start();

// Jika belum login, redirect ke halaman login
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard - AyoBasket</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-body">
    <header class="border-bottom bg-white">
        <div class="container d-flex justify-content-between align-items-center py-3">
            <a href="index.php" class="navbar-brand fw-bold text-primary fs-4 m-0">AyoBasket</a>
            <nav>
                <ul class="nav nav-pills">
                    <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="logout.php">Logout</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="container py-5">
        <section>
            <h1 class="display-6 fw-bold">Selamat Datang, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
            <p class="lead">Ini adalah halaman dashboard Anda. Dari sini Anda dapat mengelola reservasi dan melihat jadwal lapangan.</p>
            <a href="index.php#lapangan" class="btn btn-primary">Lihat Lapangan</a>
        </section>
    </main>
    
    <footer class="bg-dark text-light py-4 mt-auto fixed-bottom">
        <div class="container text-center">
            <p class="mb-0 small">&copy; <span id="year"></span> AyoBasket</p>
        </div>
    </footer>

    <script>
        document.getElementById('year').textContent = new Date().getFullYear();
    </script>
</body>
</html>