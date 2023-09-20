const net = require('net');

// Konfigurasi server Stratum
const HOST = '127.0.0.1';
const PORT = 3333;

// Inisialisasi server
const server = net.createServer((socket) => {
  console.log(`Terhubung dengan penambang ${socket.remoteAddress}:${socket.remotePort}`);

  // Kirim pesan selamat datang
  const welcomeMessage = {
    id: null,
    method: 'mining.set_difficulty',
    params: [4.0], // Tingkat kesulitan
  };
  socket.write(JSON.stringify(welcomeMessage) + '\n');

  // Event listener untuk data yang diterima dari penambang
  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`Pesan dari penambang: ${message}`);

    // Tanggapi permintaan dari penambang sesuai dengan protokol Stratum
    // Anda perlu mengimplementasikan logika penambangan yang sesuai di sini.
  });

  // Event listener saat penambang memutuskan koneksi
  socket.on('end', () => {
    console.log(`Penambang ${socket.remoteAddress}:${socket.remotePort} terputus`);
  });
});

// Mulai server Stratum
server.listen(PORT, HOST, () => {
  console.log(`Server Stratum berjalan di ${HOST}:${PORT}`);
});
